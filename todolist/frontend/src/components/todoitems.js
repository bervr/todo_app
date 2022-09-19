import React from 'react';
//список всех tod o

const TodoItem =({todoitem, deleteTodoItem }) =>{
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

const TodoItems =({todoitems, deleteTodoItem}) => {
    return(
    <table className="table table-striped">
    <thead>
    <tr>
    <th scope="col">Item project</th>
    <th scope="col">Created</th>
    <th scope="col">Need to do</th>
    <th scope="col">Status</th>
    <th scope="col">Owner</th>
    <th scope="col">#</th>
    </tr>
    </thead>
    <tbody>
    {todoitems.map((todoitem) => <TodoItem todoitem = {todoitem} deleteTodoItem={deleteTodoItem}/>)}
    </tbody>
    </table>

    )

}

export default TodoItems;