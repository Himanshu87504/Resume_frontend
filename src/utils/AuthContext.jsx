import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Get from localStorage
    const loginData = localStorage.getItem("isLogin");
    const userInfoData = localStorage.getItem("userInfo");

    // Parse safely
    const [isLogin, setLogin] = useState(
        loginData ? JSON.parse(loginData) : false
    );

    const [userInfo, setUserInfo] = useState(
        userInfoData ? JSON.parse(userInfoData) : null
    );

    console.log("Context userInfo:", userInfo);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setLogin,
                userInfo,
                setUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;