let NUMBER_OF_RESULTS = 3
let HTMLTable = document.getElementById("table");
let userDataArray = [];

/* Fetch data from API, 
 * run function tableMaker() on data.results
 */

fetch(`https://randomuser.me/api/?results=${NUMBER_OF_RESULTS}`)
  .then((response) => response.json())
  .then((data) => {
    userDataArray = data.results;
    console.log(userDataArray);
    generateTableStructure(userDataArray);
  });

// Flag API url doesn't work: <td><img src="https://countryflagsapi.com/png/${user.nat}" width="50" height="25" /></td>

function generateTableStructure(usersArray) {
  let tableStructureMarkup = "";

  for (var i = 0; i < usersArray.length; i++) {
    tableStructureMarkup += `<tr>
    <td> ${usersArray[i].gender} </td>
    <td> ${usersArray[i].dob.age} </td>
    <td> ${usersArray[i].name.first} </td>
    <td> ${usersArray[i].name.last} </td>
    <td> ${usersArray[i].location.street.number}, ${usersArray[i].location.street.name}, ${usersArray[i].location.city}, ${usersArray[i].location.state}, ${usersArray[i].location.postcode} </td>
    <tr>`;
  }
  HTMLTable.innerHTML = `
  <thead>
  <tr>
  <td>Gender:</td>
  <td>Age:</td>
  <td>First Name:</td>
  <td>Last Name:</td>
  <td>Address:</td>
  <!-- <td>Flag:</td> -->
  </tr>
  </thead>
  <tbody>${tableStructureMarkup}</tbody>
  `;
}

// Selection functionality: Select male, select female, select both, reset button, clear button, 50+ button.
male.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
  userSubset = [];
  for (i = 0; i < userDataArray.length; i++) {
    let user = userDataArray[i];
    if (user.gender === "male") {
      // console.log(user.gender + user.name.first + user.name.last);
      userSubset.push(user);
      generateTableStructure(userSubset);
    }
  }
});

female.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
  userSubset = [];
  for (i = 0; i < userDataArray.length; i++) {
    let user = userDataArray[i];
    if (user.gender === "female") {
      // console.log(user.gender + user.name.first + user.name.last);
      userSubset.push(user);
      generateTableStructure(userSubset);
    }
  }
});

both.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
  userSubset = [];
  for (i = 0; i < userDataArray.length; i++) {
    let user = userDataArray[i];
    userSubset.push(user);
    generateTableStructure(userSubset);
  }
});

resetButton.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
  userSubset = [];
  for (i = 0; i < userDataArray.length; i++) {
    let user = userDataArray[i];
    userSubset.push(user);
    generateTableStructure(userSubset);
  }
});

clearButton.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
});

fiftyPlus.addEventListener("click", function () {
  HTMLTable.innerHTML = "";
  userSubset = [];
  for (i = 0; i < userDataArray.length; i++) {
    let user = userDataArray[i];
    if (user.dob.age >= 50) {
      userSubset.push(user);
      generateTableStructure(userSubset);
    }
  }
});

search.addEventListener("keyup", function (event) {
  console.log(event.target.value);
  let searchString = event.target.value.trim().toLowerCase();
  // search function
  if (searchString !== "") {
    let userSubset = [];
    for (i = 0; i < userDataArray.length; i++) {
      let user = userDataArray[i];
      let userFullName =
        user.name.first.trim().toLowerCase() +
        " " +
        user.name.last.trim().toLowerCase();
      if (userFullName.includes(searchString)) {
        userSubset.push(user);
      }
    }
    generateTableStructure(userSubset);
    console.log(userSubset);
  } else {
    generateTableStructure(userDataArray);
  }
});

/*ASSIGNMENTS:
...or have clickable buttons on top for countries of origin. Click the button, show all results from country of origin. Or a button that shows all phone numbers.
    * Everything I've read about this suggests I need jquery for it. Can I do it without?
    * I had an idea involving injecting template literal code that created or deleted table columns in html.

*/
