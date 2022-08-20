import React from 'react'
import {Link, useParams} from 'react-router-dom'


const ProjectItem = ({item}) => {
return (
<tr>
<td>{item.id}</td>
<td>{item.projectName}</td>
<td>{item.projectOwner}</td>
<td>{item.repoLink}</td>
<td><Link to={`/projectTodo/${item.projectName}`}>View tasks</Link></td>
</tr>
)
}


const ProjectList = ({items}) => {

let { id } = useParams();
let filtered_items = items.filter(item => item.id == id)
return (
<table class="table table-striped">
<tr>
<th scope="col">ID</th>
<th scope="col">NAME</th>
<th scope="col">OWNER</th>
<th scope="col">LINK</th>
<th scope="col">Project task's</th>
</tr>
{filtered_items.map((item) => <ProjectItem item={item} />)}
</table>
)
}
export default ProjectList
