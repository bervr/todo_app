import React from 'react';


const UserItem =({user}) =>{
    return(
    <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
    </tr>

    )

}

const UserList =({users}) => {
    return(
    <table className="table table-striped">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">User</th>
    <th scope="col">First name</th>
    <th scope="col">Last name</th>
    <th scope="col">Email</th>
    </tr>
    </thead>
    <tbody>
    {users.map((user) => <UserItem user = {user}/>)}
    </tbody>
    </table>

    )

}

export default UserList;