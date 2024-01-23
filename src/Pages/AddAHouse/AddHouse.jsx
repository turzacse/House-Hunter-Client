import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useLoggedUser from '../../Hooks/useLogged';

const AddHouse = () => {

    const loggedUser = useLoggedUser();
        console.log(loggedUser);

    const key = import.meta.env.VITE_IMAGE_HOSTING
    const image_hosting_key = `https://api.imgbb.com/1/upload?key=${key}`;

    const [img, setImg] = useState('')
    const handleUpload = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(image_hosting_key, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image hosted successfully. URL:', data.data.url);
                setImg(data.data.url);
                return data.data.url;
            } else {
                throw new Error('Image hosting failed');
            }
        } catch (error) {
            console.error('Error hosting image:', error);
            return null;
        }
    };


    console.log(img);
    //console.log(handleUpload);
    const handleAddRoom = e => {
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
       
        
        const userEmail = loggedUser?.email;

        if (!img) {
            console.log("Image upload in progress. Please wait.");
            Swal.fire({
                icon: 'success',
                title: 'Image upload in progress. Please wait.',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        const project = { name, address, city, bedroom, bathroom, size, available, rent,  phone, description, img, userEmail }

        console.log(project);
        //send data 
        fetch('http://localhost:3000/rooms', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your room has been added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        // e.target.reset();
    }
    return (
        <>
            <Helmet>
                <title>Add A House</title>
            </Helmet>
            <div className="bg-base-200 p-10 md:w-1/2 w-full mx-auto shadow-2xl my-4 rounded-2xl">
                <h3 className="text-2xl font-semibold text-center mb-10">Add A Contact Info</h3>
                <form onSubmit={handleAddRoom}>

                    <label>Room's Picture</label>
                    <br />
                    <input
                        type="file"
                        required
                        className="my-4 w-3/4"
                        accept="image/*"
                        onChange={handleUpload}
                    />

                    <br />
                    <label className=''>Name</label>
                    <br />

                    <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full my-4" required />

                    <div className="flex w-full gap-5">
                        <div className='w-1/2'>
                            <label>Address</label>
                            <br />
                            <input type="text" name="address" placeholder="Address" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/2'>
                            <label>City</label>
                            <br />
                            <input type="text" name="city" placeholder="City" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    {/* room details   */}
                    <label>Room Details</label>
                    <br />
                    <div className="flex w-full gap-5">
                        <div className='w-1/3'>
                            <input type="number" name="bedroom" placeholder="Bedroom" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/3'>
                            <input type="number" name="bathroom" placeholder="Bathroom" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/3'>
                            <input type="text" name="size" placeholder="Size" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    <div className="flex w-full gap-5">
                        <div className='w-1/2'>
                            <label>Available date</label>
                            <br />
                            <input type="date" name="available" placeholder="Available date" className="input input-bordered w-full my-4" required />
                        </div>
                        <div className='w-1/2'>
                            <label>Rent Per Month</label>
                            <br />
                            <input type="Number" name="rent" placeholder="rent per month" className="input input-bordered w-full my-4" required />
                        </div>
                    </div>

                    <label>Phone Number</label>
                    <br />
                    <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full my-4" required />

                    <label>Description</label>
                    <br />
                    <input type="text" name="description" placeholder="Description" className="input input-bordered w-full my-4" required />


                    <input type="submit" className="btn w-full mt-4 bg-yellow-200" value="Add A House" />

                </form>
            </div>
        </>
    );
};

export default AddHouse;