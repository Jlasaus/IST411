async function getBacon(){
  //api call
  var api = "https://baconipsum.com/api/";

  //gets dropdown value
  var eachPara = document.getElementById("newPara").value;
  api = api + "?type=all-meat&paras=" + eachPara;

  //keep what api gives
  var response = await fetch(api);

  //clear areas
  document.getElementById("raw").innerHTML = "";
  document.getElementById("form").innerHTML = "";

  //json format response
  var json = await response.json();

  //turn json into a string
  document.getElementById("raw").innerHTML = JSON.stringify(json);

  //loop to format each paragraph
  for(var para in json){
    document.getElementById("form").innerHTML += "<p>" + json[para] + "<p>";
  }
  
  return true;
}