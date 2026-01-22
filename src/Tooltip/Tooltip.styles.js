import styled from "styled-components";

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

export const TooltipBox = styled.div`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);

  background: linear-gradient(135deg, #1a4d5e 0%, #2a5d7f 100%);
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 2px solid rgba(0, 212, 255, 0.5);
  border-radius: ${({ theme }) => theme.radius.md};

  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: 240px;
  white-space: normal;
  word-wrap: break-word;
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
  z-index: 1000;

  opacity: 0;
  pointer-events: none;
  transition: opacity ${({ theme }) => theme.motion.normal};

  ${TooltipWrapper}:hover &,
  ${TooltipWrapper}:focus-within & {
    opacity: 1;
    pointer-events: auto;
  }

  /* Arrow pointer */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #2a5d7f;
  }

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 9px solid transparent;
    border-top-color: rgba(0, 212, 255, 0.5);
    z-index: -1;
  }
`;
