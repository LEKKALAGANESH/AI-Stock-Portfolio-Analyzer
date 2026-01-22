import Skeleton from "./Skeleton";
import {
  ScrollArea,
  StateBox,
  Table,
  Td,
  Th,
  Wrapper,
} from "../styles/DataTable.styles";

export default function DataTable({
  columns,
  rows,
  loading,
  error,
  maxHeight,
  renderCell,
}) {
  if (loading)
    return (
      <Wrapper>
        <StateBox role="status" aria-live="polite" style={{ padding: "1rem" }}>
          Loading data...
        </StateBox>
        <ScrollArea $maxHeight={maxHeight}>
          <Table>
            <thead>
              <tr>
                {columns?.length > 0 ? (
                  columns.map((col, idx) => (
                    <Th key={idx}>
                      <Skeleton height="16px" width="80px" />
                    </Th>
                  ))
                ) : (
                  <>
                    <Th><Skeleton height="16px" width="80px" /></Th>
                    <Th><Skeleton height="16px" width="80px" /></Th>
                    <Th><Skeleton height="16px" width="80px" /></Th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  {columns?.length > 0 ? (
                    columns.map((col, colIdx) => (
                      <Td key={colIdx}>
                        <Skeleton height="16px" width="100%" />
                      </Td>
                    ))
                  ) : (
                    <>
                      <Td><Skeleton height="16px" width="100%" /></Td>
                      <Td><Skeleton height="16px" width="100%" /></Td>
                      <Td><Skeleton height="16px" width="100%" /></Td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Wrapper>
    );

  if (error)
    return (
      <StateBox role="alert" style={{ color: "var(--color-error, #da3633)" }}>
        {error}
      </StateBox>
    );

  if (!rows.length)
    return (
      <StateBox role="status">
        No data available
      </StateBox>
    );

  return (
    <Wrapper>
      <ScrollArea
        role="region"
        aria-label="Scrollable data table"
        $maxHeight={maxHeight}
      >
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col} scope="col">
                  {col}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <Td key={col}>
                    {renderCell ? renderCell(col, row) : row[col]}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Wrapper>
  );
}
