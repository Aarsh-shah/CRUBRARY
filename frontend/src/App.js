import logo from './logo.svg';
import './App.css';
import AddBook from './components/Books/AddBook';
import {RegisterUser} from './components/Users/RegisterUser';
import {Login} from './components/Users/LoginUser';
import HomePage from './components/HomePage';
import {Books} from './components/Books/Books';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
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
       </Switch>

</BrowserRouter>
    </div>


  );
}

export default App;
