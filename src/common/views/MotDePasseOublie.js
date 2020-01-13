import React, { Component } from 'react'
import logo from '../../assets/img/logo-appc-sous-titre.png';

export class MotDePasseOublie extends Component {
   

    render() {
        return (
            <div className="text-center mt-5 " style={{maxWidth:window.innerWidth }} >
                    <div className="text-center mx-auto">
                            <img className="mb-0 mx-auto" src={logo} alt="logo" style={{maxWidth:"380px", maxHeight:"150px"}} />
                    </div>
                     
                     <hr></hr>
                    <div >Saisissez votre adresse email:</div>
                     <div class="input-group w-50 mx-auto mt-3">
                        <input type="email" class="form-control" id="resetPassword" placeholder="Email"  onChange={this.onChange} />
                        <div class="input-group-append">
                            <button  class="btn btn-outline-info" type="button">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                        </div>
                     </div>

                     <div className="mt-3">Un email contenant votre nouveau mot de passe vous a été envoyé</div>

            </div>
        )
    }
}

export default MotDePasseOublie
