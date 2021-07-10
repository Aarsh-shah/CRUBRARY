import logo from './logo.svg';
import './App.css';
import AddBook from './components/Books/AddBook';
import {RegisterUser} from './components/Users/RegisterUser';
import {Login} from './components/Users/LoginUser';
import HomePage from './components/HomePage';
import {Books} from './components/Books/Books';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import UserList from './components/Users/ListUsers';
import IssueList from './components/IssueBooks/BookIssue';
import UserProfile from './components/Profile/UpdateProfile';
import IssuedBook from './components/MyBook/MyIssuedBook';
import Success from './components/Success';
function App() {
  return (
    <div className='App'>
    <BrowserRouter> 
   
       <Navbar />
       <Switch>
       <Route exact path='/' component={Home} />
         <Route exact path='/addbook' component={AddBook} />
         <Route exact path='/register' component={RegisterUser} />
        <Route exact path='/books' component={Books} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/userslist' component={UserList} />
         <Route exact path='/issuelist' component={IssueList} />
         <Route exact path='/userupdate' component={UserProfile} />
         <Route exact path='/myissuedbook' component={IssuedBook} />
         <Route exact path='/success' component={Success} />
       </Switch>

</BrowserRouter>
    </div>


  );
}

export default App;
