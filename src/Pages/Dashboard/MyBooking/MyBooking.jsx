import React, { useEffect, useState } from 'react';
import useLoggedUser from '../../../Hooks/useLogged';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyBooking = () => {
    const loggedUser = useLoggedUser();
    const [bookingData, setBookingData] = useState([]);
    const [myBoking, setMyBooking] = useState([]);
    
    useEffect( () => {
        fetch('https://house-hunter-server-puce.vercel.app/bookings')
        .then(res => res.json())
        .then(data => setBookingData(data))
    } ,[])

    useEffect( () => {
        if(bookingData) {
            const data = bookingData.filter((booking) => booking.userEmail === loggedUser?.email) ;
            setMyBooking(data);
        }
    } ,[bookingData])

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

                fetch(`https://house-hunter-server-puce.vercel.app/bookings/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Booking has been deleted.',
                                'success'
                            )
                            const remain = myBoking.filter(cart => cart._id !== _id);
                            console.log(remain);
                            setMyBooking(remain);
                        }
                    })
            }
        })
    }
console.log(myBoking);
    return (
        <div>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>House ID</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {myBoking.map((room) => (
                        <tr key={room._id}>
                            <td>{room.name}</td>
                            <td>
                                <button className='text-red-600 btn text-3xl mr-2' onClick={() => handleDelete(room._id)}><MdDelete /></button>
                                {/* <button className='text-green-600 text-2xl' onClick={() => handleEdit(room)}><MdEdit /></button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooking;