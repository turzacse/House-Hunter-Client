import { useEffect, useState } from "react";
import useLoggedUser from "./useLogged";

const useBooking = () => {
  const [logged, setLogged] = useState(null);
  const logger = useLoggedUser();
  const [allBooking, setAllBooking] = useState([]);
  const [book, setBook] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/bookings')
    .then(res => res.json())
    .then(data => setAllBooking(data))
  }, []);

  useEffect( () => {
    if(allBooking){
        const data = allBooking.filter((item) => item.userEmail === logger?.email);
        setBook(data);
    }
  },[allBooking])

  return book;
};

export default useBooking;
