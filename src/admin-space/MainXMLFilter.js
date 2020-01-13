import React, { Component } from 'react'
import GridModal from './GridModal';
import '../assets/scss/mainXMLFilter.scss';
import {filtrerXML, xmlToJSON} from '../utils/fct';
import {urlFeedBDD} from '../utils/urls';
import axios from 'axios';
import Spinner  from 'react-bootstrap/Spinner';


export class MainXMLFilter extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
        theXMLData: null,
        errorMessage:'',
        resultFeedDataBase:'',
        loading:false,
			
		};
	}



  

	onChange=(e)=>{
		let files=e.target.files;
		console.warn("data file = ", files);
	
	
	
		//Reader
		let reader= new FileReader();
		reader.readAsText (files[0]);
		reader.onload=(e)=>{
		  //test validation
		  try{
			const parser = new DOMParser();
		
			
      const xmlDoc = parser.parseFromString(reader.result+'', 'text/xml');
     
      if(xmlDoc.documentElement.nodeName !== "WINDEV_TABLE"){
       
        this.setState({errorMessage: <small className="form-text text-danger">{'Votre fichier ne respecte pas la syntaxe XML.'}</small>})
      }else{
            this.setState({theXMLData:xmlDoc});
            this.setState({errorMessage: <small className="form-text text-success d-inline-block mr-4">{'Votre fichier a une syntaxe XML correcte.'}</small>})
            
      }
     

			
		  }catch(err){
        this.setState({errorMessage:<small className="form-text text-danger">{err+''}</small>})
		  }
		  
		 
		}
	
	  }

    onFeedDataBase=(e)=>{
        e.preventDefault();
        //To set the spinner
        this.setState({loading:true});

        //1. Filtrer le fichier
        let filtredXML=filtrerXML(this.state.theXMLData);
        
        //2.Conversion vers JSON
        let jsonContent=xmlToJSON(filtredXML);
        console.log("here is my json to be set to back ="+jsonContent);
        console.log("here is my json to be set to back stringyfy ="+JSON.stringify(jsonContent));
      
        //transfet to backend
        var  putData = {
            jsonContent: jsonContent,
           
          };
        axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
        axios.put(urlFeedBDD,putData)
        .then(result=>{
           console.log("------>Add epreuve avec success"+result);
           this.setState({loading:false});
           let nbEpreuveCreated=result.data.nbEpreuveCreated;
           let nbEpreuveMiseAjour=result.data.nbEpreuveMiseAjour;
           let nbStagiaireCreated=result.data.nbStagiaireCreated;
           this.setState({resultFeedDataBase:<div className="form-text text-success text-left">
            {nbEpreuveCreated} ligne(s) ont été inséré dans la table epreuve.
            <br/>
            {nbEpreuveMiseAjour} ligne(s) ont été mis à jour dans la table epreuve.
            <br/>
            {nbStagiaireCreated} stagiaire(s) ont été créés.</div>});

        }).catch(err=>{
            console.log("Une erreur est survenu lors de l'alimentation de la BDD "+err);
            this.setState({loading:false});
            this.setState({resultFeedDataBase:<div className="text-danger text-left">Une erreur est survenu lors de l'alimentation de la BDD</div>});
            
        })


    }
	

    onBtExport() {
	   
		let x = this.state.theXMLData.documentElement.childNodes;
			
			
			for( let i = 0; i < x.length ;i++) {
				
				if(x[i].nodeName==="Table"){
					
					let table=x[i];
					let tableChildNodes=table.childNodes;
					for(let j=0;j<tableChildNodes.length;j++){
					
						if((tableChildNodes[j].nodeName==="DATE_EVALUATION") && (tableChildNodes[j].childNodes[0]==undefined)){
							
							//table.remove();
                         this.state.theXMLData.documentElement.removeChild(table);
              
              
						}
					}

				}
				
				
		}
		
		var xmlText = new XMLSerializer().serializeToString(this.state.theXMLData);
		
        require("downloadjs")(xmlText, "filtredXML.xml", "xml/plain");
    
    }
  
    



    render() {

      return (
        <main className="container mt-5">
            
            <div className="row text-center   mx-auto" >
                <div className="col-0 col-sm-3 vide"></div>
                <div className="col-12 col-sm-6">
                        <div className="custom-file mt-3 w-100">
                            <input type="file" name="file" className="custom-file-input" id="validatedCustomFile" onChange={(e)=>this.onChange(e)}/>
                            <label className="custom-file-label" >Choisir un fichier...</label>
                            {this.state.errorMessage}
                            
                        
                        </div>
                        
                </div>
                <div className="col-0 col-sm-3 vide"></div>

                <div className="col-12 text-center mt-3">
                     <i class="fas fa-arrow-down fa-2x"></i>
                </div>
              
                
                <div className="col-0 col-sm-3 vide"></div>
                <div className="col-12 col-sm-6 ">
                    <button  type="button" className="btn btn-info mt-3 w-100 mb-3 " onClick={this.onFeedDataBase.bind(this)}><i class="fas fa-database mr-3"></i>Alimenter la BDD</button>
                    {this.state.loading?<Spinner animation="border" variant="info" />:this.state.resultFeedDataBase}
                    

                </div>
                <div className="col-0 col-sm-3 vide"></div>

               
                

                

            </div>

            <div className="row    mt-5">
                <div className="col-12 col-sm-4 w-100 text-center">
                        <GridModal xml={this.state.theXMLData} afterFilter={false}></GridModal> 
                </div>
                <div className="col-12 col-sm-4 w-100 text-center">
                        <GridModal xml={this.state.theXMLData} afterFilter={true}></GridModal>
                </div>
                <div className="col-12 col-sm-4 w-100 text-center">
                        <button  type="button" className="btn btn-outline-info mt-3 w-100" onClick={this.onBtExport.bind(this)}><i class="fas fa-file-code mr-2"></i>Exporter le fichier filtré</button>
                </div>
                
            </div>



          
          
        </main>
      );
    }
  }

export default MainXMLFilter
