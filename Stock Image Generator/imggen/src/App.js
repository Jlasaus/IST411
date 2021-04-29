import React from 'react';
import './index.scss';

class Page extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    image: "",
    info: "",
    urlString: "",
    userId: "",
    //making default size 200px
    userWidth: "200",
    userHeight: "",
    userGray: false,
    userBlur: false,
    userBlurSlider: "",
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleClick(){
    // choices go at the top of this func
    let id = "";
    let gray = "";
    let blurs = "";

    // ID decision
    if(this.state.userId !== ""){
      id = "id/" + this.state.userId + "/";
    }

    // grayscale decision
    if(this.state.userGray === true){
      gray = "?grayscale";
    }

    // blur decision
    if(this.state.userBlur === true){
      if(this.state.userBlurSlider > 0){
        blurs = "&blur=" + this.state.userBlurSlider;
      }
      else{
        blurs = "&blur=";
      }
    }

    let width = this.state.userWidth + "/"; //if left blank, default size is 200
    let height = this.state.userHeight;
  
    let mainCall = "https://picsum.photos/" + id + width + height + gray + blurs;

    alert(mainCall);

    // keeps my this outside of api call
    let here = this;
    fetch(mainCall)

    // API call to get the url for the id and to get the image to display
    .then(function(response) {
      //console.log(response.url);
      const dat = response.url;
      here.setState({urlString: dat});
      response.blob()
      .then(function(myBlob) {
        var url = URL.createObjectURL(myBlob);
        //console.log(objUrl);
        here.setState({image: url});
      })
    })

          //// initial WORKING
    /* .then(resp => resp.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      //const strng = url.toString();
      //this.setState({urlString: url});
      this.setState({image: url});
    })  */

    // this needs to read from urlString
    let newId = 10;

    /// want to make json
     fetch("https://picsum.photos/id/" + newId + "/info")
    .then(res => res.text())
    .then((data) => {
      this.setState({info: data})
    })
  }

  render() {

    //js stuff goes here

    return (
      <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" class="me-2" viewBox="0 0 118 94" role="img"><title>Stock Image Generator Home</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
            <div class="homeLink">
              <span class="fs-4">Stock Image Generator</span>
            </div>
          </a>
        </header>

        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold text-center">Stock Image Generator</h1>
            <p class="col-md-12 fs-4 text-center">The generated image will appear in this box after clicking the "Get Image" button in the below Parameters box. A variety of parameters can be selected in the box below. If extra information about the image is wanted, the information will be displayed underneath the image.</p>
            <br />
            {/* image will appear here */}
            <img alt="img" src={this.state.image} />

            {/* displays the url */}
            <p>{this.state.urlString}</p>

            {/* Need to make an onclick to save the image */}
            <div class="text-center">
              <button class="btn btn-primary btn-lg" type="button">Save Image</button>
            </div>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Parameters</h2>

              {/* Image ID Input, if there is nothing in the input then it defaults to random ID */}
              Image ID: <input type="number" id="idInput" />
              <br />
              {/* Width Input */}
              Width (pixels): <input type="number" id="widthInput" />
              <br />
              {/* Height Input */}
              Height (pixels): <input type="number" id="heightInput" />           
              <br /><br />

              <h4>Filters</h4>
              <input type="checkbox" id="grayInput" name="grayInput" value="API CALL GOES HERE FOR gray" />
              <label for="grayInput">Grayscale</label><br />
              
              <input type="checkbox" id="blurInput" name="blurInput" value="API CALL GOES HERE FOR num blur" />
              <label for="blurInput">Blur</label><br />
              {/* If slider is set to zero then the basic blur will be used, will need a function for this */}
              <div class="slidecontainer">
                <input type="range" min="0" max="10" value="5" class="slider" id="blurSlider" />
                <p>Value: <span id="blurVal"></span></p>
              </div>
              <p>**Set the slider to zero to have a random level of blur applied.</p>

              {/* API call goes on this button */}
              <button class="btn btn-outline-light" type="button" onClick={this.handleClick}>Get Image</button>

            </div>
          </div>
          <div class="col-md-6">
            <div class="h-100 p-5 bg-light border rounded-3">
              {/* will always make the info API call so this area will always get populated*/}
              <h2>Image Information</h2>
              <p>Print the information here, probably in the same list as the other box, might just get rid of the checkbox and just always display this info</p>
              <ul>
                <li>Image ID Number</li>
                <li>Author</li>
                <li>Width x Height</li>
                <li>URL</li>
                <li>Download URL</li>
              </ul>
              <br />
              <p>{this.state.info}</p>

            </div>
          </div>
        </div>

        <footer class="pt-3 mt-4 text-muted border-top">
          &copy; 2021
        </footer>
      </div>
    );
  }
}

export default Page;
