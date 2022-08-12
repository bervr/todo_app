import React from 'react';


const UserItem =({user}) =>{
    return(
    <tr>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
    </tr>

    )

}

const UserList =({users}) => {
    return(
    <table class="table table-striped">
    <thead>
    <tr>
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