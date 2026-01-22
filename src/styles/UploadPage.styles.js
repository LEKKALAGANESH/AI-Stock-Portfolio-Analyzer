import styled, { keyframes } from "styled-components";

/* ---------- Animations ---------- */

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ---------- Layout ---------- */

export const PageContainer = styled.main`
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.gradients.upload};
  animation: ${fadeIn} 300ms ease-out;

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
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, #b537f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
`;

export const HelpSection = styled.div`
  background: ${({ theme }) => theme.colors.gradients.cardPurple};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;

  box-shadow: 0 4px 20px rgba(181, 55, 242, 0.2);

  /* Gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.helpSection};
    opacity: 1;
    z-index: 0;
  }

  /* Content above gradient */
  & > * {
    position: relative;
    z-index: 1;
  }

  animation: ${fadeIn} 400ms ease-out;
`;

export const HelpTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: "💡";
    font-size: 1.2em;
  }
`;

export const HelpText = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.5;
`;

export const RequiredColumns = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ColumnBadge = styled.li`
  display: inline-flex;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};

  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-family: 'Courier New', Consolas, monospace;
  letter-spacing: 0.03em;

  transition: all ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;

/* ---------- Drop Zone ---------- */

export const DropZone = styled.label`
  display: block;
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.gradients.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;

  box-shadow: ${({ theme }) => theme.shadows.sm};

  /* Animated gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.card};
    opacity: 1;
    transition: all ${({ theme }) => theme.motion.normal};
    z-index: 0;
  }

  /* Content above gradient */
  & > * {
    position: relative;
    z-index: 1;
  }

  transition: all ${({ theme }) => theme.motion.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md}, 0 0 30px rgba(35, 134, 54, 0.15);

    &::before {
      background: ${({ theme }) => theme.colors.gradients.cardHover};
    }
  }

  &:focus-within {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const DropText = styled.p`
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: "📁";
    display: block;
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

/* ---------- Hidden Input ---------- */

export const HiddenInput = styled.input`
  display: none;
`;

/* ---------- Feedback ---------- */

export const ErrorText = styled.p`
  margin: ${({ theme }) => theme.spacing.md} auto;
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.error};

  background: ${({ theme }) => theme.semantic.high.bg};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radius.md};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/* ---------- Preview ---------- */

export const PreviewSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  animation: ${fadeIn} 300ms ease-out;
`;

export const PreviewTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.subheading};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.accent};
`;

/* ---------- Table ---------- */

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px solid rgba(0, 200, 100, 0.5);
  position: relative;

  background: linear-gradient(135deg, #0f2a1a 0%, #1a3f2a 100%);
  box-shadow: 0 4px 25px rgba(0, 200, 100, 0.3);

  /* Gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 200, 100, 0.05) 100%);
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
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: linear-gradient(135deg, #1a4f2a 0%, #2a5f3a 100%);
  color: #5fffa3;
  border-bottom: 2px solid rgba(0, 255, 136, 0.5);
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.caption};
  letter-spacing: 0.08em;
  box-shadow: 0 2px 10px rgba(0, 200, 100, 0.25);
  position: relative;
  z-index: 2;
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(0, 200, 100, 0.25);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.body};
  position: relative;
  z-index: 1;

  transition: all ${({ theme }) => theme.motion.fast};

  tr:hover & {
    background: linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 200, 100, 0.1) 100%);
  }
`;

/* ---------- Button ---------- */

export const ActionButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: none;

  background: ${({ theme }) => theme.colors.gradients.buttonPurple};
  color: #ffffff;
  font-size: ${({ theme }) => theme.typography.label};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  box-shadow: 0 4px 20px rgba(181, 55, 242, 0.4);

  transition: all ${({ theme }) => theme.motion.normal};

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #c44df7 0%, #9a2be8 100%);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(181, 55, 242, 0.6);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(181, 55, 242, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    background: ${({ theme }) => theme.colors.muted};
    box-shadow: none;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;
  margin-right: auto;
`;
