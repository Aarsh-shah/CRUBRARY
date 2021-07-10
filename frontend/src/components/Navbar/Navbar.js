import React from 'react';
import { Link,useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAct } from '../../Redux/actions/users/userActions';
const Navbar = () => {
  const state = useSelector(state => state.currentUser);

  const history = useHistory();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAct());
  
  };

  const { userData, loading, error } = state;
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a className='navbar-brand text-danger' to='/'>
          CRUBRARY
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          <ul className='navbar-nav m-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            {!userData ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
             
                <li className='nav-item'>
                  <Link className='nav-link' to='/books'>
                    Books
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/addbook'>
                    Add book
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' to='/userslist'>
                    Users
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/issuelist'>
                    Issue a Book
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <Link className='nav-link' to='/myissuedbook'>
                    My Issued Book
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profile'  >
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <a
                    onClick={logoutHandler}
                    className='nav-link'
                    to='/login'>
                    Logout
                  </a>
                </li> */}
                <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Hi, {userData.data.name}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <Link classNam="dropdown-item" to='/myissuedbook'>
                    My Issued Book
  </Link>
  <Link className="dropdown-item" to='/profile'  >
    Profile
  </Link>
  <Link
    onClick={logoutHandler}
    className="dropdown-item"
    to='/login'>
    Logout
  </Link>                  
  </div>
</div>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;