import { createContext, useEffect, useState } from "react";
import useUser from "../Hooks/useUser";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          // Assuming you have an endpoint to verify and get user details using the stored token
          // You may need to modify this based on your server logic
          const fetchUserDetails = async () => {
            try {
              const response = await axios.post(
                "http://localhost:3000/user-details",
                { token: storedToken }
              );
              setUser(response.data.user);
              setEmail(response.data.user.email);
            } catch (error) {
              console.error("Error fetching user details:", error);
            } finally {
              setLoading(false);
            }
          };
    
          fetchUserDetails();
        } else {
          setLoading(false);
        }
      }, []);
    
      useUser(user, setUser, setEmail, setLoading);

    const login = (userData) =>{
        setLoading(true);
        setUser(userData);

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("User data stored in localStorage:", userData);
    }

    const logout = () =>{
        setLoading(true);
        setUser(null);
        localStorage.removeItem("userData");
    }

    // console.log(user);
    useEffect(() => {
        const use = localStorage.getItem("userData");
        console.log("Current User:", use);
    }, [user]);
    

    const userInfo = {
        user,
        email,
        loading,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;