import Papa from "papaparse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import {
  ActionButton,
  ColumnBadge,
  DropText,
  DropZone,
  ErrorText,
  HelpSection,
  HelpText,
  HelpTitle,
  HiddenInput,
  PageContainer,
  PreviewSection,
  PreviewTitle,
  RequiredColumns,
  Subtitle,
  Table,
  TableWrapper,
  Td,
  Th,
  Title,
} from "../styles/UploadPage.styles";

const REQUIRED_COLUMNS = ["symbol", "quantity", "avg_price"];

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function parseFile(selectedFile) {
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Only CSV files are supported");
      return;
    }

    setError("");
    setFile(selectedFile);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (!result.data.length) {
          setError("CSV file is empty");
          return;
        }

        const parsedColumns = Object.keys(result.data[0]).map((c) =>
          c.trim().toLowerCase(),
        );

        const missing = REQUIRED_COLUMNS.filter(
          (col) => !parsedColumns.includes(col),
        );

        if (missing.length > 0) {
          setError(`Missing required columns: ${missing.join(", ")}`);
          return;
        }

        setColumns(parsedColumns);
        setRows(result.data.slice(0, 10));
      },
      error: () => {
        setError("Failed to parse CSV file");
      },
    });
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) parseFile(selectedFile);
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) parseFile(droppedFile);
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);

    try {
      const filePath = `uploads/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data, error: dbError } = await supabase
        .from("uploads")
        .insert({
          filename: file.name,
          storage_path: filePath,
          status: "parsed",
          row_count: rows.length,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      navigate(`/files/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <Title>Upload Portfolio CSV</Title>
      <Subtitle>
        Analyze your portfolio's diversification, risk exposure, and volatility
        — without investment advice.
      </Subtitle>

      {!file && (
        <HelpSection>
          <HelpTitle>Required CSV Format</HelpTitle>
          <HelpText>Your CSV file must include these columns:</HelpText>
          <RequiredColumns>
            <ColumnBadge>symbol</ColumnBadge>
            <ColumnBadge>quantity</ColumnBadge>
            <ColumnBadge>avg_price</ColumnBadge>
          </RequiredColumns>
          <HelpText style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Example: AAPL, 100, 150.50
          </HelpText>
        </HelpSection>
      )}

      <DropZone
        htmlFor="fileInput"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <DropText>
          {file ? `Selected: ${file.name}` : "Drag & Drop or Click to Upload"}
        </DropText>
        <HiddenInput
          id="fileInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </DropZone>

      {error && <ErrorText>⚠️ {error}</ErrorText>}

      {rows.length > 0 && (
        <PreviewSection>
          <PreviewTitle>Preview (first 10 rows)</PreviewTitle>

          <TableWrapper>
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
          </TableWrapper>

          <ActionButton onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Continue"}
          </ActionButton>
        </PreviewSection>
      )}
    </PageContainer>
  );
}
