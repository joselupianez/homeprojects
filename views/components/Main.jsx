import React from 'react';
import Navbar from './Navbar';
import Error from './Error';

export default function Main(props) {
  return (
    <>
    <html data-theme="night" lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>HomeProjects</title>
            <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body>
            <div className="flex flex-col h-screen">
              <Navbar isLoggedIn = {props.isLoggedIn} />
              <div className="grow bg-neutral text-neutral-content">
                <Error messages = {props.messages} />
                {props.children}
              </div>
            </div>
            <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
            <script src="/js/main.js"></script>
        </body>
    </html>
    </>
  );
}