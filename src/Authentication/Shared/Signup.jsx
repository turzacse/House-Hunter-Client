
import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPhoneNumberValid = (phoneNumber) => {
    return phoneNumber.length === 11 && /^\d+$/.test(phoneNumber);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate phone number before sending the request
    if (!isPhoneNumberValid(formData.phoneNumber)) {
      setErr("Invalid phone number. Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch('https://house-hunter-server-puce.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        const loginData = { email: formData.email, password: formData.password };
        login(loginData);
        navigate(location?.state ? location.state : '/dashboard');
      } else {
        const errorResult = await response.json();
        console.error(`Registration failed: ${errorResult.message}`);
        setErr(errorResult.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErr(error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mb-10 font-bold">SignUp now!</h1>
            <img className="w-2/3" src="https://i.ibb.co/RGF2vzZ/auth.png" alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleRegistration}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="input input-bordered"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="House Owner">House Owner</option>
                  <option value="House Renter">House Renter</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
                <p className=''>Already Register in our website! <NavLink className='text-blue-600' to='/login'>Please Login</NavLink></p>
              
              <div className="form-control mt-6">
                {
                   err &&  <p className='text-red-800 font-bold mb-2'>{err}!! Please Try again</p>
                }
                
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;