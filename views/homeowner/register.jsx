import React from 'react';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Error from '../components/Error';

export default function Register(props){
    return (
        <Main isLoggedIn = {props.isLoggedIn} messages={props.messages}>
            <div className="container mx-auto py-5">
                <h1 className="text-3xl font-bold py-3">Register</h1>
                <section className="flex flex-col gap-2 mb-4">
                    <form action="/register" method="POST">
                        <div className="form-control">
                            <label htmlFor="firstName" className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" name="firstName" id="firstName" className="input input-bordered" placeholder="First name" value={typeof props.firstName != 'undefined' ? props.firstName : ''} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="lastName" className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" name="lastName" id="lastName" className="input input-bordered" placeholder="Last name" value={typeof props.lastName != 'undefined' ? props.lastName : ''} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" className={`input input-bordered ${props.validationErrors.emailError || props.validationErrors.emailTakenError ? 'input-error' : ''}`} id="email" placeholder="Email Address" value={typeof props.email != 'undefined' ? props.email : ''} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" className={`input input-bordered ${props.validationErrors.passwordError ? 'input-error' : ''}`} id="password" placeholder="*******" value={typeof props.password != 'undefined' ? props.password : ''} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="confirmPassword" className={`input input-bordered ${props.validationErrors.confirmationError ? 'input-error' : ''}`} id="confirmPassword" placeholder="*******" value={typeof props.confirmPassword != 'undefined' ? props.confirmPassword : ''} required />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="py-5 text-sm">Are you a professional? <a href="pro/register" className="link">Register as a Pro</a></p>
                </section>
            </div>
        </Main>
    )
}