import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react"; 
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import BlogDetails from "./components/BlogDetails";
import NBA from "./pages/NBA";
import NHL from "./pages/NHL";
import NFL from "./pages/NFL";
import Esports from "./pages/Esports";
import Footy from "./pages/Footy";
import TermsPrivacy from "./pages/TermsPrivacy";
import Footer from "./components/Footer/Footer";
import { trackVisit, trackTimeSpent } from "./services/analytics";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TrackablePage Component={HomePage} page="/" />} />
          <Route path="/blog/:id" element={<TrackablePage Component={BlogDetails} page="/blog/:id" />} />
          <Route path="/category/nba" element={<TrackablePage Component={NBA} page="/category/nba" />} />
          <Route path="/category/nhl" element={<TrackablePage Component={NHL} page="/category/nhl" />} />
          <Route path="/category/nfl" element={<TrackablePage Component={NFL} page="/category/nfl" />} />
          <Route path="/category/esports" element={<TrackablePage Component={Esports} page="/category/esports" />} />
          <Route path="/category/footy" element={<TrackablePage Component={Footy} page="/category/footy" />} />
          <Route path="/terms-privacy" element={<TermsPrivacy />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

// ✅ Trackable Page Wrapper
const TrackablePage = ({ Component, page }) => {
  useEffect(() => {
    // Ensure the page prop is a valid string
    if (page) {
      trackVisit(page); // This will now track the visit with the correct page value
      let startTime = Date.now();
      return () => {
        trackTimeSpent(page, Math.floor((Date.now() - startTime) / 1000));
      };
    }
  }, [page]);

  return <Component />;
};

export default App;
