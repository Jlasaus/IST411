var arrNum = [];

function addNumber(){
  var high = document.forms["inputs"]["newHigh"].value;
  var low = document.forms["inputs"]["newLow"].value;
  var nextNum = document.forms["inputs"]["newNum"].value;

  nextNum = parseInt(nextNum);

  if (high == ""){
    alert("Enter a high number");
    return false;
  }
  else if (low == ""){
    alert("Enter a low number");
    return false;
  }
  else if (nextNum == ""){
    alert("Enter a number");
    return false;
  }
  else {
    // Mean Start
    if(nextNum <= high && nextNum >= low){
      var totalSum = 0;

      arrNum.push(nextNum);     

      for(i = 0; i <= arrNum.length - 1; i++) {
        totalSum += arrNum[i];
      }

      var numsCnt = arrNum.length;
      var average = totalSum / numsCnt;
      //Mean End
      
      //Median Start
      var median = 0;
      var medIndex = 0;

      arrNum.sort(function(a, b){return a-b});

      if(arrNum.length == 1){
        median = arrNum[0];
      }
      else if(arrNum.length % 2 == 0){
        var first = 0;
        var second = 0;

        first = arrNum.length / 2;
        second = first - 1;

        median = (arrNum[first] + arrNum[second]) / 2;
      }
      else{
        medIndex = (arrNum.length / 2) - 0.5;

        median = arrNum[medIndex];
      }
      //Median End

      //Mode Start
      var multi = 1;
      var best = 0;
      var modes = [];

      for(i = 0; i<= arrNum.length - 1; i++){
        if(arrNum[i] == arrNum[i + 1]){
          multi++;
        }
        else{
          if(multi == best){
            best = multi;
            modes.push(arrNum[i]);
            multi = 1;
          }
          else if(multi > best){
            modes = [];
            best = multi;
            multi = 1;
            modes.push(arrNum[i]);
          }
          else{
            multi = 1;
          }
        }
      }

      var tableRef = document.getElementById("list");
      (tableRef.insertRow(tableRef.rows.length)).innerHTML = nextNum;

      document.getElementById("mean").innerHTML = average;

      document.getElementById("median").innerHTML = median;

      document.getElementById("mode").innerHTML = modes;

      document.forms["inputs"]["newNum"].value = "";
      
      return true;
    }
    else{
      alert("Invalid number")
      return false;
    } 
  }
}

function clearList(){
  arrNum = [];
  var tableRef = document.getElementById("list");
  tableRef.innerHTML = "";

  document.getElementById("mean").innerHTML = "";
  document.getElementById("median").innerHTML = "";
  document.getElementById("mode").innerHTML = "";  
}



