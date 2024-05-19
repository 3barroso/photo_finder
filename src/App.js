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

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  // button on click show section with more filters (page size, sort, top- window)

  // select dropdown to determine how many images are shown (useState)
  
  // SHOW MORE button click adds to shownImages -> adds based on page view size (?)
  
  function searchImgur(event){
    event.preventDefault();

    const form = event.target;
    const formData = form.elements;
    const searchWord = formData.searchKeyword.value;
    // take select input for search style (top / viral / recent "time")

    axios.get(`https://api.imgur.com/3/gallery/search/top/1?q=${searchWord}`, {
      headers: { 'Authorization': `CLIENT-ID ${process.env.REACT_APP_IMGUR_PUBLIC_CLIENT_ID}`}
    }).then(response => {
      const foundImages = response.data.data.map((data) => {
        if (data.images){
          return data.images
        } else if (data.link) {
          return data
        }
      })
      setImages(foundImages.flat(Infinity))
      setShowImages(true)
    });
    
    // set values within find keyword tags to display from API responses
    setRelatedWords([searchWord])
  }

  // related words get set from useEffect? (after images is populated?)

  // create new prop / state variable that is pagination from 

  return (
    <div className="App">
      
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
              <Button className="ms-2" onClick={toggleShowFilters} >  {showFilters ? "Hide" : "Show"} filters </Button>
            </Col>
          </Row>
        </Form>
        { showFilters && <div> FILTER DIVs </div>}

        <Row className="mb-3" >
          { showImages && <div> Related searches: {relatedWords} </div> }
        </Row>

        <Row>
          { showImages && (images.map((data, index) => (
            <Col className="mb-3" key={`${index}`}>
              <ImageCard data={data} />
            </Col>
          )))}
        </Row>

        { showImages && images.length == 0 && <div> no content (or loading?) </div> }
      </Container>
    </div>

  );
}

export default App;
