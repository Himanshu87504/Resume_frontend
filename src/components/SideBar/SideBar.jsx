import React from "react";
import styles from "./SideBar.module.css";

import ArticleIcon from "@mui/icons-material/Article";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { isLogin, setLogin, userInfo, setUserInfo, setid } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.clear();
        setLogin(false);
        setUserInfo(null);
        navigate('/');

    };

    return (
        <div className={styles.sideBar}>

            {/* Top */}
            <div className={styles.sideBarIcon}>
                <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
                <div className={styles.sideBarTopContent}>Resume Screening</div>
            </div>

            {/* Options */}
            <div className={styles.sideBarOptionsBlock}>

                {/* Dashboard */}
                <Link
                    to="/dashboard"
                    className={`${styles.sideBarOption} ${location.pathname === "/dashboard" ? styles.selectedOption : ""
                        }`}
                >
                    <DashboardIcon sx={{ fontSize: 22 }} />
                    <div>Dashboard</div>
                </Link>

                {/* History */}
                <Link
                    to="/history"
                    className={`${styles.sideBarOption} ${location.pathname === "/history" ? styles.selectedOption : ""
                        }`}
                >
                    <ManageSearchIcon sx={{ fontSize: 22 }} />
                    <div>History</div>
                </Link>

                {userInfo?.role == 'admin' &&
                    <Link
                        to="/admin"
                        className={`${styles.sideBarOption} ${location.pathname === "/admin" ? styles.selectedOption : ""
                            }`}
                    >
                        <AdminPanelSettingsIcon sx={{ fontSize: 22 }} />
                        <div>Admin</div>
                    </Link>
                }

                {/* Logout */}
                <div className={styles.sideBarOption} onClick={handleLogout}>
                    <LogoutIcon sx={{ fontSize: 22 }} />
                    <div>LogOut</div>
                </div>

            </div>
        </div>
    );
};

export default SideBar;