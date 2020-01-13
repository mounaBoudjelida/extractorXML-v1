import React, { Component } from 'react'
import {urlGetEpreuves} from '../utils/urls';
import axios from 'axios';
import '../assets/scss/mesNotes.scss';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from './PDFDocument';
import { withRouter } from 'react-router-dom';


export class MesNotes extends Component {

    constructor(props) {
        super(props);
        // N’appelez pas `this.setState()` ici !
        this.state = { 
            epreuves: [],
            stagiaireInfo:"" };
        
      }
  
    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
        axios.get(urlGetEpreuves,{
            params: {
              email: JSON.parse(localStorage.getItem("currentUser")).email,
            }
          })
          .then(res => {
            const epreuves = res.data.epreuves;
            const stagiaireInfo=res.data.stagiaire;
            this.setState({ epreuves, stagiaireInfo });
            console.log("result is "+res.data)
          }).catch(err=>{
            console.log("Erreur lors de la récupération des notes "+err);
            this.props.history.push('/stagiaires/login');
        });
      }

    render() {

        const notes=(this.state.epreuves && this.state.epreuves.length>0 )?this.state.epreuves.map((item,index)=>{
            return <tr key={item.id}>
                <td className="">{item.date_evaluation}</td>
                <td className="">{item.Module?item.Module.designation:""} </td>
                <td className="">{item.Module?item.Module.ue:""} </td>
                <td className="">{item.Nature_epreuve?item.Nature_epreuve.designation:""}</td>              
                <td className="">{item.note}</td>
                <td>{item.Module?item.bareme:""} </td>
                <td className="">{item.validation? "Oui":"Non"}</td>
            </tr>
        }):<tr >
        <td className="cell-vide" > </td>
        <td className="cell-vide"> </td>
        <td className="cell-vide"> </td>
        <td className="cell-vide"> </td>
        <td className="cell-vide"> </td>
        <td className="cell-vide"> </td>
        <td className="cell-vide"> </td>
        </tr>
        return (
            
               <div className="container mt-2 w-100">
                        <h1 className="mx-auto text-center">Mes notes</h1>
                        <hr></hr>
                
                        <div className="personal-info col-12 col-sm-6">
                         
                            <div>{this.state.stagiaireInfo.Civilite?this.state.stagiaireInfo.Civilite.designation+" ":" yyy"} 
                            {this.state.stagiaireInfo.nom?this.state.stagiaireInfo.nom+" ":" "}  
                            {this.state.stagiaireInfo.prenom?this.state.stagiaireInfo.prenom+" ":" "} - 
                            {this.state.stagiaireInfo.date_naissance?this.state.stagiaireInfo.date_naissance+" ":" "}</div>
                            <div>{this.state.stagiaireInfo.raison_sociale?this.state.stagiaireInfo.raison_sociale+" ":" "}</div>
                            <div>{this.state.stagiaireInfo.Formation?this.state.stagiaireInfo.Formation.designation+" ":" "} - 
                            {this.state.stagiaireInfo.nature_contrat?this.state.stagiaireInfo.nature_contrat+" ":" "}</div>
                            <div>{this.state.stagiaireInfo.Groupe?this.state.stagiaireInfo.Groupe.designation+" ":" "}</div>
                        </div>
                        
                      
                        <div className="font-weight-bold mr-3 mb-2 mt-5">Vos notes:</div>
                        <div className="table-responsive col-12">

                        
                            <table id="notes" className="table">
                                <tr>
                                    <th>Date d'évaluation</th>
                                    <th>Intitulé</th>
                                    <th>UE</th>
                                    <th>Nature de l'epreuve</th>                                
                                    <th>Note</th>
                                    <th>Barème</th>
                                    <th>Validation</th>
                                </tr>
                                {notes}
                            </table>
                        </div>
                        <div className="row text-right mt-5">
                            <div className="col-6"></div>
                            <div className="col-6 text-right">
                                
                                <PDFDownloadLink  document={<PDFDocument epreuves={this.state.epreuves} stagiaire={this.state.stagiaireInfo}></PDFDocument>}  fileName={"notes_"+this.state.stagiaireInfo.nom+"_"+this.state.stagiaireInfo.prenom+".pdf"}>
                                    <button type="button" className="btn btn-outline-info"><i className="far fa-file-pdf mr-2"></i>Téléchargez vos notes</button>
                                </PDFDownloadLink>
                            </div>
                        </div>
               </div>

            
        )
    }
}

export default withRouter(MesNotes);
