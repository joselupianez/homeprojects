import React from 'react';
import Main from '../../components/Main'

export default function Index(props) {
  return (
    <Main isLoggedIn = {props.isLoggedIn} messages={props.messages}>
        <div class="container mx-auto py-5">
            <h1 class="text-3xl font-bold py-6">My Projects</h1>
                {props.projects 
                    ? (
                        <div class="overflow-x-auto w-full">
                            <table class="table w-full">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {props.projects.map(project =>
                                        <tr>
                                            <td>
                                                <div class="flex flex-col">
                                                    <a href={`/projects/${project._id}`} class="font-bold">{project.title}</a>
                                                    <span class="text-xs font-normal text-gray-500">{project.createdAt.toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                                            </td>
                                            <td>
                                                <a href={`/projects/${project._id}`} class="btn btn-ghost btn-xs">View</a>
                                            </td>
                                        </tr> 
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    ) 
                    : (
                        <p class="font-bold">You have no projects yet.</p>
                    )
                }
        </div>
    </Main>
  );
}