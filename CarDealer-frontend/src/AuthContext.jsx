
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user (validate cookie with backend)
  const fetchUser = async () => {
  console.log("Checking auth...");
  try {
    const res = await fetch("http://localhost:8084/api/admin/check", {
      credentials: "include",
    });

    console.log("Status:", res.status);

    if (res.ok) {
      const data = await res.json();
      console.log("User:", data);
      setUser(data);
    } else {
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
      await fetch("http://localhost:8084/api/admin/logout", {
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