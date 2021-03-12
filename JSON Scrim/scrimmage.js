async function getAccountInfo(){
  var apiString = "https://api.github.com/users/";
  var username = document.forms["userForm"]["user"].value;

  apiString = apiString + username +"/repos";
  var response = await fetch(apiString);

  document.getElementById("repos").innerHTML = "";

  var jsonRepos = await response.json();

  var repoArr = [];
  for(let i = 0; i < jsonRepos.length; i++){
    repoArr.push(jsonRepos[i].name);
  }

  alert("start");

  for(let i = 0; i < repoArr.length; i++){
    document.getElementById("repos").innerHTML += "<input type='checkbox' id=" + i + "> <label for=" + i + ">" + repoArr[i] + "</label><br>"
  }

  //document.getElementById("repos").innerHTML = repoArr;
  alert("Done");
}