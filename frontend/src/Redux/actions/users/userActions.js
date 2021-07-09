    import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,USER_LOGIN_FAIL,USER_REGISTER_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT_SUCCESS} from '../../actions/actionMenu'; 
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
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: userData,
        });
        localStorage.setItem('userDataBOO',JSON.stringify(userData));



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
    export {userRegisterAct,userLoginAct,userLogoutAct};
