import React from 'react';
import { Link} from 'react-router-dom'



const ProjectItem =({project}) =>{
    return(
    <tr>

        <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
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
    <th scope="col">details</th>
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