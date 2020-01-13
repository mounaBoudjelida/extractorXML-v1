import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../assets/scss/modals.scss';
import { Navbar } from 'react-bootstrap';





export class GridModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            show:false,
            columnDefs: [{
              headerName: "CIVILITE", field: "CIVILITE._text", sortable: true, filter: true,resizable: true,  width:100 
            }, {
              headerName: "NOM", field: "NOM._text", sortable: true, filter: true,resizable: true, width:100 
            }, {
              headerName: "PRENOM", field: "PRENOM._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "DATE_NAISSANCE", field: "DATE_NAISSANCE._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "GROUPE", field: "GROUPE._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "DATE_EVALUATION", field: "DATE_EVALUATION._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "UE", field: "UE._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "INTITULE", field: "INTITULE._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "NATURE_EPREUVE", field: "NATURE_EPREUVE._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "NOTES", field: "NOTES._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "BAREME", field: "BAREME._text", sortable: true, filter: true,resizable: true,  width:90 
            },
            {
              headerName: "VALIDATION", field: "VALIDATION._text", sortable: true, filter: true,resizable: true,  width:90 
            }],
            rowClassRules: {
              "sick-days-warning": function(params) {
                var numSickDays = params.data.sickDays;
                return numSickDays > 5 && numSickDays <= 7;
              },
              "sick-days-breach": "data.sickDays > 8"
            },
            rowData: [],
            
           
           
      }
    }
  
    handleClose=()=>{
      this.setState({show:false})
    }
  
    
    handleShow=()=>{
      this.setState({show:true})
    }
    

  
   
 


     componentDidUpdate(prevProps, prevState){
      
      if ((this.props.xml !==undefined) && (this.props.xml !== prevProps.xml) ) {
        if(this.props.afterFilter){
                  let x = this.props.xml.documentElement.childNodes;
       
                
                  for( let i = 0; i < x.length ;i++) {
                    
                    if(x[i].nodeName==="Table"){
                      
                      let table=x[i];
                      let tableChildNodes=table.childNodes;
                      for(let j=0;j<tableChildNodes.length;j++){
                      
                        if((tableChildNodes[j].nodeName==="DATE_EVALUATION") && (tableChildNodes[j].childNodes[0]==undefined)){
                          
                          //table.remove();
                          this.props.xml.documentElement.removeChild(table);
                          
                          
                        }
                      }
            
                    }
                    
                    
                }
  
        }
     


        //----La conversion vers JSON
        var convert = require('xml-js');
        var xml ='<?xml version="1.0" encoding="utf-8"?>';
       
        var xmlText = new XMLSerializer().serializeToString(this.props.xml);
        var result1 = convert.xml2json(this.props.xml?xmlText:xml, {compact: true, spaces: 4});
        console.log("result1 after conversion to json: "+result1);
        console.log("------"+JSON.parse(result1).WINDEV_TABLE.Table);
        var saveTable=JSON.parse(result1).WINDEV_TABLE.Table;
        //This step is for a table with one element
        if(saveTable.length){
          this.setState({rowData:JSON.parse(result1).WINDEV_TABLE.Table});
        }else{
            var arr=[];
            arr.push(saveTable);
            this.setState({rowData:arr});
        }
        
        
       // this.setState({rowData:JSON.parse(result1).WINDEV_TABLE.Table});
      
        

       
      }

    }



    onBtExport() {
	   
      let x = this.props.xml.documentElement.childNodes;
       
       
     
      var xmlText = new XMLSerializer().serializeToString(this.props.xml);
      
          require("downloadjs")(xmlText, "filtredXML.xml", "xml/plain");
      
      }

   
  
    
    render(){
  
  
      return (
          <>
           
           
            <div>
                <button type="button" class="btn btn-outline-info mt-3 w-100" onClick={(e)=>{this.handleShow();  }}><i class="far fa-eye"></i> {this.props.afterFilter?"Prévisualisation après filtre":"Prévisualisation avant filtre"} </button>
            </div>
            <Modal  show={this.state.show} onHide={this.handleClose} animation={false}  dialogClassName="modal-xl my-modal" 
            aria-labelledby="contained-modal-title-vcenter"
            centered>
          

              <Navbar  variant="light shadow mb-3 sticky-top pr-5" style={{backgroundColor:"#17a2b8"}}>
                      
                     
                      <Navbar.Brand >
                            <button  type="button" className="btn btn-light" onClick={this.onBtExport.bind(this)}>Exporter</button>
                     
                      </Navbar.Brand>
                      <Navbar.Brand >
                            <button  type="button" className="btn btn-light"  onClick={(e)=>{this.handleClose();  }}>Annuler</button>
                     
                      </Navbar.Brand>
                     
                     
                    
                     
                          
                       
                </Navbar>
             
             <Modal.Body className=" text-light" >
                    <div  className='player-wrapper w-100 h-100 '>
                    <div style={{ width: "100%", height: "100px" }}>
            <div           
              style={{
                height: "100%",
                width: "100%"
              }}
              className="ag-theme-balham ag-grid-wrapper w-100 h-100 "
            >
                   
                
                  <AgGridReact 
                  columnDefs={this.state.columnDefs}
                  groupSelectsChildren={true}
                  rowSelection="multiple"
                  suppressRowClickSelection
                  autoGroupColumnDef={this.state.autoGroupColumnDef}
                  rowData={this.state.rowData}
                  onGridReady={ params => {this.gridApi = params.api; this.setState({gridApi: params.api})} }
                  paginationAutoPageSize={true}
                  pagination={true}
                  


                  >
                    
                </AgGridReact>



        

        </div>
      </div>
                    
                   
                 
                    </div>
                    
    
            </Modal.Body>
            
             
            </Modal>
          </>
        
        
        
        );
  
    }
  
  
  
   
  
    
  
  
  
  
  
  
  }
  

export default GridModal;
