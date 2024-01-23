import { useEffect, useState } from "react";

const useLoggedUser = () => {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userDataObject = JSON.parse(storedUserData);
        setLogged(userDataObject);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  return logged;
};

export default useLoggedUser;
