import React, { Component } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Link} from "@react-pdf/renderer";
import logo from '../assets/img/logo-appc-sous-titre.png';



const styles = StyleSheet.create({
    page: {
      
      padding:"20px",
      fontSize:12,
      fontFamily: 'Helvetica',
    },
    section: {
      flexGrow: 1
    },
    header:{
        display:"flex",
        flexDirection:"row"
    },
    title:{
        fontFamily: 'Helvetica-Bold',
        fontSize:12,
        paddingBottom:5,
        paddingTop:5,
    },
    subTitle:{
        fontFamily: 'Helvetica',
        fontSize:12,
        paddingBottom:5,
        paddingTop:5,
     
    },
    footer:{
        
        textAlign:"center",
        color:"#00a5a2",
        fontSize: 12,
        marginTop:"20px",
        fontWeight: "bold"

    },
    stagiaireInfo:{
        display:"flex",
        border: "1px solid red",

    },
    logo:{
        maxWidth:"120px", 
        maxHeight:"50px"
    },
    row :{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "100%",
    },
    column1: {
        display: "flex",
        flexDirection: "column",
        
        flex:1,
        flexGrow: 1,
    },
    column2: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        flex: 2,
    },
    hr:{
        color:"red",
        height:"2px",
        width:"100%",
        backgroundColor:"red",
        border:"1px solid red",
        marginTop:"20px",
        marginBottom:"20px",
    },
    table: 
    { display: "table",
    width: "541px",
    borderStyle: "solid",
    borderColor:"#9E9E9E",
    borderWidth: 1, 
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop:"10px",
    
     },
    tableRowHeader: { margin: "auto", flexDirection: "row", backgroundColor:"#E0E0E0" },
    tableRow: { margin: "auto", flexDirection: "row", },
    tableCol: {   borderStyle: "solid", borderWidth: 1, borderColor:"#9E9E9E", borderLeftWidth: 0, borderTopWidth: 0 }, 
    tableCell: { margin: "auto",paddingTop:"5px",paddingBottom:"5px", marginTop: 5, fontSize: 10 },
    tableCol50: { width:"50px",  borderStyle: "solid", borderWidth: 1, borderColor:"#9E9E9E", borderLeftWidth: 0, borderTopWidth: 0 }, 
    tableCol90: { width:"95px",  borderStyle: "solid", borderWidth: 1, borderColor:"#9E9E9E", borderLeftWidth: 0, borderTopWidth: 0 }, 
    tableCol100: { width:"105px",  borderStyle: "solid", borderWidth: 1, borderColor:"#9E9E9E", borderLeftWidth: 0, borderTopWidth: 0 }, 

   

  });


export class PDFDocument extends Component {
    constructor(props){
        super(props);
    }



    render() {

        let rowVide= <View style={styles.tableRow}>
        <View style={styles.tableCol}> 
         <Text style={styles.tableCell}></Text> 
         </View>

         <View style={styles.tableCol}>
         <Text style={styles.tableCell}></Text>
         </View> 

         <View style={styles.tableCol}> 
         <Text style={styles.tableCell}></Text> 
         </View>

         <View style={styles.tableCol}>
         <Text style={styles.tableCell}></Text>
         </View>

         <View style={styles.tableCol}>
         <Text style={styles.tableCell}></Text>
         </View>

         <View style={styles.tableCol}>
         <Text style={styles.tableCell}></Text>
         </View>
         </View>
       
       
       
        let tableContent=(this.props.epreuves && this.props.epreuves.length>0)?this.props.epreuves.map((item,index)=>{
            return <View  style={styles.tableRow}>
                        <View style={styles.tableCol90}><Text style={styles.tableCell}>{item.date_evaluation?item.date_evaluation:" "} </Text></View>
                        <View style={styles.tableCol100}><Text style={styles.tableCell}>{item.Module?item.Module.designation:" "} </Text></View>
                        <View style={styles.tableCol50}><Text style={styles.tableCell}>{item.Module?item.Module.ue:" "} </Text></View>
                        <View style={styles.tableCol90}><Text style={styles.tableCell}>{item.Nature_epreuve?item.Nature_epreuve.designation:" "} </Text></View>
                        <View style={styles.tableCol50}><Text style={styles.tableCell}>{item.note } </Text></View>
                        <View style={styles.tableCol50}><Text style={styles.tableCell}>{item.bareme} </Text></View>
                       <View style={styles.tableCol90}><Text style={styles.tableCell}>{item.validation? "Oui":"Non"} </Text></View>
                       
            </View>
        }):rowVide;

       
       return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.row}>
                            <View style={styles.column1}>
                                    <Image style={styles.logo} source={logo}/>
                            </View>
                            <View style={styles.column1}>
                                    <Text style={styles.title}>AFFCPD-IDF</Text>
                                    <Text>11 rue des Petites Ecuries </Text>
                                    <Text>75010 Paris</Text>
                            </View>
                            <View style={styles.column1}>
                                    
                            </View>
                    </View>
                    <View style={styles.hr}>

                    </View>

                <View >
                    <Text style={styles.subTitle}>
                            {this.props.stagiaire.Civilite?this.props.stagiaire.Civilite.designation+" ":" yyy"} 
                            {this.props.stagiaire.nom?this.props.stagiaire.nom+" ":" "}  
                            {this.props.stagiaire.prenom?this.props.stagiaire.prenom+" - ":" - "}  
                            {this.props.stagiaire.date_naissance?this.props.stagiaire.date_naissance+" ":" "}
                    </Text>
                    <Text style={styles.subTitle}>
                            {this.props.stagiaire.raison_sociale?this.props.stagiaire.raison_sociale+" ":" "}
                    </Text>
                    <Text style={styles.subTitle}>
                            {this.props.stagiaire.Formation?this.props.stagiaire.Formation.designation+" - ":" "} 
                            {this.props.stagiaire.nature_contrat?this.props.stagiaire.nature_contrat+" ":" "}
                    </Text>
                    <Text style={styles.subTitle}>
                            {this.props.stagiaire.Groupe?this.props.stagiaire.Groupe.designation+" ":" "}   
                    </Text>
                     
                </View>
                

                <View style={styles.section}>
                    
                    <Text style={styles.title}>Téléchargé le: <Text style={styles.subTitle}> {(new Date()).toLocaleDateString()} </Text></Text>
                   

                
                <View style={styles.table}> 
                    {/* TableHeader */}
                    <View style={styles.tableRowHeader}>
                            <View style={styles.tableCol90}>
                                <Text style={styles.tableCell}>Date d'évaluation</Text>
                            </View>

                            <View style={styles.tableCol100}> 
                                <Text style={styles.tableCell}>Intitulé</Text> 
                            </View>

                            <View style={styles.tableCol50}> 
                                 <Text style={styles.tableCell}>UE</Text> 
                            </View>

                            <View style={styles.tableCol90}> 
                                <Text style={styles.tableCell}>Nature de l'epreuve</Text> 
                            </View>

                            <View style={styles.tableCol50}>
                                <Text style={styles.tableCell}>Note</Text>
                            </View>

                            <View style={styles.tableCol50}>
                                <Text style={styles.tableCell}>Barème</Text>
                            </View> 

                            <View style={styles.tableCol90}>
                                <Text style={styles.tableCell}>Validation</Text>
                            </View>
                     </View>

                     {/* TableContent */} 
                    {tableContent}
                     
                   
                </View>
                </View>

                <View style={styles.footer}>
                    
                    <Text >
                        <Link src="https://afppcd-idf.com/">https://afppcd-idf.com/</Link>
                    </Text>
                </View>
                </Page>
            </Document>
        )
    }
}

export default PDFDocument
