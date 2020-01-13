import React, { useState } from 'react'
import { Modal,Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


function  DeconnexionModal (props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
 
  const handleShow = () => setShow(true);
 // removes user details from localStorage
 const logout = () => {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('role');


      // navigate to the login route
      
      props.history.push(props.navigateTo+'/login');
}
  return (
    <>
     
      <div className="col-4 linkTo text-center"  onClick={handleShow}>

          <i className= {"fas fa-sign-out-alt" }  >
          <div className={" mt-2 font-weight-normal" }> Se déconnecter </div> 
          </i>
                                            
       </div>

      <Modal  show={show} onHide={handleClose} animation={false}  size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
       
        <Modal.Body className="text-dark">
          <div className="mb-4">Confirmez-vous la déconnexion?</div>
          <div className="text-right">
                <Button variant="outline-info  mr-2"  onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant="info" onClick={(event)=>{handleClose();logout()}}>
                  Se déconnecter
                </Button>
          </div>
          
        
        </Modal.Body>
       
      </Modal>
    </>
  );
}

export default withRouter(DeconnexionModal)
