import React from 'react';
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {userLoginAct} from '../../Redux/actions/users/userActions';
import ErrorMessage from '../ErrorMessage';
const Login = ({history}) => {
  const [email, setMail] = useState('');
  const [password, setPass] = useState('');

  const dispatch = useDispatch();

  //Grab pieces of data from our store that we care about

  const state = useSelector(state => {
    return state.currentUser;
  });

  const { loading, userData, error } = state;

  //Submit handler
  const LoginHandle = e => {
    e.preventDefault();
    console.log(email, password);
    dispatch(userLoginAct(email, password));
  //Redirect


  };
  useEffect(() => {
    if(userData)
    history.push('/profile');
  },[state]);
 

    return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {loading && <h1>Loading</h1>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={LoginHandle}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                value={email}
                onChange={e=>setMail(e.target.value)}
                
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                value={password}
                onChange={e=>setPass(e.target.value)}
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-info m-auto'>
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export  {Login};