import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">SportifyInsider</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/category/nfl">NFL</Link>
        </li>
        <li>
          <Link to="/category/nba">NBA</Link>
        </li>
        <li>
          <Link to="/category/nhl">NHL</Link>
        </li>
        <li>
          <Link to="/category/footy">Footy</Link>
        </li>
        <li>
          <Link to="/category/esports">Esports</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
