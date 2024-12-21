import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState({});

  const login = async (username, password) => {
    try {
      const response = await axios.post("https://e-commerce-data-one.vercel.app/api/login", {
        username,
        password,
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAdmin", (data.user.isAdmin));
        localStorage.setItem("id", (data.id));
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error(
        "Error during login:",
        'Invalid credentials'
      );
      throw error;
    }
  };

  const fetchPhoto = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/photo/${id}`);
      setPhoto(response.data);
    } catch (error) {
      console.error('Error fetching photo:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const userData = async (id) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `https://e-commerce-data-one.vercel.app/api/users/${id}`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://e-commerce-data-one.vercel.app/api/updateProfile/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = response.data.user;
      console.log("Updated user:", updatedUser);

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear()
    setUser(null);
  };

  const getToken = () => localStorage.getItem('token');

  const isAdmin = async () => {
    const token = getToken();
    if (!token) return false;
  
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    return decoded.isAdmin;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      axios
        .get("https://e-commerce-data-one.vercel.app/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }

    setLoading(false);
  }, []);

  return {
    fetchPhoto,
    photo,
    isAdmin,
    updateUser,
    user,
    login,
    logout,
    loading,
    userData,
  };
};
