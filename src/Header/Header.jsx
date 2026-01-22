import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

/* ---------- Header ---------- */

const Header = ({ uploadId, portfolioId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  /* ----- Scroll shadow ----- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- Route awareness ----- */
  const isUpload = location.pathname === "/";
  const isFileDetails = location.pathname.startsWith("/files");
  const isAnalyze = location.pathname.startsWith("/analyze");

  /* ----- Navigation guards ----- */
  const goToFileDetails = () => {
    if (uploadId) navigate(`/files/${uploadId}`);
  };

  const goToAnalyze = () => {
    if (portfolioId) navigate(`/analyze/${portfolioId}`);
  };

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <HeaderLeft>
        <AppTitle>AI Portfolio Analyzer</AppTitle>
        <EducationalBadge>Educational Tool</EducationalBadge>
      </HeaderLeft>

      {/* ---------- Progress Indicator ---------- */}
      {/* <ProgressWrapper>
        <ProgressStep $active={isUpload} $done={uploadId}>
          Upload
        </ProgressStep>
        <ProgressLine $done={uploadId} />

        <ProgressStep $active={isFileDetails} $done={portfolioId}>
          Review
        </ProgressStep>
        <ProgressLine $done={portfolioId} />

        <ProgressStep $active={isAnalyze}>Analyze</ProgressStep>
      </ProgressWrapper> */}

      {/* ---------- Navigation ---------- */}
      <HeaderRight>
        <NavLinkButton to="/" end $active={isUpload}>
          Upload
        </NavLinkButton>

        <NavActionButton
          onClick={goToFileDetails}
          disabled={!uploadId}
          $active={isFileDetails}
        >
          File Details
        </NavActionButton>

        <NavActionButton
          onClick={goToAnalyze}
          disabled={!portfolioId}
          $active={isAnalyze}
        >
          Analyze
        </NavActionButton>
      </HeaderRight>
    </HeaderWrapper>
  );
};

/* ================== STYLES ================== */

const HeaderWrapper = styled.header`
  height: 64px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  background: linear-gradient(
    90deg,
    #1a3a52 0%,
    #0d4f6b 25%,
    #1a5f7f 50%,
    #0d4f6b 75%,
    #1a3a52 100%
  );
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(10px);

  position: sticky;
  top: 0;
  z-index: 100;

  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 4px 25px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 212, 255, 0.2)"
      : "0 2px 10px rgba(0, 212, 255, 0.2)"};

  transition: box-shadow 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AppTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #b537f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.02em;
`;

const EducationalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: linear-gradient(
    135deg,
    rgba(255, 170, 0, 0.15) 0%,
    rgba(255, 200, 0, 0.15) 100%
  );
  border: 2px solid rgba(255, 170, 0, 0.5);
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: #ffaa00;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 10px rgba(255, 170, 0, 0.25);
  animation: pulse 3s ease-in-out infinite;

  &::before {
    content: "🎓";
    font-size: 1.1em;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 2px 10px rgba(255, 170, 0, 0.25);
    }
    50% {
      box-shadow: 0 4px 20px rgba(255, 170, 0, 0.4);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Progress ---------- */

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProgressStep = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;

  color: ${({ $active, $done }) => {
    if ($active) return "#00d4ff";
    if ($done) return "#00ff88";
    return "#7d8fb3";
  }};

  text-shadow: ${({ $active, $done }) => {
    if ($active) return "0 0 10px rgba(0, 212, 255, 0.5)";
    if ($done) return "0 0 8px rgba(0, 255, 136, 0.3)";
    return "none";
  }};
`;

const ProgressLine = styled.div`
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: ${({ $done }) =>
    $done
      ? "linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)"
      : "rgba(125, 143, 179, 0.3)"};
  transition: all 0.3s ease;
  box-shadow: ${({ $done }) =>
    $done ? "0 0 8px rgba(0, 212, 255, 0.4)" : "none"};
`;

/* ---------- Navigation ---------- */

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  text-align: right;
`;

const NavButtonBase = `
  height: 40px;
  padding: 0 18px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 2px solid transparent;
  background: rgba(0, 212, 255, 0.1);
  color: #a8b2d1;

  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(138, 43, 226, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(138, 43, 226, 0.25) 100%);
    color: #00d4ff;
    border-color: rgba(0, 212, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(125, 143, 179, 0.08);
    color: #4f5b7c;
    border-color: transparent;
    transform: none;
    box-shadow: none;

    &:hover {
      transform: none;
      box-shadow: none;
      background: rgba(125, 143, 179, 0.08);
    }
  }

  @media (max-width: 768px) {
    padding: 0 12px;
    font-size: 0;
  }
`;

const NavLinkButton = styled(NavLink)`
  ${NavButtonBase}

  ${({ $active, theme }) =>
    $active &&
    `
    background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
    color: #ffffff;
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);

    &:hover {
      background: linear-gradient(135deg, #00e5ff 0%, #00b8ff 100%);
      box-shadow: 0 6px 25px rgba(0, 212, 255, 0.6);
    }
  `}
`;

const NavActionButton = styled.button`
  ${NavButtonBase}

  ${({ $active, theme }) =>
    $active &&
    `
    background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
    color: #ffffff;
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #00e5ff 0%, #00b8ff 100%);
      box-shadow: 0 6px 25px rgba(0, 212, 255, 0.6);
    }
  `}
`;

export default Header;
