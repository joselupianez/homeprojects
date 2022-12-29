import React from 'react';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Error from '../components/Error';

export default function Login(props){
    return (
        <Main isLoggedIn = {props.isLoggedIn} messages={props.messages}>
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold py-3">Login</h1>
                <section className="flex flex-col gap-2 mb-4">
                    <form action="/login" method="POST">
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" className={`input input-bordered ${props.validationErrors.emailError || props.validationErrors.emailTakenError ? 'input-error' : ''}`} id="email" placeholder="Email Address" defaultValue={`${ typeof props.email != 'undefined' ? props.email : ''}`} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" className={`input input-bordered ${props.validationErrors.passwordError ? 'input-error' : ''}`} id="password" placeholder="*******" defaultValue={`${typeof props.password != 'undefined' ? props.password : ''}`} required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="py-5 text-sm">Are you a professional? <a href="pro/login" className="link">Login as a Pro</a></p>
                </section>
            </div>
        </Main>
    )
}