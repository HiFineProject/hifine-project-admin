import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/app/dashboard">
            <div className="flex flex-row">
              <AiOutlineDashboard />
              <span className="ps-3">Dashboard</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/usermanage">
            <div className="flex flex-row">
              <FaRegUser />
              <span className="ps-3">Manage User</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/postmanage">
            <div className="flex flex-row">
              <FaRegImage />
              <span className="ps-3">Manage post</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/listtable">
            <div className="flex flex-row">
              <RxActivityLog />
              <span className="ps-3">Manage List</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
