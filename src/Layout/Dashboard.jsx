import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useLoggedUser from '../Hooks/useLogged';

const Dashboard = () => {
    const loggedinUser = useLoggedUser();
    const [users, setUsers] = useState([]);
    const [logger, setLogger] = useState("");
    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])

    useEffect(() => {
        if (users) {
            const Email = loggedinUser ? loggedinUser.email : null;
            if (Email) {
                const userEmail = users.find((u) => u?.email === Email);
                setLogger(userEmail)
            }
        }
    }, [users])
    console.log(loggedinUser?.email, logger?.role);
    return (
        <div>
            <div className="flex gap-10 mx-20">
                <div className="w-60 min-h-screen bg-orange-200 ">
                    <div>
                        <img className="w-1/2 mx-auto   rounded-full" src="https://i.ibb.co/vJPrKmH/logo2.png" alt="" />
                        {/* <h1 className="text-3xl font-bold text-center">Speedy Send</h1> */}
                    </div>
                    <ul className="menu p-4 text-lg ">
                    {
                        !logger? <>
                        loading........ 
                        </> : <> </>
                    }
                        {
                            logger && logger?.role === 'House Owner' && (
                                <>
                                    <h2 className="text-xl font-bold text-center">House Owner</h2>
                                    <div className="divider"></div>
                                    <li><NavLink to='/dashboard/allhouses'>All Houses</NavLink></li>

                                    <li><NavLink to='/addhouse'>Add a House</NavLink></li>
                                </>
                            )
                        }
                        
                        {
                            logger && logger?.role === 'House Renter' && (
                                <>
                                    <h2 className="text-xl font-bold text-center">House Renter</h2>
                                    <div className="divider"></div>
                                    <li><NavLink to='/dashboard/bookings'>Bookings</NavLink></li>

                                    
                                </>
                            )
                        }


                        <div className="divider"></div>


                        <li><NavLink to='/'><div /> Home</NavLink></li>
                        {/* <li><p><IoMdLogOut /> Logout</p></li> */}

                    </ul>
                </div>
                <div className="flex-1">

                    <div className="mt-20">
                        {/* {
                       logged.role=='admin' && location.pathname === '/dashboard' && (
                        <div>
                            <Admin></Admin>
                        </div>
                       ) 
                    } */}
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;