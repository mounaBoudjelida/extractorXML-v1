import React, { Component } from 'react'
import './App.css';
import Header from './common/layouts/Header';
import MesNotes from './trainee-space/MesNotes';
import MyProfile from './trainee-space/MyProfile';
import LoginStagiaire from './trainee-space/LoginStagiaire';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Redirect } from 'react-router';
import MotDePasseOublie from './common/views/MotDePasseOublie';
import MainXMLFilter from './admin-space/MainXMLFilter';
import LoginAdmin from './admin-space/LoginAdmin';
import axios from 'axios';
import {urlAuthorization} from './utils/urls';
import {adminCode, stagiaireCode, unAuthorizedCode} from './utils/codesRoles';
import Footer from './common/layouts/Footer';
import Pages404 from './common/views/Pages404';
import './assets/scss/common.scss';

export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:localStorage.getItem("auth"),
      role:-1,
    }
  }
 

  isLoggedInAndisAdmin(){
    
    return localStorage.getItem("auth") && this.state.role===adminCode;
    //return localStorage.getItem("auth")
  }

  isLoggedInAndisStagiaire(){
    return localStorage.getItem("auth") && this.state.role===stagiaireCode;
    //return localStorage.getItem("auth");
  }

 





  componentDidMount(){
  
    var  postData = {
      email: JSON.parse(localStorage.getItem("currentUser"))?JSON.parse(localStorage.getItem("currentUser")).email:null,
     
    };
    
    axios
    .post(urlAuthorization, postData)
    .then(authResult =>{
          
          localStorage.setItem("role",authResult.data.role);
          this.setState({role:authResult.data.role});
      
    }
    )
    .catch(err =>{
      
          console.log("Erreur lors du check de authorized "+err);
          localStorage.setItem("role",-1)
          this.setState({role:-1})

    });





  }




  render() {
    return (
      <Router>
        
          {/*Espace stagiaire*/ }
          <Header/>
          <Switch>
          <Route exact path="/" render={() => (<Redirect to="/stagiaires/mes-notes"/>)} />
          <Route exact path="/stagiaires/login" component={LoginStagiaire} /> 
          <Route exact path="/reinitialiser-mot-de-passe" component={MotDePasseOublie} /> 
          <Route exact path="/stagiaires/mon-profile" render={() => ((this.isLoggedInAndisStagiaire() ) ? <MyProfile/> : ((<Redirect to="/stagiaires/login"/>) ))}/>
          <Route exact path="/stagiaires/mes-notes" render={() => ((this.isLoggedInAndisStagiaire() ) ? <MesNotes/> : ((<Redirect to="/stagiaires/login"/>) ))}/>
         
          {/*Espace admin*/ }
          <Route exact path="/admin/login" component={LoginAdmin} /> 
          <Route exact path="/admin/xml-filter" render={() => ((this.isLoggedInAndisAdmin()) ? <MainXMLFilter/> : ((<Redirect to="/admin/login"/>) ))} /> 
         
     
          <Route path="*" component={Pages404} />
          </Switch>
          
          <Footer/>
          
          
      </Router>
    );
  }
}

export default App
