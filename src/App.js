import React from 'react';
import './App.css';

import Header from './components/Header/header.component';
import Homepage from './components/pages/Homepage/homepage.component'
import Shop from './components/Shop/shop.component'
import Contact from './components/Contact/contact.component';
import SignInOut from './components/Sign-in-out/sign-in-out.component';
import Search from './components/Search/search.component';

import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const Menus = (props) => {
    const title = props.location.state
  return(
  <div>
    <h1>{title}</h1>
  </div>
)}


class App extends React.Component {

   constructor() {
     super()
     this.state = {
       loginAuth: null
     }
   }

  componentDidMount() {
      if(localStorage.getItem('loginAuth')) {
        const data = JSON.parse(localStorage.getItem('loginAuth'))
        this.setState({loginAuth: data})
      }
   }

  handleStorage =() => {
    const data = JSON.stringify(this.state.loginAuth)
    localStorage.setItem("loginAuth", data)
  }
  
  handleResponse = (response) => {
        if(response) {
            this.setState({loginAuth: response.profileObj}, this.handleStorage)
        }
  }

  handleLogout = () => {
    this.setState({loginAuth: null}, this.handleStorage)
  }
  
  render(){
    const { loginAuth } = this.state
  return (
    <div>
      <Header profile={loginAuth} handleLogout={this.handleLogout}/>
      <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop}/>
          <Route path='/search' component={Search}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/signin' render={() => 
              loginAuth ? 
               <Redirect to='/'/>
               :
              <SignInOut 
                handleResponse={this.handleResponse} 
                handleLogout={this.handleLogout}
              />}/>
          <Route path='/menu/:food' component={Menus} />
      </Switch> 
    </div>
  )
} 
}

export default App;