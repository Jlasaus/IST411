async function getQuote(){

  //Starting values for variables used
  var minLength = "";
  var maxLength = "";
  var quote;
  var author;
  var length = document.getElementById("lengthHere").value;
  var tag = document.getElementById("filter").value;

  //Sets the length
  //50 > length > 0
  if(length === "short"){
    minLength = "?minLength=0";
    maxLength = "&maxLength=50";
  } 
  //150 > length > 50
  else if(length === "medium"){
    minLength = "?minLength=50",
    maxLength = "&maxLength=150";
  } 
  //Gives > 150 characters
  else if(length === "long"){
    minLength = "?minLength=150";
    maxLength = "";
  }

  //Api call and converts to json
  var apiString = "https://api.quotable.io/random" + minLength + maxLength + tag;
  var response = await fetch(apiString);
  var json = await response.json();

  //Checks for error
  if(json.statusCode === 404){
    quote = json.statusMessage;
    author = "";

  } 
  //Displays quote and author
  else{
    quote = json.content;
    author = json.author;
  }

  //Displays whatever is returned
  document.getElementById("quoteHere").innerHTML = quote;
  document.getElementById("authorHere").innerHTML = author;
}