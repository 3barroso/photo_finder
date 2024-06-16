import React, { useState } from "react";

import { Card, Col, Modal } from 'react-bootstrap';

export function ImageCard({ data }){
  const [showImage, setShowImage] = useState(false);
  
  const closeModal = () => setShowImage(false);
  const openModal = () => setShowImage(true);

  const flickrImageBase = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`;

  return(
    <>
      <Card className="shadow-sm bg-white rounded" onClick={openModal} >
        <Card.Body className="d-flex flex-column" >
          <Col className="d-flex flex-column align-items-center" style={{maxHeight:"320px", overflow:"scroll"}} >
          <img src={flickrImageBase}></img>
          {data.title && (data.title.length > 25 ? data.title.substring(0, 25) + "..." : data.title)}
          </Col>
        </Card.Body>
      </Card>
      
      <Modal show={showImage} onHide={closeModal} size="xl">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={flickrImageBase} alt={data.description} width="100%" height={"auto"} />
          { data.title && data.title }
          { data.description && <div> {data.description} </div> }
        </Modal.Body>
      </Modal>
    </>
  )
}