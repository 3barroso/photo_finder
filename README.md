# Hi Fieldwire Team!

Thank you for the opportunity to participate in this section of the interview process. A quick summary of the project is written here, but please reach out if any more information is helpful.

### Tools:
- React SPA, bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) used for component structuring
- [Axios](https://axios-http.com/docs/intro) used for HTTP request to Imgur
- [Ngrok](https://ngrok.com/) used to host local app and create secure https connection with Imgur API

### Getting started:
- Unzip shared project folder, and install node dependencies with `yarn install`
- Add Imgur API Client-ID key to [.env](/.env) file as `REACT_APP_IMGUR_PUBLIC_CLIENT_ID`
- Start localhost `yarn start`
- Start ngrok directed at the port hosting local app `ngrok http http://localhost:3000`
- Copy ngrok HTTPs address into browser and start searching images

### Highlighted files
To reduce code review complexity I opted for one main file [App.js](/src/App.js), and one component file [ImageCard.jsx](/src/components/ImageCard.jsx)

- [App.js](/src/App.js) Parent container holds state values, structure of the single page app, and worker API search method [searchImgur](/src/App.js#L25)

- [ImageCard.jsx](/src/components/ImageCard.jsx) Child component used to display loaded images, upon click displays large image in modal

### Future considerations
- Increase pagination after first section of images is loaded and displayed
- Parse 'tags' from Imgur API results to share suggested search words/phrases
- Sharpen design layout by improving buttons or dynamically adjusted image sizes



-------------------
####
App generated [README.md moved here](/oldREADME.md):
