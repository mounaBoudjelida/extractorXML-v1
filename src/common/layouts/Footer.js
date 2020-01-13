import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import '../../assets/scss/footer.scss';

export class Footer extends Component {
   

    render() {
        if (this.props.location.pathname === "/stagiaires/mes-notes" ||
            this.props.location.pathname === "/stagiaires/mon-profile" || 
            this.props.location.pathname === "/admin/xml-filter"  )
        {
            return (
                <div className="text-light">
                    <div style={phantom} />
                    <div style={style}>
                    
                    <div ><i className="fas fa-map-marked-alt mr-3"></i>11 rue des Petites Ecuries - 75010 Paris</div>
                    <div><i className="far fa-envelope mr-3"></i>  contact@afppcd-idf.com    </div>
                    <div> <i className="fas fa-mobile-alt mr-3"></i> 01 42 85 33 47 - <i className="fas fa-fax mr-3 ml-3"></i>  01 42 85 28 30</div>
                    </div>

                </div>
            )
        
        
        
        
        }
        else{
           return null

        }
        

}
}

var style = {
    backgroundColor: "#00a5a2",
    textAlign: "center",
    padding: "20px",
    position: "absolue",
    left: "0",
    bottom: "0",
    height: "110px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

const navbarStyle = {

backgroundColor: "#00a5a2",
padding:10,
marginTop:50,
};
export default withRouter(Footer);
