import styled, { keyframes } from "styled-components";

export const MetricGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

/* ---------- Motion ---------- */

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

/* ---------- Layout ---------- */

export const PageContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.gradients.analyze};

  animation: ${fadeIn} ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.heading};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.info} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

/* ---------- Score Card ---------- */

export const ScoreCard = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px solid rgba(0, 212, 255, 0.4);
  background: linear-gradient(135deg, #1a4d5e 0%, #2a5d7f 100%);
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  box-shadow: 0 4px 25px rgba(0, 212, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(77, 159, 255, 0.08) 100%);
    opacity: 1;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const ScoreValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const MetricsList = styled.ul`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding-left: ${({ theme }) => theme.spacing.lg};

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

export const MetaText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body};
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

/* ---------- Section ---------- */

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subheading};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

/* ---------- AI Explanation ---------- */

export const AIBox = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradients.cardPurple};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
  position: relative;
  overflow: hidden;

  /* Gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.card};
    opacity: 0.8;
    z-index: 0;
  }

  /* Content above gradient */
  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const AIText = styled.pre`
  white-space: pre-wrap;
  line-height: 1.5;
  font-family: inherit;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

export const Disclaimer = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

/* ---------- State Text ---------- */

export const StateText = styled.p`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

/* ---------- Disclaimer Banner ---------- */

export const DisclaimerBanner = styled.div`
  background: ${({ theme }) => theme.colors.gradients.cardTeal};
  border: 1px solid ${({ theme }) => theme.semantic.medium.border};
  border-left: 4px solid ${({ theme }) => theme.semantic.medium.text};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 4px 20px rgba(255, 170, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.helpSection};
    opacity: 0.3;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const DisclaimerIcon = styled.span`
  font-size: 1.25rem;
  flex-shrink: 0;
`;

export const DisclaimerContent = styled.div`
  flex: 1;
`;

export const DisclaimerTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.semantic.medium.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const DisclaimerText = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.semantic.medium.text};
  line-height: 1.5;
`;

/* ---------- Section Divider ---------- */

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  opacity: 0.5;
`;
