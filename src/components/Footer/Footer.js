import { Link } from "react-router-dom";
import "../../assets/style/Footer.css"; // ✅ Ensure CSS file exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Sportify Insider. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
