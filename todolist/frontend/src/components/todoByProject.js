import React from 'react'
import { useParams, Link } from 'react-router-dom'


const TodoItem =({todoitem, deleteTodoItem}) =>{
    return(
    <tr>
        <td>{todoitem.itemProject}</td>
        <td>{todoitem.created}</td>
        <td>{todoitem.note}</td>
        <td>{todoitem.todoStatus}</td>
        <td>{todoitem.itemOwner}</td>
        <td><button onClick={()=>deleteTodoItem(todoitem.id)} type='button'>Delete note</button></td>
    </tr>

    )
}


const TodoList = ({items, deleteTodoItem}) => {
let { projectName } = useParams();
let filteredItems = items.filter(item => item.itemProjectName == projectName)
return (
    <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">Item project</th>
                <th scope="col">Created</th>
                <th scope="col">Need to do</th>
                <th scope="col">Status</th>
                <th scope="col">Owner</th>
            </tr>
        </thead>
        <tbody>
            {filteredItems.map((item) => <TodoItem todoitem={item} deleteTodoItem ={deleteTodoItem}/>)}
        </tbody>
    </table>
)
}
export default TodoList
