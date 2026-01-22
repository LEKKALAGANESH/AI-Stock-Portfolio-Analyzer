import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;

  background: ${({ theme }) => theme.colors.gradients.review};

  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};

  animation: ${fadeIn} ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.heading};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.info} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const MetaText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.label};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const TableContainer = styled.div`
  max-height: 400px;
  overflow: auto;
  border: 2px solid rgba(138, 43, 226, 0.5);
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, #1a0f2e 0%, #2a1f3e 100%);
  box-shadow: 0 4px 25px rgba(138, 43, 226, 0.35);
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  /* Gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.06) 0%, rgba(75, 0, 130, 0.06) 100%);
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.body};
  position: relative;
  z-index: 1;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #3a1f5e 0%, #4a2f6e 100%);
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.caption};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #c77dff;
  z-index: 2;
  border-bottom: 2px solid rgba(138, 43, 226, 0.6);
  box-shadow: 0 2px 10px rgba(138, 43, 226, 0.25);
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(138, 43, 226, 0.25);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.body};
  position: relative;
  z-index: 1;
  transition: all ${({ theme }) => theme.motion.fast};

  tr:hover & {
    background: linear-gradient(90deg, rgba(138, 43, 226, 0.1) 0%, rgba(181, 55, 242, 0.1) 100%);
  }
`;

export const PrimaryButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  border-radius: ${({ theme }) => theme.radius.lg};
  border: none;

  background: ${({ theme }) => theme.colors.gradients.buttonSuccess};
  color: white;
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: 600;

  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  transition:
    all ${({ theme }) => theme.motion.normal};

  &:hover {
    background: linear-gradient(135deg, #00ff99 0%, #00dd77 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.6);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.lg};
`;
