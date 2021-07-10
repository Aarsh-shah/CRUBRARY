import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';

const UserList = () => {
    const [userList,setuserList]=useState([]);
    const config={
        'Content-Type': 'application/json',
      };
    useEffect(() =>
{
     axios.get('/api/users/',config).then( (res) => setuserList(res.data.user)).catch(err => console.log(err));
    //  console.log(userList[0]);
},[]);

return (
    <div>
      <div className='row'>
       <h1 class="text-success">Total users: {userList.length}</h1>
        {
            userList.map(currentUserObj => { 
   
   return (
       
<div class="col-lg-3">
    <div class="card">
        <div class="card-body">
            
            <h5 class="text-success"> {currentUserObj.name}</h5>
            <p class="card-text text-success">{currentUserObj.email}</p>
            <i class="far fa-address-card h2 text-info">
               
            </i>
        </div>
    </div>
</div>
    );
}
)

        }
      </div>
    </div>
  );

    }
    export default UserList;
