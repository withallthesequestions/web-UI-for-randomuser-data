// JSON object notation.
// Some background: the data is in .json format. It contains three arrays (info, results, [[prototype]])

/* Vanilla format */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  }); */

/* Vanilla format, explained */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json()) // this line seems to tell the code to read the code in .json format.
  .then((data) => {
    console.log(data);
  }); // This line tells the code to do something. Only the part in {} should be modifiable. */

/* Narrowing down output to 'data.results'. Note that 'results' is a subset of 'data'. And note that 'data' is an arbitrary name defined in the antecedent of the function. */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
  }); */

/* This pulls up more specific data: 
(a) Logs data.results
(b) for all elements of the array, log first name. */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const users = data.results;
    for (var x = 0; x < users.length; x++) {
      const user = users[x];
      console.log(user.name.first);
    }
  }); */

/* This pulls up more specific data: 
(c) Log both first AND last name */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const users = data.results;
    for (var x = 0; x < users.length; x++) {
      const user = users[x];
      console.log(user.name.first, user.name.last);
    }
  }); */

/* How to put this data into an html table: 
  https://www.youtube.com/watch?v=J3iH2pc2q0s ~52.00, the function
  
  */

let allUsers = [];
let table = document.getElementById("table");

// This fetches all the data from the api, and runs a function on it. The function is tableMaker()

fetch("https://randomuser.me/api/?results=50")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.results);
    allUsers = data.results;
    tableMaker(allUsers);
  });

// The tableMaker() function.
// Variable structure: [ (4) table [ (3) tableHTML [(1) allMarkup [ (2) markup]]]]
/* First, create variable allMarkup.
Second, loop through all user data, and create a table, filling in specified data.
Third, add above data to variable allMarkup.
Fourth, create variable tableHTML, and add table structure to it. 
Fifth, include allMarkup in tableHTML.*/
function tableMaker(allUsers) {
  let allMarkup = "";
  for (var x = 0; x < allUsers.length; x++) {
    let user = allUsers[x];
    // console.log(user.name.first, user.name.last);
    let markup = `<tr>
    <td> ${user.gender} </td>
    <td> ${user.dob.age} </td>
    <td> ${user.name.first} </td>
    <td> ${user.name.last} </td>
    <td> ${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode} </td>
    <td><img src="https://countryflagsapi.com/png/${user.nat}" width="50" height="25" /></td>
    
    <tr>`;
    // console.log(markup);
    allMarkup += markup;
  }

  let tableHTML = `
  <thead>
  <tr>
  <td>Gender:</td>
  <td>Age:</td>
  <td>First Name:</td>
  <td>Last Name:</td>
  <td>Address:</td>
  <td>Flag:</td>
  </tr>
  </thead>
  <tbody>${allMarkup}</tbody>
  `;
  table.innerHTML = tableHTML;
}

//Table is finished above. Below, you will add additional selection functionality.
// Gender select: Male

male.addEventListener("click", function (event) {
  table.innerHTML = "";
  userSubset = [];
  for (i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    if (user.gender === "male") {
      // console.log(user.gender + user.name.first + user.name.last);
      userSubset.push(user);
      tableMaker(userSubset);
    }
  }
});

// Gender select: female

female.addEventListener("click", function (event) {
  table.innerHTML = "";
  userSubset = [];
  for (i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    if (user.gender === "female") {
      // console.log(user.gender + user.name.first + user.name.last);
      userSubset.push(user);
      tableMaker(userSubset);
    }
  }
});

// Gender select: both

both.addEventListener("click", function (event) {
  table.innerHTML = "";
  userSubset = [];
  for (i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    userSubset.push(user);
    tableMaker(userSubset);
  }
});

// Reset Button

resetButton.addEventListener("click", function (event) {
  table.innerHTML = "";
  userSubset = [];
  for (i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    userSubset.push(user);
    tableMaker(userSubset);
  }
});

// Clear Button

clearButton.addEventListener("click", function (event) {
  table.innerHTML = "";
});

// AARP Button

aarpButton.addEventListener("click", function (event) {
  table.innerHTML = "";
  userSubset = [];
  for (i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    if (user.dob.age >= 50) {
      userSubset.push(user);
      tableMaker(userSubset);
    }
  }
});

/* My search function. Based on Zintis'. I read Zintis' code (~1.06), interpreted its function, and tried to rebuild the function myself. */

search.addEventListener("keyup", function (event) {
  console.log(event.target.value);
  let inputText = event.target.value.trim();
  if (inputText !== "") {
    table.innerHTML = "";
    let userSubset = [];
    for (i = 0; i < allUsers.length; i++) {
      let user = allUsers[i];
      let userFullName = user.name.first + " " + user.name.last;
      if (userFullName.includes(inputText)) {
        userSubset.push(user);
      }
    }
    tableMaker(userSubset);
  } else {
    tableMaker(allUsers);
  }
});

/*
= Flag idea =
* There's an API that lets you do this. https://www.countryflagsapi.com/
* It offers a very convenient nationality format (ISO-2) in common with the nationality code in the person array api.
* I want to make it toggleable.

ASSIGNMENTS:
...or have clickable buttons on top for countries of origin. Click the button, show all results from country of origin. Or a button that shows all phone numbers.
    * Everything I've read about this suggests I need jquery for it. Can I do it without?
    * I had an idea involving injecting template literal code that created or deleted table columns in html.

*/
