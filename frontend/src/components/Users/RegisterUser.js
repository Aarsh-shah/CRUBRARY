import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {userRegisterAct} from '../../Redux/actions/users/userActions';
import ErrorMessage from '../ErrorMessage';

const RegisterUser = ({history}) => {
   const userObject = useSelector(state => state.currentUser);
   console.log(userObject);
   const { userData,error } = userObject;
   useEffect(() => {
    if (userData) {
      history.push('/dashboard');
    }
  }, [userObject]);

    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const dispatch=useDispatch();
const submitHandle = (e) => {
    e.preventDefault();
    dispatch(userRegisterAct(name,email,password));

}
    return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <h1 className='text-center'>Register User Here</h1>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={submitHandle}>
            <fieldset>
              <div className='form-group'>
              <br></br>
                <br></br>
                <label htmlFor='exampleInputEmail1'>Name</label><br></br>
                <br></br>
                <input
                                  value={name}
                onChange={e=>setname(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter Name'
                />
                
              </div>
              <div className='form-group'>
              <br></br>
                <br></br>
                <label htmlFor='exampleInputEmail1'>Email address</label><br></br>
                <br></br>
                <input
                value={email}
                onChange={e => setemail(e.target.value)}
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
              <br></br>
                <br></br>
                <label htmlFor='exampleInputPassword1'>Password</label><br></br>
                <br></br>   
                <input
                                value={password}
                onChange={e => setpassword(e.target.value)}
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-info m-auto'>
                Register
              </button>
              <br></br>
                <br></br>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export { RegisterUser} ;