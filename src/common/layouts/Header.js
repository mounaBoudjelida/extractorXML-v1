import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import HeaderAdmin from '../../admin-space/HeaderAdmin';
import HeaderStagiaire from '../../trainee-space/HeaderStagiaire';


export class Header extends Component {
    

    render(){
        if (this.props.location.pathname === "/stagiaires/login" ||this.props.location.pathname === "/admin/login" || this.props.location.pathname === "/reinitialiser-mot-de-passe")
        {
          return null
        }else if(this.props.location.pathname === "/stagiaires/mes-notes" || this.props.location.pathname === "/stagiaires/mon-profile" ){
            //Espace stagiaire
            return <HeaderStagiaire/>
        }else if(this.props.location.pathname==="/admin/xml-filter"){
            //Espace Admin
            return <HeaderAdmin/>
        }else{
            return<div></div>;
        }
    
    }
}


const navbarStyle = {
    
    backgroundColor: "#00a5a2",
  };

export default withRouter(Header);
