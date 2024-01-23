import React from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <nav>
                    <header className="footer-title">My Services</header>            
                    <a className="link link-hover">MERN Stack Development</a>
                    <a className="link link-hover">Web Developmenmt</a>
                    <a className="link link-hover">Front End Development</a>
                    <a className="link link-hover">Responsive Design</a>
                </nav>
                <nav>
                    <header className="footer-title">Contact Solution</header>
                    <Link to='/'>Home</Link>
                    <Link to='/addcontacts'>Add Contacts</Link>
                    <Link to='/contacts'>All Contacts</Link>
                </nav>
                <nav>
                    <header className="footer-title">Feature</header>
                    <a className="link link-hover">Responsive Design</a>
                    <a className="link link-hover">Crud Operation</a>
                    <a className="link link-hover"></a>
                </nav>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
                <aside className="items-center grid-flow-col">
                    <img className='w-[80px] h-[80px]' src="https://i.ibb.co/6DFF7Dr/neutron-icon.png" alt="" />
                    <p>Contact Solution<br />Providing reliable service since 2023</p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid text-2xl grid-flow-col gap-4">
                        <Link to='https://www.linkedin.com/in/turzacse'> <FaLinkedin/> </Link>
                        <Link to='https://web.facebook.com/fahimmontasir.siam'> <FaFacebookSquare/> </Link>
                        <Link to='https://github.com/turzacse'> <FaGithub/> </Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;