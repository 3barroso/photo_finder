import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import {Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap';
import { ImageCard } from './components/ImageCard';
import images from './data';


function App() {
  const [relatedWords, setRelatedWords] = useState([""]);

  function searchImgur(event){
    event.preventDefault();

    const form = event.target;
    const formData = form.elements;
    console.log(formData.searchKeyword.value)

    // API REQUEST 
    console.log(process.env.REACT_APP_IMGUR_PUBLIC_CLIENT_ID);

    // set values within store for cache? (or add new keywords to display)
    setRelatedWords([formData.searchKeyword.value])
  }

  return (
    <div className="App">
      {/* <header className="App-header"> </header> */}
      
      <Container>
        <h1>Photo Finder</h1>
        <Form method="post" onSubmit={searchImgur}>
          <Row className="justify-content-md-center">
            <Col>
              <FloatingLabel label="Search Imgur" className="mb-3" controlId="searchKeyword">
                <Form.Control type="search" placeholder="Search Imgur" />
              </FloatingLabel>
            </Col>
            <Col>
              <Button type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="mb-3" >
          { relatedWords && <div> Related searches: {relatedWords} </div> }
        </Row>

        <Row>
          { images.map(data => (
            <Col className="mb-5" key={`${data.id}`}>
              <ImageCard data={data} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>

  );
}

export default App;
