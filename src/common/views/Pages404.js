import React, { Component } from 'react';
import '../../assets/scss/page404.scss';
import { Link, withRouter } from 'react-router-dom';

export class Pages404 extends Component {
  
    render() {
        return (
            <div className="page-404 text-center " style={{maxWidth:window.innerWidth }}>
                    <div className="bg-overlay   mx-auto my-auto w-100 h-100 pt-100 pb-100" >
                            <div className="number-404  display-1">404</div>
                            <div className="go-back-section">
                                    <div className="mb-5">La page que vous cherchez n'a pas été trouvé</div>
                                    <Link to="/">
                                        <button className="btn btn-outline-info">
                                                 Retourner à l'acceuil
                                                 <i class="fas fa-home ml-3"></i>
                                        </button>
                                    </Link>
                            </div>
                            
                    </div>
                   
            </div>
        )
    }
}

export default withRouter(Pages404);


