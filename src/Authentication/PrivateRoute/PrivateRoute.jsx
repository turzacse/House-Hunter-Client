import { Navigate, useLocation } from "react-router-dom";
import useLoggedUser from "../../Hooks/useLogged";
import { useEffect, useState } from "react";



const PrivateRoute = ({ children }) => {
    const log = useLoggedUser();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = ([true]);
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    useEffect( () => {
        if(log?.email) {
            setUser(log.email);
        }
    } ,[log])
    console.log(user);
    // const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(user);
    if (user.length !== 0) {
        return children;
    }
    return <Navigate  to='/login'></Navigate>
};

export default PrivateRoute;