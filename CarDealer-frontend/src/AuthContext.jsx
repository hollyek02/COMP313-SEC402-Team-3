
import { createContext, useState, useEffect, useContext } from "react";
import { API_BASE } from "./apiConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user (validate cookie with backend)
const fetchUser = async () => {
  console.log("Checking auth...");
  try {
    const response = await fetch(`${API_BASE}/api/admin/check`, {
      credentials: "include",
    });

    console.log("Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("User:", data);
      setUser(data);
    } else {
      // 401 etc. → not logged in
      setUser(null);
    }
  } catch (err) {
    console.error("Auth error:", err);
    setUser(null);
  } finally {
    setLoading(false);
    console.log("Loading finished");
  }
};

const logout = async () => {
  try {
    await fetch(`${API_BASE}/api/admin/logout`, {
      method: "POST", // or GET depending on backend
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // clear user on frontend no matter what
    setUser(null);
  }
};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);