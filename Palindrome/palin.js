function checkPalin(){
  var pick = document.forms["myForm"]["enteredNum"].value;
  var word = document.forms["myForm"]["enteredWord"].value;
  var caseCheck = document.getElementById("caseSense").checked;

  if(word == ""){
    alert("Enter a word");
    return false;
  }

  if(caseCheck == false){
    word = word.toLowerCase();
  }

  if(pick == 1){
    var answer;
    var strng = "";

    for(i = word.length - 1; i >= 0; i--){
      strng += word[i];
    }

    if(word == strng){
      answer = true;
    } 
    else{
      answer = false;
    }

    var tableRef = document.getElementById("algOne");
    (tableRef.insertRow(tableRef.rows.length)).innerHTML = word + " - " + answer;

    document.forms["myForm"]["enteredWord"].value = "";
    document.forms["myForm"]["enteredNum"].value = "";

    return true;

  }
  else if(pick == 2){
    var ccount = 0;

    // Check if the length of the string is even or odd 
    if ((word.length) % 2 === 0) {
     ccount = (word.length) / 2;
    } 
    else {
    // If the length of the string is 1 then it becomes a palindrome
     if (word.length === 1) {
       console.log("Entry is a palindrome.");
       return true;
     }
     else {
    // If the length of the string is odd ignore middle character
       ccount = (word.length - 1) / 2;
     }
    } 

    // Loop through to check the first character to the last character and then move next
    for (var x = 0; x < ccount; x++) {
      // Compare characters and drop them if they do not match 
      if (word[x] != word.slice(-1-x)[0]) {
        answer = false;
        var tableRef = document.getElementById("algTwo");
        (tableRef.insertRow(tableRef.rows.length)).innerHTML = word + " - " + answer;
        document.forms["myForm"]["enteredWord"].value = "";
        document.forms["myForm"]["enteredNum"].value = "";
        return false;
      }
      else{
        answer = true;
        var tableRef = document.getElementById("algTwo");
        (tableRef.insertRow(tableRef.rows.length)).innerHTML = word + " - " + answer;
        document.forms["myForm"]["enteredWord"].value = "";
        document.forms["myForm"]["enteredNum"].value = "";
        return true;
      }
    }
  }
  else{
    alert("You can only enter 1 or 2 to pick an algorithm");
    document.forms["myForm"]["enteredNum"].value = "";
    return false;
  }
}

function clearFirst(){
  let result = confirm("Are you sure you want to clear the list?");
  if(result == true){
    var tableRef = document.getElementById("algOne");
    tableRef.innerHTML = "";
  }
}

function clearSecond(){
  let result = confirm("Are you sure you want to clear the list?");
  if(result == true){
    var tableRef = document.getElementById("algTwo");
    tableRef.innerHTML = "";
  }
}