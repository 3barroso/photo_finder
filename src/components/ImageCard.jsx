import React, { useState } from "react";

import { Card, Modal } from 'react-bootstrap';

export function ImageCard({ data }){
  console.log(data.images)
  const [showImage, setShowImage] = useState(false)
  
  const closeModal = () => setShowImage(false);
  const openModal = () => setShowImage(true);

  return(
    <>
      <Card className="h-100 shadow-sm bg-white rounded" onClick={openModal} >
        <Card.Img variant="top" src={data.link} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex mb-2 justify-content-between">
            <Card.Title className="mb-0 font-weight-bold">{data.title}</Card.Title>
          </div>
          <Card.Text className="text-secondary">{data.description}</Card.Text>
        </Card.Body>
      </Card>
      
      <Modal show={showImage} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body> 
          <img src={data.link} alt="alt text from api here" />
        </Modal.Body>
      </Modal>
    </>
  )
}