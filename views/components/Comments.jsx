import React from 'react';

export default function Comment({comments, connections}) {
  return (
    <section class="comments">
        <h3 className="font-bold uppercase">Comments</h3>
        {comments.length > 0 
            ? (
                <>
                {comments.map((comment, i, arr) =>
                    <div className="py-5">
                        <div className="flex items-center flex-1 font-bold leading-tight">
                            <div className="avatar placeholder pr-4">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    {comment.userId.company.logo 
                                        ? (
                                            <img src={comment.userId.company.logo} />
                                        )
                                        : (
                                            <span className="text-3xl">{comment.userId.company.companyName.split(' ').map(w => w[0]).join('').toUpperCase()}</span>
                                        )
                                    }
                                </div>
                            </div>
                            {comment.userId.company.companyName}
                            <span className="pl-4 text-xs font-normal text-gray-500">{comment.createdAt.toLocaleString()}</span>
                        </div>
                        {(comment.userId.isProfessional && !connections.includes(comment.userId._id.toString())) &&
                            <div className="float-right">
                                <form action="/connect/request/<%= comment.userId._id %>" method="POST">
                                    <button className="btn btn-xs">Connect</button>
                                </form>
                            </div>
                        }
                        <p className="mt-4 text-md">{comment.comment}</p>
                        {comment.replies && comment.replies.length > 0 
                            ? (
                                <>
                                    <div className="divider"></div>
                                    {comment.replies.map(arr =>
                                        <div className="flex align-right items-center flex-1 font-bold leading-tight pb-2 pl-10">
                                            <div className="avatar placeholder pr-4">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                                    {arr.userId.isProfessional && arr.userId.company.logo 
                                                        ? (
                                                            <img src={arr.userId.company.logo} />
                                                        ) : (
                                                            <span className="text-3xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            
                                            {arr.userId.company?.companyName ? (
                                                <>
                                                {arr.userId.company.companyName}
                                                </>
                                            ) : (
                                                <>
                                                {arr.userId.firstName} <span className="text-xs px-2">(Name Hidden)</span>
                                                </>
                                            )}
                                            <span className="pl-4 text-xs font-normal text-gray-500">{arr.createdAt.toLocaleString()}</span>
                                                
                                            {arr.userId._id.toString() == project.user._id.toString() &&
                                                <div className="float-right">
                                                    <form action="/projects/<%= comment._id %>/removeReply/<%= arr._id %>?_method=DELETE" method="POST">
                                                        <button type="submit" className="text-accent cursor-pointer"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                                    </form>
                                                </div>
                                            }
                                        </div>

                                        // <% if(arr.userId._id.toString() == project.user._id.toString()){ %>
                                        //     <div className="float-right">
                                        //         <form action="/projects/<%= comment._id %>/removeReply/<%= arr._id %>?_method=DELETE" method="POST">
                                        //             <button type="submit" className="text-accent cursor-pointer"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                        //         </form>
                                        //     </div>
                                        // <% } %>
                                        // <% if(arr.userId.isProfessional && !connections.includes(arr.userId._id.toString())){ %>
                                        //     <div className="float-right">
                                        //         <form action="/connect/request/<%= comment.userId._id %>" method="POST">
                                        //             <button className="btn btn-xs">Connect</button>
                                        //         </form>
                                        //     </div>
                                        // <% } %>
                                        // <p className="text-md pl-10"><%= arr.reply %></p>
                                        // <div className="divider pl-10"></div>
                                    )}
                                </>
                            ) : null
                        }

                        {/* <% if(comment.replies && comment.replies.length > 0){ %>
                            <div className="divider"></div>
                            <% comment.replies.forEach(arr => { %>
                                <div className="flex align-right items-center flex-1 font-bold leading-tight pb-2 pl-10">
                                    <div className="avatar placeholder pr-4">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                            <% if(arr.userId.isProfessional && arr.userId.company.logo){ %>
                                            <img src="<%= arr.userId.company.logo %>" />
                                            <% } else { %>
                                            <span className="text-3xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span>
                                            <% } %>
                                        </div>
                                    </div>
                                    <% if(arr.userId._id.toString() == project.user._id.toString()){ %>
                                        You <span className="text-xs px-2">(Name Hidden)</span>
                                    <%} else if(arr.userId.isProfessional){ %>
                                        <%= arr.userId.company.companyName %>
                                    <% } %>
                                    <span className="pl-4 text-xs font-normal text-gray-500"><%= arr.createdAt.toLocaleString() %></span>
                                </div>
                                <% if(arr.userId._id.toString() == project.user._id.toString()){ %>
                                    <div className="float-right">
                                        <form action="/projects/<%= comment._id %>/removeReply/<%= arr._id %>?_method=DELETE" method="POST">
                                            <button type="submit" className="text-accent cursor-pointer"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                        </form>
                                    </div>
                                <% } %>
                                <% if(arr.userId.isProfessional && !connections.includes(arr.userId._id.toString())){ %>
                                    <div className="float-right">
                                        <form action="/connect/request/<%= comment.userId._id %>" method="POST">
                                            <button className="btn btn-xs">Connect</button>
                                        </form>
                                    </div>
                                <% } %>
                                <p className="text-md pl-10"><%= arr.reply %></p>
                                <div className="divider pl-10"></div>
                            <% }) %>
                        <% } %> */}

                    </div>
                )}
                </>
            ) : null 
        }
    </section>
  )
}