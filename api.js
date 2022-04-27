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
    // console.log(data);
    console.log(data.results);
    allUsers = data.results;
    tableMaker(allUsers);
  });

// The tableMaker() function.

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
  </tr>
  </thead>
  <tbody>${allMarkup}</tbody>
  `;
  table.innerHTML = tableHTML;
}

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
    if (user.dob.age >= 49) {
      userSubset.push(user);
      tableMaker(userSubset);
    }
  }
});

/* My search */

/* Zintis' version, pauses around 1:06

search.addEventListener("keyup", function (event) {
  console.log(event.target.value);
  let inputText = event.target.value.trim(); // This removes whitespace for easy search
  if (inputText != "") {
    // If input text has something in it
    table.innerHTML = "";
    let userSubset = [];
    for (i = 0; i < allUsers.length; i++) {
      let user = allUsers[i];
      let userFullName = user.name.first + " " + user.name.last;
      if (userFullName.includes(inputText)) {
        console.log(userFullName);
        userSubset.push(user);
      }
    }
    tableMaker(userSubset);
  } else {
    tableMaker(allUsers);
  }
});
 */

/* Explanation:

On a keyboard event, store the text input. If there is any text in the input window, create a blank html table and a blank list of users, to be filled in later.

Create a list of user search data (to run the search against). This is done to avoid complications with character casing.

If a user search item contains the text input, push it to the array, and make a display table with the array. If not, show all empty results.

*/

/* Flag idea
* There's an API that lets you do this. https://www.countryflagsapi.com/
* It offers a very convenient nationality format (ISO-2) in common with the nationality code in the person array api.
* I want to make it toggleable.

*/
