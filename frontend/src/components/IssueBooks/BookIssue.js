import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
const IssueList = () => {
    const [issueAvailList,setissueList]=useState([]);
    const [myissuedbook,setMyIssuedBook]=useState(null);
    const currentUser= useSelector(state => state.currentUser);
    const {userData} = currentUser;
    const clickHandle= (issueId) =>
    {
      const config2 = {
        headers :
        {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer '+ userData.data.token,
        }
      };
axios.post('/api/users/issue/'+issueId,{},config2).then( (res) => setMyIssuedBook(res.data.UserBookMapData)).catch(err => console.log(err));

      

    }
    
    const config={
        'Content-Type': 'application/json',
        
      };
    useEffect(() =>
{
     axios.post('/api/users/issue',config).then( (res) => setissueList(res.data.availableBooks)).catch(err => console.log(err));
    //  console.log(userList[0]);
},[]);
if(myissuedbook)
    {
      return (
      <Redirect to='/' />
      );
    }
return (
    <div>
    <h1 class="text-success">Total books available {issueAvailList.length}</h1>
      <div className='row'>
        {
            issueAvailList.map(currentBookObj => { 
   
   return (
       
<div class="col-lg-3">
    <div class="card">
        <div class="card-body">
            
            <h5 class="text-success"> {currentBookObj.title}</h5>
            <p class="card-text text-success">{currentBookObj.category}</p>
            <p class="card-text text-success">{currentBookObj.author}</p>
            <button class="danger" onClick={() => { clickHandle(currentBookObj._id) } }>Issue</button>
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
    export default IssueList;
