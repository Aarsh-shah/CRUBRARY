import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createBookRed } from '../reducers/books/bookCreateReducer';
import { userProfileReducer } from '../reducers/users/userProfileReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {fetchBookReducer} from '../reducers/books/fetchBookRed';
import {userReducer} from '../reducers/users/userReducer';
import {userProfileUpdateReducer} from '../reducers/users/userProfileUpdateRed';
const middlewares= [thunk];

const reducer = combineReducers({
    bookCreated: createBookRed,
    booksFetched: fetchBookReducer,
    currentUser: userReducer,
    userProf: userProfileReducer,
    updatedUserProf: userProfileUpdateReducer,
});
const userAuthFromLocal = localStorage.getItem('userDataBOO') ? JSON.parse(localStorage.getItem('userDataBOO')) : null;
const initialState= {
    currentUser: {
        userData: userAuthFromLocal
    },
};

const store= createStore(
    reducer,
    initialState,
   composeWithDevTools(applyMiddleware(...middlewares)),
);
export {store};