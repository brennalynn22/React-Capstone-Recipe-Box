// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// const DeleteConfirm= ({showModal, hideModal, message, id, confirmDelete }) => {

//   return (
//       <Modal show={showModal} onHide={hideModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <div className='delete text'>{message}</div></Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={hideModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={()=> confirmDelete(id)}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
    
//   );
// }

// export default DeleteConfirm