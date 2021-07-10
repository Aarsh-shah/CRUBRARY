    import { USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,USER_LOGIN_FAIL,USER_REGISTER_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT_SUCCESS, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,USER_PROFILE_REQUEST} from '../../actions/actionMenu'; 
    import axios from 'axios';

    const userRegisterAct = (name,email,password) => {
    return async dispatch => {
        try {
        dispatch({
            type:USER_REGISTER_REQUEST,
            
        })
        const config = {
            headers :
            {
                'Content-Type': 'Application/json',
            }
        }
        const userData = await axios.post('/api/users/register',{
            name,
            email,
            password,
        },config);
        console.log(userData);
        localStorage.setItem('userDataBOO',JSON.stringify(userData));
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: userData,
        });




        }
        catch(error)
        {
            dispatch({
                type:USER_REGISTER_FAIL,
                payload:error.response && error.response.data.message,
            });

        }


    };
    };

    const userLoginAct = (email,password) => {
        return async dispatch => {
            try {
            dispatch({
                type:USER_LOGIN_REQUEST,
                
            });
            const config = {
                headers :
                {
                    'Content-Type': 'Application/json',
                }
            }
            const userData = await axios.post('/api/users/login',{  
                email,
                password,
            },config);
            console.log(userData);
            localStorage.setItem('userDataBOO',JSON.stringify(userData));
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload: userData,
            });
            }
            catch(error)
            {
                dispatch({
                    type:USER_LOGIN_FAIL,
                    payload:error.response && error.response.data.message,
                });
    
            }
    
    
        };   
    };

const userLogoutAct = () => {
return async dispatch => {
            try {
                localStorage.removeItem('userDataBOO');
            dispatch({
                type:USER_LOGOUT_SUCCESS,
            });
        }
            catch(error)
            {
                 
            }
    
    
        };
};

const userProfileAct = (token) =>
{
    return async dispatch => {
        try {

        dispatch({
            type:USER_PROFILE_REQUEST,
        });
        const config ={
            headers: {
                authorization: 'Bearer '+token,
            }
        }
        const { data } = await axios.get('/api/users/profile',config);
        dispatch( {
            type:USER_PROFILE_SUCCESS,
            payload: data,
        });
    }
        catch(error)
        {
            dispatch({
            type:USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message,
        });
        }


    };

    
};
const userProfileUpdateAct = (name,email,password) => {
    return async (dispatch,getState) => {
        try {
        dispatch({
            type:USER_UPDATE_REQUEST,
            
        });
        const {userData} =getState().currentUser;
        const config = {
            headers :
            {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+ userData.data.token,
            }
        }
        const updatedUser = await axios.put('/api/users/profile/update/',{
            name,
            email,
            password,
        },config);
        console.log(updatedUser);
        localStorage.setItem('userDataBOO',JSON.stringify(updatedUser));
        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload: updatedUser,
        });




        }
        catch(error)
        {
            dispatch({
                type:USER_UPDATE_FAIL,
                payload:error.response && error.response.data.message,
            });

        }


    };
    };
    export {userRegisterAct,userLoginAct,userLogoutAct,userProfileAct,userProfileUpdateAct};
