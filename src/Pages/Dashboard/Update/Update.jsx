import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLoggedUser from '../../../Hooks/useLogged';
import Swal from 'sweetalert2';

const Update = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [people, setpeople] = useState([]);
    const logged = useLoggedUser();
    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [])
    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/users')
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
    console.log(people, room);

    const handleupdate = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const address = form.address.value;
        const city = form.city.value;
        const bedroom = form.bedroom.value;
        const bathroom = form.bathroom.value;
        const size = form.size.value;
        const available = form.available.value;
        const rent = form.rent.value;
        const phone = form.phone.value;
        const description = form.description.value;


        const info = { name, address, city, bedroom, bathroom, size, available, rent,  phone, description }

        console.log(info);
        console.log(room._id)
        fetch(`https://house-hunter-server-puce.vercel.app/rooms/${room?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Info has been Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.href = '/dashboard/allhouses';
                }
            })
    }
    return (
        <div>
            <div className="bg-base-200 p-10 md:w-1/2 w-full mx-auto shadow-2xl my-4 rounded-2xl">
                <form onSubmit={handleupdate}>
                      <h2 className='text-3xl font-bold'>Update the Info</h2>
                    <br />
                    <label className=''>Name</label>
                    <br />

                    <input defaultValue={room?.name} type="text" name="name" placeholder="Your Name" className="input input-bordered w-full my-4" required />

                    <div className="flex w-full gap-5">
                        <div className='w-1/2'>
                            <label>Address</label>
                            <br />
                            <input defaultValue={room?.address} type="text" name="address" placeholder="Address" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/2'>
                            <label>City</label>
                            <br />
                            <input defaultValue={room?.city} type="text" name="city" placeholder="City" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    {/* room details   */}
                    <label>Room Details</label>
                    <br />
                    <div className="flex w-full gap-5">
                        <div className='w-1/3'>
                            <input defaultValue={room?.bedroom} type="number" name="bedroom" placeholder="Bedroom" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/3'>
                            <input defaultValue={room?.bathroom} type="number" name="bathroom" placeholder="Bathroom" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/3'>
                            <input defaultValue={room?.size} type="text" name="size" placeholder="Size" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    <div className="flex w-full gap-5">
                        <div className='w-1/2'>
                            <label>Available date</label>
                            <br />
                            <input defaultValue={room?.available} type="date" name="available" placeholder="Available date" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/2'>
                            <label>Rent Per Month</label>
                            <br />
                            <input defaultValue={room?.rent} type="Number" name="rent" placeholder="rent per month" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    <label>Phone Number</label>
                    <br />
                    <input defaultValue={room?.phone} type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full my-4" required />

                    <label>Description</label>
                    <br />
                    <input defaultValue={room?.description} type="text" name="description" placeholder="Description" className="input input-bordered w-full my-4" required />


                    <input type="submit" className="btn w-full mt-4 bg-yellow-200" value="Update Info" />

                </form>
            </div>

        </div>
    );
};

export default Update;