import React from 'react';


const TodoItem =({todoitem}) =>{
    return(
    <tr>
        <td>{todoitem.itemProject}</td>
        <td>{todoitem.created}</td>
        <td>{todoitem.note}</td>
        <td>{todoitem.todoStatus}</td>
        <td>{todoitem.itemOwner}</td>
    </tr>

    )

}

const TodoItems =({todoitems}) => {
    return(
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
    {todoitems.map((todoitem) => <TodoItem todoitem = {todoitem}/>)}
    </tbody>
    </table>

    )

}

export default TodoItems;