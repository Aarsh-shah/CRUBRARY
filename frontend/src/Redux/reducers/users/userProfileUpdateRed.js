import {USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_LOGOUT_SUCCESS,USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST ,USER_PROFILE_SUCCESS} from '../../actions/actionMenu';


const userProfileUpdateReducer = (state={},action) => {
 switch(action.type)
 {
    case USER_UPDATE_REQUEST:
        return {
            loading:true,
        };
    case USER_UPDATE_SUCCESS:
        return {
            updatedUser: action.payload,
        };
    case USER_UPDATE_FAIL:
        return {
            loading:false,
            error:action.payload,
        };


    default:
        return state;
 }
}
export {userProfileUpdateReducer};