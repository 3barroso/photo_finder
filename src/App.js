import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import loadingBearImage from './Floof_bear.png'

import {Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap';
import { ImageCard } from './components/ImageCard';

function App() {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);
  const [displayedImagesCount, setDisplayedImagesCount] = useState(15);
  const showMoreImages = () => setDisplayedImagesCount(displayedImagesCount + 15);
  const displayImages = images.slice(0, displayedImagesCount);

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  const filterFormStyle = {'display': `${showFilters ? 'block' : 'none'}`};
  
  function searchImgur(event){
    event.preventDefault();
    searchFlickr(event);

    const formData = event.target.elements;
    const searchWord = formData.searchKeyword.value;
    const sortedBy = formData.sortedBy.value;
    const searchQuery = `${sortedBy}?q=${searchWord}`;
    const imgurBaseUrl = "https://api.imgur.com/3/gallery/search/";
    setDisplayedImagesCount(parseInt(formData.imagesDisplayed.value));
    
    setLoadedImages(false);
    axios.get((imgurBaseUrl + searchQuery), {
      headers: { 'Authorization': `CLIENT-ID ${process.env.REACT_APP_IMGUR_PUBLIC_CLIENT_ID}`}
    }).then(response => {
      const foundImages = response.data.data.map((data) => {
        if (data.images){
          return data.images;
        } else if (data.link) {
          return data;
        }
      });
      foundImages.length ? setImages(foundImages.flat(Infinity)) : toast.info("Search complete, no images found") ;
    }).catch(error => {
      toast.error(error.message);
    });
    setLoadedImages(true);
  }

  function searchFlickr(event){
    event.preventDefault();

    // ability to use different methods for flickr search 
    // flickr.photos.getRecent should be used if no search is inputted
    const flickrBaseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&nojsoncallback=1";
    const flickrAPIkey = `&api_key=${process.env.REACT_APP_FLICKR_PUBLIC_KEY}`
    // const searchQuery = `${sortedBy}?q=${searchWord}`;
    axios.get(flickrBaseUrl + flickrAPIkey).then(response => {
      console.log("API Resp: ", response.data.photos.photo)
      response.data.photos.photo.length ? setImages(response.data.photos.photo) : toast.info("Search complete, no images found");
    }).catch(error => {
      toast.error(error.message);
    });
    setLoadedImages(true);
  };

  return (
    <div className="App">
      
      <Container>
        <div>
          <ToastContainer />
        </div>

        <h1 className="mb-2 mt-2">Photo Finder</h1>
        <Form method="post" onSubmit={searchFlickr}>
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

        <Row>
          { loadedImages && images.length > 0 && (displayImages.map((data, index) => (
            <Col className="mb-3" key={`${index}`}>
              <ImageCard data={data} />
            </Col>
          )))}
        </Row>

        { loadedImages && !images.length && (
          <div>
            <div>Thanks for searching</div>
            <img src={loadingBearImage} alt="Fluffy cartoon bear with party hat" />
          </div>
        )}

        { loadedImages && (
          <div>
            <div className="mb-3">Images found: {images.length}</div>
            { images.length > 0 && (<Button variant="light" className="mb-3" onClick={showMoreImages}> Show more images </Button>)}
          </div>
        )}
      </Container>
    </div>

  );
}

export default App;
