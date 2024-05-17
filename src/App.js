import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import {Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap';
import { ImageCard } from './components/ImageCard';

function App() {
  const [relatedWords, setRelatedWords] = useState([""]);

  const [images, setImages] = useState({});
  const [showImages, setShowImages] = useState(false);
  
  function searchImgur(event){
    event.preventDefault();

    const form = event.target;
    const formData = form.elements;
    console.log(formData.searchKeyword.value)

    const searchWord = formData.searchKeyword.value;

    // API REQUEST
    axios.get(`https://api.imgur.com/3/gallery/search/top?q=${searchWord}`, {
      headers: { 'Authorization': `CLIENT-ID ${process.env.REACT_APP_IMGUR_PUBLIC_CLIENT_ID}`}
    }).then(response => {
      const foundImages = response.data.data.map((data) => {
        if (data.images){
          const linkedImages = data.images.map((image) => {
            return {
              "link": image.link,
              "title": image.title,
            }
          });
          return linkedImages
        } else if (data.link) {
          return {
            "link": data.link,
            "title": data.title,
          }
        }
      })
      setImages(foundImages.flat(Infinity))
      setShowImages(true)
    });
    
    // set values within find keyword tags to display from API responses)
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
          { showImages && <div> Related searches: {relatedWords} </div> }
        </Row>

        <Row>
          { showImages && (images.map(data => (
            <Col className="mb-5" key={`${data.id}`}>
              <ImageCard data={data} />
            </Col>
          )))}
        </Row>
      </Container>
    </div>

  );
}

export default App;
