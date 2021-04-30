import React from 'react';
import './index.scss';

class Page extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    image: "",
    info: {},
    urlString: "",
    userId: "",
    newId: "",
    userWidth: "200", //setting default size to 200px
    userHeight: "",
    userGray: "false",
    userBlur: "false",
    userBlurSlider: "",
  }

  //handler that changes states from inputs
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleClick(){
    //declaring parts of API call URL
    let id = "";
    let gray = "";
    let blurs = "";

    // ID decision
    if(this.state.userId !== ""){
      id = "id/" + this.state.userId + "/";
    }

    // grayscale decision
    if(this.state.userGray === "true"){
      gray = "?grayscale";
    }
    else{
      gray = "";
    }

    // blur decision
    if(this.state.userBlur === "true"){
      if(this.state.userBlurSlider > 0){
        if(this.state.userGray === "false"){
          blurs = "?blur=" + this.state.userBlurSlider;
        }
        else{
          blurs = "&blur=" + this.state.userBlurSlider;
        }
      }
      else{
        if(this.state.userGray === "false"){
          blurs = "?blur="
        }
        else{
        blurs = "&blur=";
        }
      }
    }

    //declares pieces for the API call
    let width = this.state.userWidth + "/";
    let height = this.state.userHeight;
  
    //API call URL
    let mainCall = "https://picsum.photos/" + id + width + height + gray + blurs;

    alert(mainCall);

    // here keeps a this call out here and pullId grabs the id from the url
    let here = this;
    let pullId = "";

    // API call to get the image data
    fetch(mainCall)
    .then(function(response) {
      //console.log(response.url);
      //turns the response into a url
      const dat = response.url;
      here.setState({urlString: dat}, function() {
        //console.log(this.state.urlString);
        //splits the url into each part seperated by /
        let splitString = this.state.urlString.split('/');
        //console.log(splitString);
        //grabs the image id which is always located at 4 in the array
        pullId = splitString[4];
        //console.log(pullId);

        fetch("https://picsum.photos/id/" + pullId + "/info")
        .then(res => res.json())
        .then((data) => {
          this.setState({info: data});
          console.log(this.state.info);
        })
      });
      response.blob()
      .then(function(myBlob) {
        var url = URL.createObjectURL(myBlob);
        //console.log(objUrl);
        here.setState({image: url});
      })
    })

  }

  render() {

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

            {/* Site description and instructions */}
            <p class="col-md-12 fs-4 text-center">The generated image will appear in this box after clicking the "Get Image" button in the below Parameters box. A variety of parameters can be selected in the box below. If extra information about the image is wanted, the information will be displayed underneath the image.</p>
            <br />

            {/* image will appear here */}
            <div class="text-center">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
              <img class="img-fluid" alt="Stock Image Displays Here" src={this.state.image} />
            </div>
            <br />

            {/* Button to save the image the API call returns */}
            <div class="text-center">
              <a href={this.state.image} download="stockImage"><button class="btn btn-outline-dark btn-md" type="button">Save Image</button></a>
            </div>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Parameters</h2>

              {/* Image ID Input, if there is nothing in the input then it defaults to random ID */}
              <label for="userId">Image ID: </label><input type="number" name="userId" id="userId" onChange={this.myChangeHandler} />
              <br />
              {/* Width Input */}
              <label for="userWidth">Width (pixels): </label><input type="number" name="userWidth" id="userWidth" onChange={this.myChangeHandler} />
              <br />
              {/* Height Input */}
              <label for="userHeight">Height (pixels): </label><input type="number" name="userHeight" id="userHeight" onChange={this.myChangeHandler} />           
              <br /><br />

              {/* Filter inputs here, this includes grayscale, blur, blur slider */}
              <h4>Filters</h4>

              <input type="checkbox" id="userGray" name="userGray" value="true" onChange={this.myChangeHandler} />
              <label for="userGray">Grayscale</label><br />
              
              <input type="checkbox" id="userBlur" name="userBlur" value="true" onChange={this.myChangeHandler} />
              <label for="userBlur">Blur</label><br />

              {/* If slider is set to zero then the basic blur will be used */}
              <div class="slidecontainer">
                <input type="range" min="0" max="10" name="userBlurSlider" id="userBlurSlider" onChange={this.myChangeHandler} />
                <p for="userBlurSlider">Value: <span id="blurVal">{this.state.userBlurSlider}</span></p>
              </div>
              <div class="note">
                <p>**If blur is selected, set the slider to zero to have the default blur applied (5).</p>
                <p>**To remove the grayscale and blur selections from your choices, refresh the page.</p>
              </div>

              {/* API happens on this button press */}
              <button class="btn btn-primary btn-lg" type="button" onClick={this.handleClick}>Get Image</button>

            </div>
          </div>
          <div class="col-md-6">
            <div class="h-100 p-5 bg-light border rounded-3">
              {/* Shows layout of image details for easier readability */}
              <h2>Image Information</h2>
              <ul>
                <li>Image ID Number</li>
                <li>Author</li>
                <li>Width x Height, native size of the image</li>
                <li>URL, goes to the same image on Unsplash</li>
                <li>Download URL, this goes to an image only page, this is a full size image</li>
              </ul>
              <br />

              {/* displays image details */}
              <div class="infoList">
                <ul class="col-md-12">
                  <li>ID: {this.state.info.id}</li>
                  <li>Author: {this.state.info.author}</li>
                  <li>WxH: {this.state.info.width} x {this.state.info.height}</li>
                  <li>URL: <a href={this.state.info.url}>{this.state.info.url}</a></li>
                  <li>Download URL: <a href={this.state.info.download_url}>{this.state.info.download_url}</a></li>
                </ul>
              </div>
              <br />

              {/* displays the url */}
              <p>URL Given by API:</p>
              <div class="url">
                <a href={this.state.urlString}><p class="col-md-12">{this.state.urlString}</p></a>
              </div>
              <div class="note">
                <p>**This goes to an image only page, the image will be sized accoriding to the parameters.</p>
              </div>

            </div>
          </div>
        </div>

        <footer class="pt-3 mt-4 text-muted border-top">
          &copy; Josh Lasauskas, 2021
        </footer>
      </div>
    );
  }
}
//NEED RESETS ON THE STATES, either reset on use or at the top of the code
export default Page;
