/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

let itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let listUL = document.getElementsByClassName('student-list')[0];

function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex   = page * itemsPerPage;

   listUL.innerHTML = '';

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         let li = `<li class="student-item cf">
                     <div class="student-details">
                     <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                     <h3><${list[i].name.title} ${list[i].name.first} ${list[i].name.last}/h3>
                     <span class="email">${list[i].email}</span>
                     </div>
                     <div class="joined-details">
                     <span class="date">Joined ${list[i].registered.date}</span>
                     </div>
                  </li>`;
         listUL.insertAdjacentHTML('beforeend', li);
      }
   }
}


// gets the ul element with the class link-list
   // stores it in pageButtonsUL
const pageButtonsUL = document.getElementsByClassName('link-list')[0]; 

/*
Creates the `addPagination` function
creates and inserts/appends the elements needed for the pagination buttons
*/

function addPagination(list) {
   // clears any existing pagination buttons
   pageButtonsUL.innerHTML = '';

   // calcs number of pages needed based on length of list array argument
   // stores result in numPages
   let numPages = Math.ceil(list.length / 9);

   // loops over the number of pages 
   for(let i = 1; i <= numPages; i++) {
      // creates html list element as a template literal
      // with a button element as a child
      // and stores the result in li
      let li = `<li>
                  <button type="button">${i}</button>
               </li>`; 
      // inserts li HTML element created above to the
      // ul element stored in pageButtonsUL 
      pageButtonsUL.insertAdjacentHTML('beforeend', li);
   }
   // sets css class of first pagination button to 'active' to highlight it
   pageButtonsUL.firstElementChild.firstElementChild.className = 'active';    
}


// Calls functions showPage & addPagination 
// to add pagination buttons and display first nine
// students onto page
showPage(data, 1);
addPagination(data);

/**
 * CREATES AND APPENDS SEARCH BOX WITH SEARCH BUTTON TO THE PAGE
 */

// sets searchLabel to a newly created label element  
const searchLabel = document.createElement('label');
// sets for attribute of the element in searchLabel to "search"
searchLabel.setAttribute('for', 'search');
// sets class of label element in searchLabel to "student-search"
searchLabel.className = 'student-search';

// creates a new input element and stores it in searchBox
const searchBox = document.createElement('input');
// sets id attribute of element in searchBox to "search"
searchBox.setAttribute('id', 'search');
// sets placeholder attribute of element in searchBox to 'Search by name...'
searchBox.setAttribute('placeholder', 'Search by name...');

// appends input element in searchBox to label element in searchLabel
searchLabel.appendChild(searchBox);

// creates button element and sets its type attribute to button
const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'button');

// creates an img element 
const searchImage = document.createElement('img');
// sets src and alt attributes of these elements to strings 
// passed in as second arguments to the method setAttribute  
searchImage.setAttribute('src', "img/icn-search.svg");
searchImage.setAttribute('alt', "Search icon");

// appends image element to the button element (both created above)
searchButton.appendChild(searchImage);

// appends button element as the second child of the label element 
searchLabel.insertAdjacentElement("beforeend", searchButton);

// gets header element on page and stores it in the variable header
const header = document.getElementsByClassName('header')[0];
// appends label element in searchLabel to header element in header
header.appendChild(searchLabel);

// adds event listener to ul element inside pageButtonsUL
// to listen for click events on the buttons
pageButtonsUL.addEventListener('click', (e) => {
   // checks if target is button
   if(e.target.tagName === 'BUTTON') {
      // gets button element clicked & stores it in button 
      const button = e.target;
      // sets activeButton to the button element containing the 'active' class
      // there should be only one button with active class 
      const activeButton = pageButtonsUL.getElementsByClassName('active')[0];
      // sets the className of the button element in activeButton to an empty string
      activeButton.className = '';
      // sets clicked button element's class name to active to highlight it 
      button.className = 'active';
      // sets pageNum of button by getting the text contents of button element
      const pageNum = button.textContent;
      // calls function showPage with array of student data objects & the page #
      // this function will display a new set of students on the page
      if(searchBox.value) {

      }
      else {
         showPage(data, pageNum);
      }
   }
});

/**
 * ADDS 'KEYUP' EVENT LISTENER TO SEARCH BOX & 'CLICK' EVENT LISTENER TO SEARCH BUTTON 
 */

 // adds 'click' event listener to search button
 searchButton.addEventListener('click', (event) => {
   // empty array for storing student objects whose first and/or last property of the name object 
   // property match the query entered by the user
   const matchedStudents = [];
   // takes string value entered in searchBox input element, converts it to lowercase, 
   // removes leading & trailing whitespaces if any & stores it in queryString 
   const queryString = searchBox.value.toLowerCase().trim();
   // splits input query string by space into an array of words 
   const queryArray = queryString.split(' ');
   // loops through student objects in data array
   for(const student of data) {
      // gets first & last name properties of current student object
      // as strings & converts them to lower case
      const firstName = student.name.first.toLowerCase();
      const lastName  = student.name.last.toLowerCase();
      // if the array of query words (entered in search bar) match the first and last name 
      // properties of the current student object
      if(queryArray.includes(firstName) || queryArray.includes(lastName)) {
         // add current student object to matchedStudents array
         matchedStudents.push(student);
      }
   }
   addPagination(matchedStudents);
   showPage(matchedStudents, 1);
 });

 // adds keyup event listener to input element 
 searchBox.addEventListener('keyup', (event) => {
   const matchedStudents = [];
   const queryString = searchBox.value.toLowerCase();
   for(const student of data) {
      const firstName = student.name.first.toLowerCase();
      const lastName = student.name.last.toLowerCase();
      const fullName = firstName + ' ' + lastName;
      if( fullName.includes(queryString) ) {
         matchedStudents.push(student);
      }
   }
   if(matchedStudents.length != 0) {
      addPagination(matchedStudents);
      showPage(matchedStudents, 1);
   }
   else {
      pageButtonsUL.innerHTML = '';
      listUL.innerHTML = '';
   }
 });

 