import React, { useEffect, useState } from 'react';
import useLoggedUser from '../../../Hooks/useLogged';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const AllHouses = () => {
    const loggedUser = useLoggedUser();
    const [allRoom, setAllRoom] = useState([]);
    const [owenrRoom, setOwerRoom] = useState([]);
    useEffect(() => {
        fetch('https://house-hunter-server-puce.vercel.app/rooms')
            .then(res => res.json())
            .then(data => setAllRoom(data))
    }, [])

    useEffect(() => {
        if (allRoom && loggedUser) {
            const House = allRoom.filter((room) => room?.userEmail === loggedUser?.email);
            setOwerRoom(House);
        }
    }, [allRoom])

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://house-hunter-server-puce.vercel.app/rooms/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your room has been deleted.',
                                'success'
                            )
                            const remain = owenrRoom.filter(cart => cart._id !== _id);
                            console.log(remain);
                            setOwerRoom(remain);
                        }
                    })
            }
        })
    }
    console.log(loggedUser?.email, allRoom);
    return (
        <div className='w-[300px] md:w-full'>
            <h2 className='text-center font-bold text-xl md:text-3xl'>Your Houses</h2>
            <div className='divider'></div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Available date</th>
                        <th>Rent</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {owenrRoom.map((room) => (
                        <tr key={room._id}>
                            <td>{room.name}</td>
                            <td>{room.address}</td>
                            <td>{room.city}</td>
                            <td>{room.rent}</td>
                            <td>
                                <button className='text-red-600 text-2xl mr-2' onClick={() => handleDelete(room._id)}><MdDelete /></button>
                                <NavLink to={`/update/${room._id}`} className='text-green-600 text-2xl' onClick={() => handleEdit(room)}><MdEdit /></NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllHouses;