import React, { useEffect, useState } from 'react';
import useLoggedUser from '../../Hooks/useLogged';
import { NavLink } from 'react-router-dom';

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [])
    const user = useLoggedUser();
    console.log(user?.email);

    const handleBooking = (id) => {
        console.log(id);
    }

    return (
        <div className='mx-20'>
            <h2 className='text-center text-5xl font-bold'>Our Feature Room</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    rooms.map(room => <div key={room._id}>
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img src={room.img} alt="Shoes" /></figure>
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

                                    }
                                    <NavLink
                                        to={`/house/${room._id}`}
                                        className="btn btn-primary"
                                        onClick={() => handleBooking(room._id)}
                                    >
                                        Book Now
                                    </NavLink>
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