import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./Header/Header";
import DisclaimerModal from "./components/DisclaimerModal";

import AnalyzePage from "./pages/AnalyzePage";
import FileDetailsPage from "./pages/FileDetailsPage";
import UploadPage from "./pages/UploadPage";

import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";

function AppContent() {
  const location = useLocation();

  // Extract IDs from current URL path
  const uploadIdMatch = location.pathname.match(/\/files\/([^/]+)/);
  const portfolioIdMatch = location.pathname.match(/\/analyze\/([^/]+)/);

  const uploadId = uploadIdMatch ? uploadIdMatch[1] : sessionStorage.getItem('lastUploadId');
  const portfolioId = portfolioIdMatch ? portfolioIdMatch[1] : sessionStorage.getItem('lastPortfolioId');

  // Store IDs in sessionStorage when found in URL
  if (uploadIdMatch) {
    sessionStorage.setItem('lastUploadId', uploadIdMatch[1]);
  }
  if (portfolioIdMatch) {
    sessionStorage.setItem('lastPortfolioId', portfolioIdMatch[1]);
  }

  return (
    <>
      <Header uploadId={uploadId} portfolioId={portfolioId} />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/files/:uploadId" element={<FileDetailsPage />} />
        <Route path="/analyze/:portfolioId" element={<AnalyzePage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DisclaimerModal />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
