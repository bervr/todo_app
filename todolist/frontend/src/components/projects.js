import React from 'react';
import { Link} from 'react-router-dom'
// список проектов


const ProjectItem =({project, users, deleteProject}) =>{
    return(
    <tr>

        <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
        <td><Link to={`/project/${project.id}`}>{project.projectName }</Link></td>
        {/*<td>{project.projectName }</td>*/}
        <td>{project.repoLink}</td>
        <td>{project.projectOwnerName}</td>
        <td>{project.projectGroup.map((item) => (users.filter((user)=> user.id === item)[0].username)).join(', ')} </td>
        <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete project</button> </td>
    </tr>

    )

}

const Projects =({projects, users, deleteProject}) => {
    return(
    <div>
    <table className="table table-striped">
    <thead>
    <tr>
    <th scope="col">details</th>
    <th scope="col">Project name</th>
    <th scope="col">Repo link</th>
    <th scope="col">Project owner</th>
    <th scope="col">Project group</th>
    <th scope="col">#</th>
    </tr>
    </thead>
    <tbody>
    {projects.map((project) => <ProjectItem project = {project}  users={users}  deleteProject = {deleteProject} />)}
    </tbody>
    </table>
    <Link to='/project/create'>Create new project</Link>
    </div>



    )

}

export default Projects;