// useUser.jsx
import { useEffect } from "react";
import axios from "axios";

const useUser = (user, setUser, setEmail, setLoading) => {
  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);

      if (user) {
        try {
          const response = await axios.post(
            "http://localhost:3000/jwt",
            { email: user.email }
          );

          const token = response.data.token;

          // Save the token to localStorage
          localStorage.setItem("authToken", token);

          // Use the token as needed (e.g., store it in local storage or context)
          console.log("JWT Token:", token);
        } catch (error) {
          console.error("Error fetching JWT:", error);
        }
      } else {
        try {
          // Remove the token from localStorage upon logout
          localStorage.removeItem("authToken");

          const response = await axios.post(
            "http://localhost:3000/logout",
            { email: user.email }
          );

          console.log("Logout Response:", response.data);
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }

      setLoading(false);
    };

    fetchToken();

    return () => {
      // Cleanup function
    };
  }, [user, setUser, setEmail, setLoading]);
};

export default useUser;
