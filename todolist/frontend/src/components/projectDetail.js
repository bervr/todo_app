import React from 'react'
import {Link, useParams} from 'react-router-dom'


const ProjectItem = ({item, deleteProject}) => {
return (


<tr>
<td>{item.id}</td>
<td>{item.projectName}</td>
<td>{item.projectOwnerName}</td>
<td>{item.repoLink}</td>
<td><Link to={`/projectTodo/${item.projectName}`}>View tasks</Link></td>
<td><button onClick={()=>deleteProject(item.id)} type='button'>Delete project</button> </td>
</tr>
)}

const ProjectList = ({items, deleteProject, }) => {

let { id } = useParams();
let filtered_items = items.filter(item => item.id == id)
return (
    <div>
<table className="table table-striped">
<tr>
<th scope="col">ID</th>
<th scope="col">NAME</th>
<th scope="col">OWNER</th>
<th scope="col">LINK</th>
<th scope="col">Project task's</th>
<th scope="col"></th>
</tr>
{filtered_items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
</table>

        <Link to={{pathname:`/newitem/create/${id}`,
                projectId: id
                }}>Create new item</Link>


</div>
)
}
export default ProjectList
