import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Navber/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;