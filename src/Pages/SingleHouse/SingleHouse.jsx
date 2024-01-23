import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import useLoggedUser from '../../Hooks/useLogged';

const SingleHouse = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [people, setpeople] = useState([]);
    const logged = useLoggedUser();
    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    useEffect(() => {
        const romeData = rooms.find((data) => data._id === id);
        setRoom(romeData);
    }, [rooms])
    useEffect(() => {
        const userData = allUsers.find((data) => data.email === logged?.email);
        setpeople(userData);
    }, [allUsers])

    // console.log(people?.fullName)

    // console.log(people);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, login, logout, loading } = useContext(AuthContext);
    
    console.log(id);
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const phone= e.target.phone.value;
        console.log(phone, id);
        const data  = {houseID:id, userId:people._id, userName:people?.fullName, userEmail:people?.email, userPhone:people?.phone};
        console.log(room._id,data);

        fetch('https://speedy-send-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json' 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    
    }
    return (
        <div className='flex mx-10 gap-5'>
            <div className='w-2/3 bg-slate-300 rounded-2xl shadow-2xl my-5'>

            </div>
            {/* {id} */}
            <div className='w-1/3 bg-red-300  rounded-xl shadow-2xl my-5'>
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            placeholder="Name"
                            className="input input-bordered"
                            name="name"
                            value={people?.fullName}
                            
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="email"
                            readOnly
                            className="input input-bordered"
                            name="email"
                            value={people?.email}
                            
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type='text'
                            placeholder='phone'
                            className='input input-bordered'
                            name='phone'
                            defaultValue={people?.phoneNumber}
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Confarm Your Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleHouse;