import React, { Component } from 'react'
import { Link, NavLink  ,withRouter } from 'react-router-dom';
import logo from '../assets/img/logo-appc-sous-titre.png';
import "../assets/scss/navbar.scss";
import DeconnexionModal from '../common/views/DeconnexionModal';

export class HeaderAdmin extends Component {
  

    render() {
        return (
            <div className="w-100" style={navbarStyle}>
            <nav className="navbar row w-100 text-center  ">
              
                    <div className="col-12 col-sm-6 text-left ">
                        <Link  className="mb-0" to='/admin/xml-filter' >
                            <img className="mb-0" src={logo} alt="logo" style={{maxWidth:"280px", maxHeight:"50px"}}/>
                        </Link >
                    </div>

                    <div className="col-12 col-sm-6 text-center row mx-auto mt-2 ">
                                        <div className="col-4  vide"></div>

                                        <div className="col-4  text-center">
                                            <NavLink  className="linkTo" to={'/admin/xml-filter'} exact activeStyle={{color:'white'}}  >
                                                                    <i className= {"fas fa-database" }  > 
                                                                    <div className={" mt-2 font-weight-normal" }> Alimenter BDD </div> 
                                                                    </i>
                                            </NavLink >
                                        </div>
                                       
                                      
                                        <DeconnexionModal  navigateTo={"/admin"}></DeconnexionModal>
                                </div>
                  
      
                   
                   
            
            </nav>
          </div>
        )
    }
}
const navbarStyle = {
    
    backgroundColor: "#00a5a2",
  };
export default withRouter(HeaderAdmin);

