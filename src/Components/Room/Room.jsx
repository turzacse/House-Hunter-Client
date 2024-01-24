import React, { useEffect, useState } from 'react';
import useLoggedUser from '../../Hooks/useLogged';
import { NavLink } from 'react-router-dom';
import useBooking from '../../Hooks/useBooking';

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [log, setLog] = useState([]);
    const [query, setQuery] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [bedroomFilter, setBedroomFilter] = useState("");
    const [bathroomFilter, setBathroomFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");
    const [rentFilter, setRentFilter] = useState("");
    const [filter, setFilter] = useState([]);
    const loggedUser = useLoggedUser();
    const myBooking = useBooking();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 5;
    const [displayedRooms, setDisplayedRooms] = useState([]);

    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setFilter(data);
                setDisplayedRooms(data.slice(0, roomsPerPage));
            })
    }, [])

    const handleSearch = () => {
        const roomItem = rooms.filter((room) =>
            room?.name.toLowerCase().includes(query.toLowerCase()) &&
            (cityFilter ? room.city.toLowerCase() === cityFilter.toLowerCase() : true) &&
            (bedroomFilter ? room.bedroom.toString() === bedroomFilter : true) &&
            (bathroomFilter ? room.bathroom.toString() === bathroomFilter : true) &&
            (sizeFilter ? room.size.toString() === sizeFilter : true) &&
            (availabilityFilter ? room.available.toLowerCase() === availabilityFilter.toLowerCase() : true) &&
            (rentFilter ? room.rent.toString() === rentFilter : true)
        );
        setFilter(roomItem);
        setDisplayedRooms(roomItem.slice(0, roomsPerPage));
        setCurrentPage(1);
    }

    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/users')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    useEffect(() => {
        if (allUsers) {
            const user = allUsers.filter((data) => data.email === loggedUser?.email);
            setLog(user);
        }
    }, [allUsers])

    const handleReset = () => {
        useEffect( () => {
            setFilter(rooms);
        } ,[rooms])
    }

    const paginate = (pageNumber) => {
        const indexOfLastRoom = pageNumber * roomsPerPage;
        const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
        setDisplayedRooms(filter.slice(indexOfFirstRoom, indexOfLastRoom));
        setCurrentPage(pageNumber);
    };

    return (
        <div className='mx-20'>
            <h2 className='text-center text-5xl font-bold mb-5'>Our Feature Room</h2>
            <div className='divider'></div>
            <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 mb-5">
                <div className="lg:w-1/4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered pr-16"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="lg:w-1/4">
                    <select
                        className="select select-bordered pr-16"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    >
                        <option value="">Select City</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Mymensingh">Mymensingh</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="lg:w-1/4">
                    <select
                        className="select select-bordered pr-16"
                        value={bedroomFilter}
                        onChange={(e) => setBedroomFilter(e.target.value)}
                    >
                        <option value="">Select Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="lg:w-1/4">
                    <select
                        className="select select-bordered pr-16"
                        value={bathroomFilter}
                        onChange={(e) => setBathroomFilter(e.target.value)}
                    >
                        <option value="">Select Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="lg:w-1/4">
                    <select
                        className="select select-bordered pr-16"
                        value={sizeFilter}
                        onChange={(e) => setSizeFilter(e.target.value)}
                    >
                        <option value="">Select Room Size</option>
                        <option value="1000">1000 sqft</option>
                        <option value="1100">1100 sqft</option>
                        <option value="1200">1200 sqft</option>
                        <option value="1300">1300 sqft</option>
                        <option value="1400">1400 sqft</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="lg:w-1/4">
                    <select
                        className="select select-bordered pr-16"
                        value={rentFilter}
                        onChange={(e) => setRentFilter(e.target.value)}
                    >
                        <option value="">Select Rent Per Month</option>
                        <option value="12000">12000</option>
                        <option value="15000">15000</option>
                        <option value="20000">20000</option>
                        <option value="25000">25000</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <button onClick={handleSearch} className="text-blue-600 btn bg-orange-200 lg:ml-2">Search & Filter</button>
                <button onClick={handleReset} className=" btn bg-red-600 text-white w-[100px]  lg:ml-2">Reset</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {displayedRooms.map(room => (
                    <div key={room._id}>
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
                                    <h2>Available from: {room.available}</h2>
                                    <h2>Rent Per Month: {room.rent}</h2>
                                </div>

                                <p>For More discussion Call here: {room.phone}</p>

                                <p>Description: {room.description}</p>
                                <div className="card-actions justify-end">
                                    {loggedUser ? (
                                        <>
                                            {!log[0]?.role === 'House Owner' ? (
                                                <>
                                                    <p className='text-red-600 font-medium'>You are a House Owner! You have no right to book</p>
                                                </>
                                            ) : (
                                                <>
                                                    {myBooking?.length === 2 ? (
                                                        <div>
                                                            <p className='text-red-600'>Already you booked 2 Houses</p>
                                                            <p>Please manage your <NavLink
                                                                className="text-blue-600"
                                                                to='/dashboard/bookings'
                                                            >booking</NavLink></p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <NavLink
                                                                to={`/house/${room._id}`}
                                                                className="btn btn-warning"
                                                                onClick={() => handleBooking(room._id)}
                                                            >
                                                                Book Now
                                                            </NavLink>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className='block'>
                                                <h2 className='text-xl font-medium text-red-600'>You have not logged in/sign up yet</h2>
                                                <h2 className='text-green-500 font-medium text-xl'>
                                                    Please <NavLink className='text-blue-800' to='/login'>Login</NavLink> or <NavLink className='text-blue-800' to='/signup'>SignUp</NavLink> First
                                                </h2>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ul className="pagination flex gap-5 text-green-600 font-extrabold mb-20">
                {Array.from({ length: Math.ceil(filter.length / roomsPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'text-red-600 text-2xl' : ''}`}>
                        <button className="page-link" onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Room;
