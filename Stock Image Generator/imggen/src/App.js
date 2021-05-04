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
    let height = this.state.userHeight;
    let width = "";

    // ID decision
    if(this.state.userId !== ""){
      id = "id/" + this.state.userId + "/";
    }

    // Width decision
    if(this.state.userWidth === ""){
      width = "200/"
    }
    else{
      width = this.state.userWidth + "/";
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
            <img class="img-fluid" alt="Site Logo" src="favicon-32x32.png"></img>
            <title>Stock Image Generator Home</title>
            <div class="homeLink">
              <span class="fs-4">Stock Image Generator</span>
            </div>
          </a>
        </header>

        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold text-center">Stock Image Generator</h1>

            {/* Site description and instructions */}
            <p class="col-md-12 fs-4 text-center">The generated image will appear in this box after clicking the "Get Image" button in the below Parameters box. A variety of parameters can be selected in the box below. Extra information about the image will be displayed underneath the image box. These images are free to use! More information about use can be found <a href="https://unsplash.com/">here</a></p>
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

              {/* Image ID Input, if there is nothing in the input then API gives it a random ID */}
              <label for="userId">Image ID: </label><input type="number" name="userId" id="userId" onChange={this.myChangeHandler} alt="Input for Image ID" />
              <br />
              {/* Width Input, default is set to 200px */}
              <label for="userWidth">Width (pixels): </label><input type="number" name="userWidth" id="userWidth" onChange={this.myChangeHandler} alt="Input for Image Width" />
              <br />
              {/* Height Input */}
              <label for="userHeight">Height (pixels): </label><input type="number" name="userHeight" id="userHeight" onChange={this.myChangeHandler} alt="Input for Image Height" />           
              <br /><br />

              {/* Filter inputs here, this includes grayscale, blur, blur slider */}
              <h4>Filters</h4>

              <label for="userGray">Grayscale</label><br />
              <select id="userGray" name="userGray" onChange={this.myChangeHandler}> 
                <option selected value="false">No Grayscale</option>
                <option value="true">Apply Grayscale</option>
              </select>
              <br /><br />
              
              <label for="userBlur">Blur</label><br />
              <select id="userBlur" name="userBlur" onChange={this.myChangeHandler}> 
                <option selected value="false">No Blur</option>
                <option value="true">Apply Blur</option>
              </select>
              <br /><br />

              {/* If slider is set to zero then the basic blur will be used */}
              <div class="slidecontainer">
                <input type="range" min="0" max="10" name="userBlurSlider" id="userBlurSlider" onChange={this.myChangeHandler} alt="Slider to Adjust Blur Strength" />
                <p for="userBlurSlider">Value: <span id="blurVal">{this.state.userBlurSlider}</span></p>
              </div>
              <br />

              <div class="note">
                <p>**If blur is selected, set the slider to zero to have the default blur applied (5), or specify a strength from 1-10.</p>
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
                <li>Width x Height: native size of the image</li>
                <li>URL: goes to the same image on Unsplash</li>
                <li>Download URL: this goes to an image only page, this is the full size image</li>
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
              <br />
              <div class="note">
                <p>**This goes to an image only page, the image is sized according to the parameters.</p>
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

export default Page;
