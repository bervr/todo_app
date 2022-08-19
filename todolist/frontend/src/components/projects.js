import React from 'react';


const ProjectItem =({project}) =>{
    return(
    <tr>
        <td>{project.projectName }</td>
        <td>{project.repoLink}</td>
        <td>{project.projectOwner}</td>
        <td>{project.projectGroup.join(', ')}</td>
    </tr>

    )

}

const Projects =({projects}) => {
    return(
    <table class="table table-striped">
    <thead>
    <tr>
    <th scope="col">Project name</th>
    <th scope="col">Repo link</th>
    <th scope="col">Project owner</th>
    <th scope="col">Project group</th>
    </tr>
    </thead>
    <tbody>
    {projects.map((project) => <ProjectItem project = {project} />)}
    </tbody>
    </table>

    )

}

export default Projects;