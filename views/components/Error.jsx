import React from 'react';

export default function Error({messages}){
    return (
        <>
        {messages.errors 
            ? (
                <div className="container mx-auto pt-5">
                {messages.errors.map(el =>
                    <div className="alert alert-error shadow-lg my-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{el.msg}</span>
                        </div>
                    </div>
                )}
                </div>
            )
            : null 
        }
        {messages.success
            ? (
                <div className="container mx-auto pt-5">
                    <div className="alert alert-success shadow-lg my-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{messages.success[0].msg}</span>
                        </div>
                    </div>
                </div>
            )
            : null 
        }
        </>
    );
}