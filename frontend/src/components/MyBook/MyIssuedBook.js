import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
const IssuedBook = () => {
    const currentUser= useSelector(state =>state.currentUser );
    console.log(currentUser);
    const {userData} = currentUser;
    console.log(userData);
    const [issuedBook,setBook]=useState({});
    const config = {
        headers :
        {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer '+ userData.data.token,
        }
      };
    useEffect(() =>
{
     axios.get('/api/users/myissuedbook',config).then( (res) => setBook(res.data.myBook)).catch(err => console.log(err));
    //  console.log(userList[0]);
},[]);
console.log(issuedBook);
return ( 
    <div>
    <h1 class="text-info">{issuedBook?.title}</h1>
    <h1 class="text-info">{issuedBook?.author}</h1>
    <h1 class="text-info">{issuedBook?.category}</h1>
    </div>
  );

}
    export default IssuedBook;
