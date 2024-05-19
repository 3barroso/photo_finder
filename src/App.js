import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap';
import { ImageCard } from './components/ImageCard';

function App() {
  const [relatedWords, setRelatedWords] = useState([""]);
  // Populate after images are filled after scrapping [tags]

  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [displayedImagesCount, setDisplayedImagesCount] = useState(15);
  const showMoreImages = () => setDisplayedImagesCount(displayedImagesCount + 15)

  const displayImages = images.slice(0, displayedImagesCount);

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  const filterFormStyle = {'display': `${showFilters ? 'block' : 'none'}`}
  
  function searchImgur(event){
    event.preventDefault();

    const formData = event.target.elements;
    const searchWord = formData.searchKeyword.value;
    const sortedBy = formData.sortedBy.value;
    const searchQuery = `${sortedBy}?q=${searchWord}`;
    const imgurBaseUrl = "https://api.imgur.com/3/gallery/search/";
    setDisplayedImagesCount(parseInt(formData.imagesDisplayed.value));
    
    // setShowImages(false) --> rename to be about (loading search to show status of loading / loaded)
    axios.get((imgurBaseUrl + searchQuery), {
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
    }).catch(error => {
      toast.error(error.message);
    });
    setShowImages(true)
    
    // set values within find keyword tags to display from API responses
    setRelatedWords([searchWord])
  }

  return (
    <div className="App">
      
      <Container>
        <div>
          <ToastContainer />
        </div>

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
              <Button variant="secondary" className="ms-2" onClick={toggleShowFilters} >  {showFilters ? "Hide" : "Show"} filters </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="sortedBy" label="Sorted by" style={filterFormStyle}>
                <Form.Select aria-label="sorted by">
                  <option value="time">Time</option>
                  <option value="top">Top</option>
                  <option value="viral">Viral</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="imagesDisplayed" label="Images displayed" style={filterFormStyle}>
                <Form.Select aria-label="images displayed">
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Form>

        <Row className="mb-3" >
          { showImages && <div> Related searches: {relatedWords} </div> }
        </Row>

        <Row>
          { showImages && images.length && (displayImages.map((data, index) => (
            <Col className="mb-3" key={`${index}`}>
              <ImageCard data={data} />
            </Col>
          )))}
        </Row>

        { showImages && !images.length && <div> no content (or loading?) </div> }

        { showImages && (
          <div>
            Images found: {images.length}
            <Button variant="light" className="mb-3" onClick={showMoreImages}> Show more images </Button>
          </div>
        )}
      </Container>
    </div>

  );
}

export default App;
