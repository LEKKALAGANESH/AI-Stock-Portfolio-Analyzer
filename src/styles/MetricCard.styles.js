import styled from "styled-components";

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  position: relative;
  overflow: hidden;

  /* Fancy gradient background with variety */
  background: ${({ theme, $tone }) => {
    if ($tone === "low") return theme.colors.gradients.cardPurple;
    if ($tone === "medium") return theme.colors.gradients.cardTeal;
    if ($tone === "high") return theme.colors.gradients.cardBlue;
    return theme.colors.gradients.surface;
  }};

  border: 1px solid
    ${({ theme, $tone }) =>
      $tone
        ? theme.semantic[$tone].border
        : theme.colors.border};

  color: ${({ theme }) => theme.colors.textPrimary};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  /* Layered gradient effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradients.card};
    opacity: 1;
    transition: opacity ${({ theme }) => theme.motion.normal};
    z-index: 0;
    pointer-events: none;
  }

  /* Content above gradient */
  & > * {
    position: relative;
    z-index: 1;
  }

  /* Glowing shadow for depth */
  box-shadow: ${({ theme, $tone }) => {
    if ($tone === "low") return "0 4px 20px rgba(0, 255, 136, 0.2)";
    if ($tone === "medium") return "0 4px 20px rgba(255, 170, 0, 0.2)";
    if ($tone === "high") return "0 4px 20px rgba(255, 51, 102, 0.2)";
    return theme.shadows.sm;
  }};

  transition: all ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme, $tone }) => {
      if ($tone === "low") return "0 8px 30px rgba(0, 255, 136, 0.3)";
      if ($tone === "medium") return "0 8px 30px rgba(255, 170, 0, 0.3)";
      if ($tone === "high") return "0 8px 30px rgba(255, 51, 102, 0.3)";
      return theme.shadows.md;
    }};
    border-color: ${({ theme, $tone }) =>
      $tone
        ? theme.semantic[$tone].text
        : theme.colors.accent};

    &::before {
      background: ${({ theme }) => theme.colors.gradients.cardHover};
      opacity: 1.2;
    }
  }
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtext = styled.span`
  font-size: ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;
