import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Skeleton from "../components/Skeleton";

import {
  ErrorText,
  MetaText,
  PageContainer,
  PrimaryButton,
  Table,
  TableContainer,
  Td,
  Th,
  Title,
} from "../styles/FileDetailsPage.styles";

export default function FileDetailsPage() {
  const { uploadId } = useParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAndParseCSV();
  }, []);

  async function fetchAndParseCSV() {
    try {
      const { data: upload, error: uploadError } = await supabase
        .from("uploads")
        .select("*")
        .eq("id", uploadId)
        .single();

      if (uploadError) throw uploadError;

      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("portfolio-files")
          .createSignedUrl(upload.storage_path, 60);

      if (signedUrlError) throw signedUrlError;

      const response = await fetch(signedUrlData.signedUrl);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (!result.data.length) {
            setError("CSV file is empty");
            return;
          }

          const cols = Object.keys(result.data[0]).map((c) =>
            c.trim().toLowerCase(),
          );

          setColumns(cols);
          setRows(result.data);
        },
        error: () => {
          setError("Failed to parse CSV file");
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .insert({
          upload_id: uploadId,
          name: "My Portfolio",
          status: "confirmed",
        })
        .select()
        .single();

      if (error) throw error;

      navigate(`/analyze/${data.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading)
    return (
      <PageContainer>
        <Title>Review Uploaded File</Title>
        <MetaText role="status" aria-live="polite" style={{ marginBottom: "1.5rem" }}>
          Loading file data...
        </MetaText>
        <Skeleton height="60px" style={{ marginBottom: "1rem" }} />
        <Skeleton height="300px" />
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <ErrorText role="alert">{error}</ErrorText>
      </PageContainer>
    );

  return (
    <PageContainer>
      <Title>Review Uploaded File</Title>
      <MetaText>Total rows: {rows.length}</MetaText>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col}>{col}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <Td key={col}>{row[col]}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <PrimaryButton onClick={handleConfirm}>
        <span>✓</span>
        Confirm & Analyze
        <span>→</span>
      </PrimaryButton>
    </PageContainer>
  );
}
