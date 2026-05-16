import { createContext, useState, useContext, useEffect } from "react";
import DOMPurify from "dompurify";
import { loginUser, registerUser, getProfile, updateProfile as updateProfileRequest } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Auto-login (verify token on refresh)
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await getProfile();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error("Auth initialization failed:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 🔐 REGISTER
  const register = async (email, password, fullName) => {
    const sanitizedEmail = DOMPurify.sanitize(email).toLowerCase().trim();
    const sanitizedFullName = DOMPurify.sanitize(fullName).trim();

    try {
      const { data } = await registerUser({
        email: sanitizedEmail,
        password,
        passwordConfirm: password,
        fullName: sanitizedFullName,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return data.user;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Registration failed");
    }
  };

  // 🔐 LOGIN
  const login = async (email, password) => {
    const sanitizedEmail = DOMPurify.sanitize(email).toLowerCase().trim();

    try {
      const { data } = await loginUser({
        email: sanitizedEmail,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return data.user;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  // ✍️ UPDATE PROFILE
  const updateProfile = async (profileData) => {
    const sanitizedUpdate = {
      ...(profileData.fullName && { fullName: DOMPurify.sanitize(profileData.fullName).trim() }),
      ...(profileData.bio && { bio: DOMPurify.sanitize(profileData.bio).trim() }),
      ...(profileData.phone && { phone: DOMPurify.sanitize(profileData.phone).trim() }),
      ...(profileData.location && { location: DOMPurify.sanitize(profileData.location).trim() }),
      ...(profileData.profilePicture && { profilePicture: profileData.profilePicture }),
    };

    try {
      const { data } = await updateProfileRequest(sanitizedUpdate);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Profile update failed");
    }
  };

  // 🚪 LOGOUT
  const logout = () => {

    // 🧹 Clear auth storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🧹 Reset state
    setUser(null);

    // 🧹 Future extensibility
    // clear caches
    // disconnect sockets
    // reset stores

    console.log("✅ Logged out successfully");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};