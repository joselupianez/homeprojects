import React from 'react';
import Main from '../../components/Main'
import Comments from '../../components/Comments'

export default function Single({isLoggedIn, project, comments, connections, messages}) {
  return (
    <Main isLoggedIn = {isLoggedIn} messages={messages}>
        <div className="container mx-auto py-5">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="sm:flex">
                        <h2 className="card-title flex-auto">{project.title}</h2>
                        <div className="flex py-2 sm:justify-end sm:basis-1/4">
                            <a className="text-primary pr-5 sm:px-5" href={`/projects/edit/${project._id}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></a>
                            <form action={`/projects/delete/${project._id$}?_method=DELETE`} method="POST">
                                <button type="submit" className="text-accent cursor-pointer"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                            </form>
                        </div>
                    </div>
                    <p className="mt-4 text-md">{project.description}</p>
                    
                    {project.images.length > 0 
                        ? (
                            <section class="photos">
                                <div className="divider"></div>
                                <h3 className="font-bold uppercase">Photos</h3>
                                <div className="carousel carousel-center p-4 space-x-4 rounded-box">
                                    {project.images.map((img,i) => 
                                    <div id={`item-${i}`} className="carousel-item w-1/2">
                                        <a href={`#modal-${i}`}><img src={img} className="rounded-box" /></a>
                                    </div>
                                    )}
                                </div>
                                {project.images.map((img,i) =>
                                    <div className="modal" id={`modal-${i}`}>
                                        <div className="modal-box w-11/12 max-w-5xl">
                                            <img src={img} className="w-full" />
                                            <div className="modal-action">
                                                <a href="#" className="btn">Close</a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        ) : null
                    }
                    <div className="divider"></div>
                    <Comments comments={comments} connections={connections}/>
                    {/* <% if(comments.length > 0){ %>
                        <% comments.forEach((comment,i, arr) => { %>
                            <div className="py-5">
                                <div className="flex items-center flex-1 font-bold leading-tight">
                                    <div className="avatar placeholder pr-4">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                            <%  if(comment.userId.company.logo){ %>
                                            <img src="<%= comment.userId.company.logo %>" />
                                            <% } else { %>
                                            <span className="text-3xl"><%= comment.userId.company.companyName.split(' ').map(w => w[0]).join('').toUpperCase() %></span>
                                            <% } %>
                                        </div>
                                    </div>
                                    <%= comment.userId.company.companyName %>
                                    <span className="pl-4 text-xs font-normal text-gray-500"><%= project.createdAt.toLocaleString() %></span>
                                </div>
                                <% if(comment.userId.isProfessional && !connections.includes(comment.userId._id.toString())){ %>
                                    <div className="float-right">
                                        <form action="/connect/request/<%= comment.userId._id %>" method="POST">
                                            <button className="btn btn-xs">Connect</button>
                                        </form>
                                    </div>
                                <% } %>
                                <p className="mt-4 text-md"><%= comment.comment %></p>

                                <% if(comment.replies && comment.replies.length > 0){ %>
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
                                <% } %>

                                <form className="py-4" action="/projects/addReply/<%=comment._id%>" method="POST" className="col-3">
                                    <div className="form-control">
                                        <textarea id="reply" name="reply" className="textarea textarea-bordered" placeholder="Add Reply"></textarea>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Add Reply</button>
                                    </div>
                                </form>
                            </div>
                            <% if(arr.length > 0 && i != arr.length - 1){ %>
                                <div className="divider"></div>
                            <% } %>
                        <% }) %>
                    <% } else { %>
                        <p className="mt-4 text-md text-gray-600">No comments yet.</p>
                    <% } %>  */}
                </div>
            </div>
        </div>
    </Main>
  );
}