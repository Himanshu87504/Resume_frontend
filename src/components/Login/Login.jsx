import React, { useContext } from "react";
import styles from "./Login.module.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Login = () => {
    const { setLogin, setUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // 🔹 Firebase Login
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userdata = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
            };

            console.log("Firebase User:", userdata);

            let finalUser = userdata;

            try {
                // 🔹 Backend Call
                const response = await axios.post("/api/user/", userdata);
                console.log("✅ Backend success:", response.data.user);

                finalUser = response.data.user; // ✅ USE BACKEND DATA
            } catch (backendErr) {
                console.error(
                    "❌ Backend error:",
                    backendErr.response?.data || backendErr.message
                );
            }

            // 🔥 SAME DATA EVERYWHERE
            localStorage.setItem("userInfo", JSON.stringify(finalUser));
            localStorage.setItem("isLogin", JSON.stringify(true));

            setUserInfo(finalUser);
            setLogin(true);

            navigate("/dashboard");
        } catch (firebaseErr) {
            console.error("Firebase error:", firebaseErr);
            alert("Login failed: " + firebaseErr.message);
        }
    };

    return (
        <div className={styles.Login}>
            <div className={styles.loginCard}>
                <div className={styles.loginCardTitle}>
                    <h2>Login</h2>
                    <VpnKeyIcon />
                </div>

                <div className={styles.googleBtn} onClick={handleLogin}>
                    <GoogleIcon sx={{ fontSize: 20, color: "red" }} />
                    Sign in with Google
                </div>
            </div>
        </div>
    );
};

export default Login;