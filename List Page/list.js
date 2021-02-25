function validateANDadd(){
  var nextWord = document.forms["myForm"]["newWord"].value;
  var nextNum = document.forms["myForm"]["newNum"].value;

  if(nextWord == ""){
    alert("Need to enter a word")
    return false;
  }
  else if((nextNum != 1) && (nextNum != 2)){
    alert("Need to enter 1 or 2 for the list.");
    document.forms["myForm"]["newNum"].value = "";
    return false;
  }
  else{
    if(nextNum==1){
      var tableRef = document.getElementById("list1");
      (tableRef.insertRow(tableRef.rows.length)).innerHTML = nextWord;
    }
    else{
      var tableRef = document.getElementById("list2");
      (tableRef.insertRow(tableRef.rows.length)).innerHTML = nextWord;
    }
    document.forms["myForm"]["newWord"].value = "";
    document.forms["myForm"]["newNum"].value = "";
    return true;
  }
}

function clearList1(){
  var tableRef = document.getElementById("list1");
  tableRef.innerHTML = " ";
}

function clearList2(){
  var tableRef = document.getElementById("list2");
  tableRef.innerHTML = " ";
}