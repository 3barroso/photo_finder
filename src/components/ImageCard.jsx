import React, { useState } from "react";

import { Card, Col, Modal } from 'react-bootstrap';

export function ImageCard({ data }){
  const [showImage, setShowImage] = useState(false);
  
  const closeModal = () => setShowImage(false);
  const openModal = () => setShowImage(true);

  return(
    <>
      <Card className="shadow-sm bg-white rounded" onClick={openModal} >
        <Card.Body className="d-flex flex-column" >
          <Col className="d-flex flex-column align-items-center" style={{maxHeight:"320px", overflow:"scroll"}} >
          {data.type == "video/mp4" ? (
              <video autoPlay muted src={data.link} width="100%" height={"auto"}></video>
            ) : (
            <img style={{objectFit: "cover", maxHeight: "100vh"}} src={data.link} alt={data.description} width={220}/>
            )
          }
          {data.title && (data.title.length > 25 ? data.title.substring(0, 25) + "..." : data.title)}
          </Col>
        </Card.Body>
      </Card>
      
      <Modal show={showImage} onHide={closeModal} size="xl">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {data.type == "video/mp4" ? (
            <video autoPlay src={data.link} width="100%" height={"auto"}></video>
          ) : (
            <img src={data.link} alt={data.description} width="100%" height={"auto"} />
          )}
          { data.title && data.title }
          { data.description && <div> {data.description} </div> }
        </Modal.Body>
      </Modal>
    </>
  )
}