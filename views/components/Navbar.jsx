import React from 'react';

export default function Navbar(props){
    return (
        <header className="shadow-sm">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                                {props.isLoggedIn ? (
                                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a href="/projects">My Projects</a></li>
                                        <li><a href="/profile">Profile</a></li>
                                        <li><a href="/logout">Logout</a></li>
                                    </ul>
                                ) : (
                                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a href="/register">Register</a></li>
                                        <li><a href="/login">Login</a></li>
                                        <li><a href="/pro">Join Pros</a></li> 
                                    </ul>
                                )}
                        </div>
                        <a href="/">
                            <div className="font-title text-primary inline-flex text-lg md:text-3xl">
                                <span>Home</span> 
                                <span className="text-base-content">Projects</span>
                            </div>
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        {props.isLoggedIn ? (
                            <ul className="menu menu-horizontal p-0">
                                <li><a href="/projects">My Projects</a></li>
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        ) : (
                            <ul className="menu menu-horizontal p-0">
                                <li><a href="/register">Register</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/pro">Join Pros</a></li>
                            </ul>
                        )}
                    </div>
                    <div className="navbar-end">
                        <a href="/projects/add" className="btn">New Project</a>
                    </div>
                </div>
            </div>
        </header>
    );
}