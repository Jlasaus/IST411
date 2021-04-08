import React from 'react';
import './index.css';

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'None Selected',
      currentPref: 'None Selected',
      favGame: "N/A",
      numOwned: 'None Selected',
      finalComments: 'Enter any final comments'
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  mySubmitHandler = (event) => {
    alert("Submission: \r\n" +
    "   Gender:                 " + this.state.gender + "\n" +
    "   Preferred:              " + this.state.currentPref + "\n" +
    "   Favorite Game:      " + this.state.favGame + "\n" +
    "   Number Owned:   " + this.state.numOwned + "\n" +
    "   Comments:            " + this.state.finalComments + "\n");
  }

  render() {
    return (
      <div class="container">
      <header>
        <h1>Gaming Platform Survey</h1>
        <h3>This survey should take less than two minutes to complete, thank you for participating!</h3>
      </header>
      <form id="survey-form" onSubmit={this.mySubmitHandler}>
        <div class="form-group">
          <p>What is your gender?</p>
          <label>
            <input
              name = "gender"
              value = "male"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Male</label><br/>

          <label>
            <input
              name = "gender"
              value = "female"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Female</label><br/>

          <label>
            <input
              name = "gender"
              value = "other"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Other</label><br/>
        </div>
        <div class= "form-group">
          <p>What is your current preferred gaming device?</p>
          <select id="currentPref" name="currentPref" class="form-control" value={this.state.currentPref} onChange={this.myChangeHandler}>
            <option selected value="None Selected">Select Preferred Device</option>
            <option value="pc">PC</option>
            <option value="xbox">Xbox Series X/S</option>
            <option value="xboxone">Xbox One</option>
            <option value="ps4">PS4</option>
            <option value="ps5">PS5</option>
            <option value="switch">Nintendo Switch</option>
            <option value="mobile">Mobile</option>
            <option value="stadia">Stadia</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <p>What is your favorite game you have ever played?</p><p style={{color: 'red', textSize: '.625rem'}}>*required</p>
          <label id="fav-label" for="favGame">Game:</label>
          <input
            type="text"
            name="favGame"
            id="favGame"
            class="form-control"
            placeholder="Enter Favorite Game"
            onChange={this.myChangeHandler}
            required
          />
        </div>
        <div class="form-group">
          <p>How many different gaming devices do you currently own?</p>
          <label>
            <input
              name = "numOwned"
              value = "one"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />One</label><br/>

          <label>
            <input
              name = "numOwned"
              value = "two"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Two</label><br/>

          <label>
            <input
              name = "numOwned"
              value = "three"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Three</label><br/>

          <label>
            <input
              name = "numOwned"
              value = "four"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Four</label><br/>

          <label>
            <input
              name = "numOwned"
              value = "five or more"
              type = "radio"
              class = "input-radio"
              onChange={this.myChangeHandler}
            />Five or More</label><br/>
        </div>
        <div class="form-group">
          <p>Any additional comments regarding gaming platforms, devices, or games?</p>
          <textarea
            name="finalComments"
            class="input-textarea"
            value={this.state.finalComments}
            onChange={this.myChangeHandler}>
            </textarea>
        </div>
        <div class="form-group">
          <button type="submit" id="submit" class="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>

    );
  }
}

export default Survey;
