var arrNum = [];

function setHighLow(){
  var high = document.forms["inputs"]["newHigh"].value;
  var low = document.forms["inputs"]["newLow"].value;

  if (high == ""){
    alert("Enter a high number");
    return false;
  }
  else if (low == ""){
    alert("Enter a low number");
    return false;
  }
  else {
    var tableRef = document.getElementById("list");
    /*   get rid of     (tableRef.insertRow(tableRef.rows.length)).innerHTML = high;
    (tableRef.insertRow(tableRef.rows.length)).innerHTML = low;
    arrNum.push(high);
    arrNum.push(low);*/
    return true;
  }  
}


function addNumber(){
  var nextNum = document.forms["inputs"]["newNum"].value;

  if (nextNum == ""){
    alert("Enter a number");
    return false;
  }
  else {
    var tableRef = document.getElementById("list");
    (tableRef.insertRow(tableRef.rows.length)).innerHTML = nextNum;
    arrNum.push(nextNum);
  }
  
  var totalSum = 0;
  for(var i in arrNum) {
    alert("here");
    totalSum += parse.Int(arrNum[i]);
    alert("here2");
  }
  alert(totalSum);
  var numsCnt = arrNum.length;

  var average = totalSum / numsCnt;

  document.getElementById("mean").innerHTML=average;

}



