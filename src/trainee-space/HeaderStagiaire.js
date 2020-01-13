import React, { Component } from 'react'
import { Link, NavLink  ,withRouter } from 'react-router-dom';
import logo from '../assets/img/logo-appc-sous-titre.png';
import "../assets/scss/navbar.scss";
import DeconnexionModal from '../common/views/DeconnexionModal';

export class HeaderStagiaire extends Component {
   
    render() {
        return (
            <div className="w-100" style={navbarStyle}>
                        <nav className="navbar row w-100 text-center  ">
                          
                                <div className="col-12 col-sm-6 text-left ">
                                    <Link  className="mb-0" to="/" >
                                        <img className="mb-0" src={logo} alt="logo" style={{maxWidth:"280px", maxHeight:"50px"}}/>
                                    </Link >
                                </div>

                                <div className="col-12 col-sm-6 text-center row mt-2 w-100 mx-auto ">

                                        <div className="col-4 text-center">
                                            <NavLink  className="linkTo" to={'/stagiaires/mes-notes'} exact activeStyle={{color:'white'}}  >
                                                                    <i className= {"far fa-file-excel" }  > 
                                                                    <div className={" mt-2 font-weight-normal" }> Mes notes </div> 
                                                                    </i>
                                            </NavLink >
                                        </div>
                                        <div className="col-4 text-center">
                                            <NavLink  className="linkTo" to={'/stagiaires/mon-profile'} exact activeStyle={{color:'white'}}  >
                                            
                                                                    <i className= {"far fa-address-card" }  > 
                                                                    <div className={" mt-2 font-weight-normal" }> Mon profil </div> 
                                                                    </i>
                                            </NavLink >
                                        </div>
                                      
                                        <DeconnexionModal navigateTo={"/stagiaires"}></DeconnexionModal>
                                </div>
                  
                               
                               
                        
                        </nav>
                      </div>
        )
    }
}
const navbarStyle = {
    
    backgroundColor: "#00a5a2",
  };
export default withRouter(HeaderStagiaire);
