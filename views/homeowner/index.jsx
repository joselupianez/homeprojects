import React from 'react';
import Main from '../components/Main'

export default function Index(props) {
  return (
    <Main isLoggedIn = {props.isLoggedIn} messages={props.messages}>
      <main className="hero py-10">
          <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/images/hero-bg.jpg" className="md:max-w-lg rounded-lg shadow-2xl" />
              <div>
                  <h1 className="text-5xl font-bold">Find The Right Pro For Your Home Projects</h1>
                  <p className="py-6">If you're looking for pros for your home projects, look no further! <span className="font-bold">HomeProjects</span> makes it easy for you to connect with skilled professionals in your neighborhood who are dedicated to providing quality home service.</p>
                  <a href="/pro/register" className="btn btn-primary">Get Started</a>
              </div>
          </div>
      </main>
    </Main>
  );
}