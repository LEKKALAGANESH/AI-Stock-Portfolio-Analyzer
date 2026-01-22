import styled from "styled-components";

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};

  /* Vibrant gradient background */
  background: ${({ theme, $signal }) => theme.signal[$signal].bg};

  border: 1.5px solid ${({ theme, $signal}) => theme.signal[$signal].border};

  color: ${({ theme, $signal }) => theme.signal[$signal].text};

  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;

  box-shadow: ${({ theme, $signal }) => {
    if ($signal === "underweight" || $signal === "buy") return "0 2px 12px rgba(0, 255, 136, 0.3)";
    if ($signal === "balanced" || $signal === "hold") return "0 2px 12px rgba(255, 170, 0, 0.3)";
    if ($signal === "overweight" || $signal === "sell") return "0 2px 12px rgba(255, 51, 102, 0.3)";
    return "0 2px 8px rgba(0, 0, 0, 0.2)";
  }};

  transition: all ${({ theme }) => theme.motion.fast};

  /* Enhanced hover effect */
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, $signal }) => {
      if ($signal === "underweight" || $signal === "buy") return "0 4px 20px rgba(0, 255, 136, 0.5)";
      if ($signal === "balanced" || $signal === "hold") return "0 4px 20px rgba(255, 170, 0, 0.5)";
      if ($signal === "overweight" || $signal === "sell") return "0 4px 20px rgba(255, 51, 102, 0.5)";
      return theme.shadows.md;
    }};
  }

  /* Muted state */
  ${({ $muted }) =>
    $muted &&
    `
    opacity: 0.5;
    filter: grayscale(50%);
  `}
`;

export const Confidence = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  opacity: 0.9;
  font-size: 0.9em;
`;
