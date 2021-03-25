async function getCipher1(){
  //api call
  var api = "https://baconipsum.com/api/";

  //gets dropdown value
  var eachPara = document.getElementById("newPara").value;
  var eachType = document.getElementById("paraType").value;
  api = api + "?type=" + eachType + "&paras=" + eachPara;

  //keep what api gives
  var response = await fetch(api);

  //clear areas
  document.getElementById("raw").innerHTML = "";
  document.getElementById("form").innerHTML = "";
  document.getElementById("ciph").innerHTML = "";


  //json format response
  var json = await response.json();

  //turn json into a string
  document.getElementById("raw").innerHTML = JSON.stringify(json);

  //loop to format each paragraph
  for(var para in json){
    document.getElementById("form").innerHTML += "<p>" + json[para] + "<p>";
  }
  //create alphabet
  var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  //new array to put new pieces in
  var cipher = [];

  //for loop over the number of paragraphs
  for(var para in json){
    //for loop over the number of letters in the paragraph
    for(let i = 0; i < json[para].length; i++){
      //if space or period then they are not changed
      if(json[para][i] == " " || json[para][i] == "."){
        cipher[i] = json[para][i];
      }
      //else the letter will change
      else{
        //lower case everything
        var lower = json[para][i].toLowerCase();
        //create an index variable and add 3, ---- indexOf is new
        var locate = alpha.indexOf(lower);
        locate += 3

        //if locate gets larger than the alpha then it goes back 10
        if(locate > 25){
          locate -= 10
        }

        //insert into array
        cipher[i] = alpha[locate];
      }
    }

    //joins cipher so that it can be displayed as a string, ---- join is new
    cipher = cipher.join("");
    //seperates the paragraph and prints
    document.getElementById("ciph").innerHTML += "<p>" + cipher + "<p>";
    //resets array for next paragraph
    cipher = [];
  }
}

async function getCipher2(){
  //api call
  var api = "https://baconipsum.com/api/";

  //gets dropdown value
  var eachPara = document.getElementById("newPara").value;
  var eachType = document.getElementById("paraType").value;
  api = api + "?type=" + eachType + "&paras=" + eachPara;

  //keep what api gives
  var response = await fetch(api);

  //clear areas
  document.getElementById("raw").innerHTML = "";
  document.getElementById("form").innerHTML = "";
  document.getElementById("ciph").innerHTML = "";


  //json format response
  var json = await response.json();

  //turn json into a string
  document.getElementById("raw").innerHTML = JSON.stringify(json);

  //loop to format each paragraph
  for(var para in json){
    document.getElementById("form").innerHTML += "<p>" + json[para] + "<p>";
  }
  //creates alphabet
  var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  //array to put new pieces in 
  var cipher = [];

  //for each paragraph
  for(var para in json){
    //for each letter in the paragraph
    for(let i = 0; i < json[para].length; i++){
      //space and period ignored
      if(json[para][i] == " " || json[para][i] == "."){
        cipher[i] = json[para][i];
      }
      //else change it
      else{
        //lowercase everything
        var lower = json[para][i].toLowerCase();
        //give index of it
        var locate = alpha.indexOf(lower);
        
        //if the paragraph has even number of letters then the new letter is 2 letters after it, ex: b->d
        if(json[para].length % 2 == 0){
          locate += 2;
          cipher[i] = alpha[locate];
        }
        //else the paragraph has odd number of letters so the new letter is on the opposite side of the alphabet
        else{
          alpha.reverse();
          cipher[i] = alpha[locate];
          //have to reverse twice to get it back to normal, ---- reverse is new
          alpha.reverse();
        }
      }
    }
    //joins cipher into a string
    cipher = cipher.join("");
    //prints paragraphs to split them
    document.getElementById("ciph").innerHTML += "<p>" + cipher + "<p>";
    //reset
    cipher = [];
  }

  return true;
}