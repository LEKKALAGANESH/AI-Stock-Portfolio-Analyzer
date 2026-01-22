import styled from "styled-components";

const Panel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};

  background: linear-gradient(135deg, #3d2545 0%, #4d3555 100%);
  border: 2px solid rgba(255, 170, 0, 0.4);
  box-shadow: 0 4px 20px rgba(255, 170, 0, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 170, 0, 0.05) 0%, rgba(255, 200, 0, 0.05) 100%);
    opacity: 1;
    z-index: 0;
  }
`;

const AlertItem = styled.div`
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: "⚡";
    font-size: 1.2em;
    color: #ffaa00;
  }

  & + & {
    border-top: 1px solid rgba(255, 170, 0, 0.3);
  }
`;

export default function AlertPanel({ alerts }) {
  if (!alerts.length) return null;

  return (
    <Panel role="region" aria-label="Signal alerts">
      {alerts.map((alert, idx) => (
        <AlertItem key={idx}>{alert}</AlertItem>
      ))}
    </Panel>
  );
}
