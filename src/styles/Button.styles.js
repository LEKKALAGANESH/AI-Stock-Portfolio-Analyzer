import styled, { css } from "styled-components";

// Base button styles shared across all variants
const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};

  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

// Size variants
const sizeStyles = {
  small: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.caption};
    height: 32px;
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.body};
    height: 40px;
  `,
  large: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.label};
    height: 48px;
  `,
};

// Variant styles
const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.gradients.button};
    color: white;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #00e5ff 0%, #00b8ff 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 212, 255, 0.6);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
    }
  `,

  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.activeBg};
      border-color: ${({ theme }) => theme.colors.accentHover};
      color: ${({ theme }) => theme.colors.accentHover};
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.hoverBg};
    }
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.error};
      filter: brightness(0.9);
      transform: translateY(-1px);
    }
  `,
};

// Main Button component
export const StyledButton = styled.button`
  ${baseButtonStyles}
  ${({ $size = "medium" }) => sizeStyles[$size]}
  ${({ $variant = "primary" }) => variantStyles[$variant]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.7;
      cursor: wait;
      pointer-events: none;
    `}
`;

// Loading spinner for buttons
export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
