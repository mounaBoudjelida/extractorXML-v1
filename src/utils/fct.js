export const filtrerXML = (xmlContent) => {
    let x = xmlContent.documentElement.childNodes;
       
                
    for( let i = 0; i < x.length ;i++) {
      
      if(x[i].nodeName==="Table"){
        
        let table=x[i];
        let tableChildNodes=table.childNodes;
        for(let j=0;j<tableChildNodes.length;j++){
        
          if((tableChildNodes[j].nodeName==="DATE_EVALUATION") && (tableChildNodes[j].childNodes[0]==undefined)){
            
            //table.remove();
            xmlContent.documentElement.removeChild(table);
            
            
          }
        }

      }
      
      
  }

  return xmlContent;
}


export const xmlToJSON = (xmlContent) => {

    var convert = require('xml-js');
    var xml ='<?xml version="1.0" encoding="utf-8"?>';
   
    var xmlText = new XMLSerializer().serializeToString(xmlContent);
    var result1 = convert.xml2json(xmlContent?xmlText:xml, {compact: true, spaces: 4});
    
 
    var saveTable=JSON.parse(result1).WINDEV_TABLE.Table;
    //This step is for a table with one element
    if(saveTable.length){
      
      return JSON.parse(result1).WINDEV_TABLE.Table;
    }else{
        var arr=[];
        arr.push(saveTable);
        return arr;
       
    }
    
}