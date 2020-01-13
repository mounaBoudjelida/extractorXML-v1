import React, { Component } from 'react';
import '../assets/scss/myProfile.scss';
import axios from 'axios';
import {urlGetStagiaireInfo, urlUpdatePWDStagiaire} from '../utils/urls';
import { withRouter } from 'react-router-dom';

export class MyProfile extends Component {
    constructor(props){
    super(props);
       this.state = {
        
        disabled:true,
        showPwd:false,
        eyeIcon:<i class="far fa-eye"></i>,
        newPwd:"",
        stagiaireInfo:"",
        erreurModification:"",
        successModification:""
        

       };
    }

    componentDidMount(){
       
        axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
        axios.get(urlGetStagiaireInfo,{
            params: {
              email: JSON.parse(localStorage.getItem("currentUser")).email,
            }
          })
          .then(res => {
            
            const stagiaireInfo=res.data.stagiaire;
            this.setState({ stagiaireInfo });
            
          }).catch(err=>{
            console.log("Erreur lors de la récupération des informations du stagiaire "+err);
            this.props.history.push('/stagiaires/login');
        });

    }

    EnablePWDModification = e => {
       if(this.state.disabled){
        this.setState({ disabled: false });
       }
            
       
    };


    ShowOrHidePWD = e => {
        if(!this.state.showPwd){
         this.setState({ showPwd: true, eyeIcon:<i class="far fa-eye-slash"></i> });
        }else{
            this.setState({ showPwd: false, eyeIcon:<i class="far fa-eye"></i> });
        }
             
        
     };


    onChange = e => {
        if (e.target.id === 'newPasswordField') {
            this.setState({ newPwd: e.target.value });
        }  
    };

    updatePwd=e=>{
        e.preventDefault();
        var  putData = {
            email: this.state.stagiaireInfo.email,
            newPwd: this.state.newPwd
          };
        axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
        axios.put(urlUpdatePWDStagiaire,putData)
        .then(result=>{
            this.setState({successModification:"Votre mot de passe a été modifié avec succès"});

        }).catch(err=>{
            console.log("Une erreur est survenu lors de la modification du mot de passe "+err);
            this.setState({erreurModification:"Une erreur est survenu lors de la modification du mot de passe"});
            
        })

    }



    
    render() {
        return (
           

            
            <div className="container mt-2 mb-3">
                <h1 className="mx-auto text-center">Mon profil</h1>
                <hr></hr>
                
                <table id="myProfile" className="mx-auto">
                             <tr>
                                <td className="font-weight-bold mr-3">Nom & Prénom:</td>
                                <td><input  className="form-control mx-auto" value={this.state.stagiaireInfo.nom+" "+this.state.stagiaireInfo.prenom}  disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Date de naissance:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.date_naissance} disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Civilité:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.Civilite?this.state.stagiaireInfo.Civilite.designation:""} disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Raison sociale:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.raison_sociale?this.state.stagiaireInfo.raison_sociale:""} disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Formation:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.Formation?this.state.stagiaireInfo.Formation.designation:""} disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Groupe:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.Groupe?this.state.stagiaireInfo.Groupe.designation:""} disabled/></td>
                                
                            </tr>
                            <tr>
                                <td className="font-weight-bold mr-3">Nature du contrat:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.nature_contrat?this.state.stagiaireInfo.nature_contrat:""} disabled/></td>
                                
                            </tr>
                       
                            <tr>
                                <td className="font-weight-bold mr-3">Email:</td>
                                <td><input  className="form-control mx-auto"  value={this.state.stagiaireInfo.email} disabled/></td>
                                
                            </tr>
                            
                            <tr>
                                <td className="font-weight-bold mr-3">Mot de passe:</td>
                                <td>
                                <div class="input-group">
                                    <input type={this.state.showPwd ? "text" : "password"} class="form-control" id="newPasswordField" value={this.state.newPwd} onChange={this.onChange} disabled={this.state.disabled}/>
                                    <div class="input-group-append">
                                     <button onClick={this.ShowOrHidePWD} class="btn btn-outline-info" type="button">
                                         {this.state.eyeIcon}
                                    </button>
                                    </div>
                                </div>
                                <small id="emailHelpBlock" className="form-text text-danger">
                                                {this.state.erreurModification}
                                </small>  
                                <small id="emailHelpBlock" className="form-text text-success">
                                                {this.state.successModification}
                                </small>                                    
                                </td>
                                <td><i class="far fa-edit mb-2" onClick={this.EnablePWDModification} title="Modifier votre mot de passe"></i></td>
                                
                            </tr>
                            
                           
                            <tr>
                                <td></td>
                                <td className="text-right"><button type="submit" className="btn btn-outline-info" onClick={this.updatePwd}>Enregistrer les modifications</button></td>
                                
                            </tr>
                </table>
 
                
            </div>
           
        )
    }
}

export default withRouter(MyProfile);
