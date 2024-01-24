import React, { useEffect, useState } from 'react';
import useLoggedUser from '../../Hooks/useLogged';
import { NavLink } from 'react-router-dom';
import useBooking from '../../Hooks/useBooking';

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [log, setLog] = useState([]);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState([]);
    const loggedUser = useLoggedUser();
    const myBooking = useBooking();

    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setFilter(data);
            })
    }, [])

    // console.log(query);
    const handleSearch = () => {
        const roomItem = rooms.filter((room) =>
            room?.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilter(roomItem);
    }

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    useEffect(() => {
        if (allUsers) {
            const user = allUsers.filter((data) => data.email === loggedUser?.email);
            setLog(user);
        }
    }, [allUsers])

    console.log(log[0]?.role);

    return (
        <div className='mx-20'>
            <h2 className='text-center text-5xl font-bold mb-5'>Our Feature Room</h2>
            <div className='divider'></div>
            <div className="lg:flex mb-5">
                <div className="w-3/4"></div>

                <div className="lg:w-1/4">
                    <input
                        type="text"
                        placeholder="name"
                        className="input input-bordered  pr-16"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button onClick={handleSearch} className="text-blue-600 btn bg-orange-200 lg:ml-2">Search</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    filter.map(room => <div key={room._id}>
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img className='h-[250px]' src={room.img} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{room.name}</h2>
                                <div className='flex justify-between'>
                                    <p>Bedroom: {room.bedroom}</p>
                                    <p>Bathroom: {room.bathroom}</p>
                                    <p>Room Size: {room.size}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <h2>Avilable from: {room.available}</h2>
                                    <h2>Rent Per Month: {room.rent}</h2>
                                </div>

                                <p>For More discussion Call here: {room.phone}</p>

                                <p>Description: {room.description}</p>
                                <div className="card-actions justify-end">

                                    {
                                        loggedUser? <>
                                        {
                                        log[0]?.role == 'House Owner' ? <>
                                            <p className='text-red-600 font-medium'>You are a House Owner! You have no right to book</p>
                                        </>
                                            :
                                            <>
                                                {
                                                    myBooking?.length == 2 ? <div>
                                                        <p className='text-red-600'>Allredy you booked 2 House</p>
                                                        <p>Plese manage your <NavLink
                                                        className="text-blue-600"
                                                        to='/dashboard/bookings'
                                                        >booking</NavLink></p>
                                                    </div> : <div>
                                                        <NavLink
                                                            to={`/house/${room._id}`}
                                                            className="btn btn-warning"
                                                            onClick={() => handleBooking(room._id)}
                                                        >
                                                            Book Now
                                                        </NavLink>
                                                    </div>

                                                }

                                            </>
                                    }
                                        </> : <>
                                        <div className='block'>
                                        <h2 className='text-xl font-medium text-red-600'>You have not login/signup yet</h2>
                                        <h2 className='text-green-500 font-medium text-xl'>Please <NavLink className='text-blue-800' to='/login'>Login</NavLink> or <NavLink className='text-blue-800' to='/signup'>SignUp</NavLink> First</h2>
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Room;