import React, { useEffect } from 'react';
import './Profile.css';
import pic from '../../assets/img/minato.jfif';
import { userProfileAct } from '../../Redux/actions/users/userActions';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

const Profile = ({ history }) => {
  const state =useSelector(state=>state);
  const {currentUser,userProf}=state;
  
  const { userData,loading,error }=currentUser;
  const token = userData ?userData.data.token: null;
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(userProfileAct(token));
  },[dispatch]);
  // console.log(userProf.userProfile);
  const emptyObj= [];
  const bookObjs = userProf.userProfile? userProf.userProfile.books : emptyObj;
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col mt-5'>
            <div className='card m-auto ' style={{ width: '50%' }}>
              <img src={pic} className='card-img-top' alt='...' />
              <div className='card-body'>
                <h3 className='card-title'>{userData?.data.email}</h3>
                <p className='card-text'>{userData?.data.name}</p>
                <Link to='/userupdate' className='btn btn-primary'>
                  Update your profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2> My Books</h2>
      {/* Table */}
      {loading ? <h1>Loading Plz Wait...</h1> :
        <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Author</th>
            <th scope='col'>Book Category</th>
            <th scope='col'>Title</th>

          </tr>
        </thead>
        <tbody>
         {bookObjs.map(bookObj => (
          <tr className='table-dark'>

<th scope='row'>{bookObj.author}</th>
<th scope='row'>{bookObj.category}</th>
<td>{bookObj.title}</td>

</tr>

         ) ) }  
          
        </tbody>
      </table>

}
    </>
  );
};

export default Profile;