import styled from "styled-components";

export const ControlsBox = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};

  background: linear-gradient(135deg, #2a1f4e 0%, #3a2f5e 100%);
  border: 2px solid rgba(181, 55, 242, 0.4);
  box-shadow: 0 4px 20px rgba(181, 55, 242, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(181, 55, 242, 0.06) 0%, rgba(138, 43, 226, 0.06) 100%);
    opacity: 1;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.9rem;
  font-weight: 500;
`;

export const RangeInput = styled.input`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const HelperText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
