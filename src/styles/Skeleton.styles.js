import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonBlock = styled.div`
  height: ${({ $height }) => $height || "16px"};
  width: ${({ $width }) => $width || "100%"};
  border-radius: ${({ theme }) => theme.radius.md};

  background: linear-gradient(
    90deg,
    rgba(0, 212, 255, 0.1) 25%,
    rgba(181, 55, 242, 0.15) 37%,
    rgba(0, 212, 255, 0.1) 63%
  );

  background-size: 400px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
