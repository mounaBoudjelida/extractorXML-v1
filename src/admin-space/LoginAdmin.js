import React, { Component } from 'react'
import {   withRouter } from 'react-router-dom';
import logo from '../assets/img/logo-appc-sous-titre.png';
import '../assets/scss/login.scss';
import {urlLoginAdmin} from '../utils/urls'
import axios from 'axios';



export class LoginAdmin extends Component {

   constructor(props){
       super(props);
       this.state = {
        email: '',
        password:'',
        errorLoginEmail:'',
        errorLoginPassword:'',
        

       };
      
      
   }


 

  onChange = e => {
            if (e.target.id === 'emailConnexionAdmin') {
                this.setState({ email: e.target.value });
            } else if (e.target.id === 'passwordConnexionAdmin') {
                this.setState({ password: e.target.value });
            } 
  };

  handleAuthentication  = e => {

    e.preventDefault();
    var  postData = {
        email: this.state.email,
        motDePasse: this.state.password
      };
      
      axios
      .post(urlLoginAdmin, postData)
      .then(authResult =>{
       
        if(authResult.data.access_token && authResult.data.auth){
            this.setState({errorLoginEmail:'',errorLoginPassword:''})
            this.setSession(authResult.data);
           
        }else{
            if(authResult.data.statutCode===401){
                this.setState({errorLoginPassword:"Mot de passe incorrect"});
            }else if (authResult.data.statutCode===404){
                this.setState({errorLoginEmail:"Cet email n'existe pas"});
            }
           
                
                
                
            
            
        }





      }
      )
      .catch(err =>{
        
            console.log("Erreur lors du login "+err);
            this.setState({errorLoginPassword:"Email ou mot de passe incorrect"});
           

        
      });
 
   

  };

  // Sets user details in localStorage
  setSession = (authResult) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    if(authResult.auth){
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('auth', authResult.auth);
        localStorage.setItem('currentUser',JSON.stringify(authResult.currentUser));
         // navigate to the home route
        this.props.history.push('/admin/xml-filter');
        
    }else{
             // Set the time that the access token will expire at
        localStorage.removeItem('access_token');
        localStorage.removeItem('auth');
        localStorage.removeItem('currentUser');

            
    }
   
   
    
  }
   
render() {
        return (
            < >
              
                    
                             <div className="container mt-5">
                                

                                 <div className="text-center">
                                     
                                     <h2 className="" style={{marginBottom:"-30px"}}>Espace admin</h2>

                                     
                                     <div className="login-container" >

                                     <img className=" mb-5 mt-3" src={logo} alt="logo" style={{maxWidth:"280px", maxHeight:"50px"}}/>
                                        <form className="mx-auto text-center " onSubmit={this.handleAuthentication}>
                                        <div className="form-group">
                                            <input type="email" className="form-control mx-auto   " id="emailConnexionAdmin" aria-describedby="emailHelp" placeholder="Email" onChange={this.onChange} required/>                                    
                                            <small id="emailHelpBlock" className="form-text text-danger">
                                                {this.state.errorLoginEmail}
                                            </small>
                                        </div>
                                        
                                        <div className="form-group"> 
                                            <input type="password" className="form-control mx-auto green-background-input input-login-register " id="passwordConnexionAdmin" placeholder="Mot de passe" onChange={this.onChange} required/>
                                            <small id="passwordHelpBlock" className="form-text text-danger">
                                                {this.state.errorLoginPassword}
                                            </small>
                                        </div>
                                        <div className="justify-content">
                                            <button type="submit" className="btn btn-outline-info w-100 mb-2">Connexion</button>

                                        </div>
                                        </form>

                                        </div>
                             
                             
                                <div>
                                    
                                </div>
                                 </div>

                             </div>
                    





             

           
            </>
       
        )
    }
}

export default withRouter(LoginAdmin);
