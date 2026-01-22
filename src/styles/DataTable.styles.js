import styled from "styled-components";

export const Wrapper = styled.div`
  border: 2px solid rgba(255, 0, 128, 0.4);
  border-radius: ${({ theme }) => theme.radius.lg};
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll; /* Allow vertical scroll */
  overflow-x: scroll;
  background: linear-gradient(135deg, #2d1535 0%, #3d2545 100%);
  box-shadow: 0 4px 25px rgba(255, 0, 128, 0.3);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 0, 128, 0.05) 0%,
      rgba(181, 55, 242, 0.05) 100%
    );
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit */
  }
`;

export const ScrollArea = styled.div`
  max-height: ${({ $maxHeight }) => $maxHeight || "400px"};
  overflow: auto;
  position: relative;
  z-index: 1;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.body};

  tbody tr {
    transition: all ${({ theme }) => theme.motion.fast};

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 0, 128, 0.1) 0%,
        rgba(181, 55, 242, 0.1) 100%
      );
      transform: scale(1.01);
    }
  }
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #4a1555 0%, #5a2565 100%);
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.caption};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ff80d0;
  z-index: 2;
  position: relative;

  border-bottom: 2px solid rgba(255, 0, 128, 0.5);
  box-shadow: 0 2px 10px rgba(255, 0, 128, 0.2);
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(255, 0, 128, 0.2);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.body};
  position: relative;
  z-index: 1;
`;

export const StateBox = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
