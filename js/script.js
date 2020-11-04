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

// sets listUL to the ul element on the page that will hold each student object
// as a list item
let listUL = document.getElementsByClassName('student-list')[0];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   // computes start and end indices for displaying
   // 1st 9, 2nd, 9, etc. students on the page based on the value 
   // of the integer argument page passed in 
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex   = page * itemsPerPage;
   // clears any existing students on the page
   listUL.innerHTML = '';
   // loops the entire length of the list student object array passed in as argument 
   for(let i = 0; i < list.length; i++) {
      // checks if i is between startIndex & endIndex
      if(i >= startIndex && i < endIndex) {
         // sets li to HTML that presents the data for a student object as a list item
         // to the page
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
         // inserts template literal reprsenting HTML in li to the ul element
         // which holds student data on the page
         listUL.insertAdjacentHTML('beforeend', li);
      }
   }
}


// gets the ul element with the class link-list
   // stores it in pageButtonsUL
   // this ul element will hold buttons for pagination
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
// to listen for click events on its children button elements
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
         showPage(matchedStudents, pageNum);
      }
      else {
         showPage(data, pageNum);
      }
   }
});

/**
 * ADDS 'KEYUP' EVENT LISTENER TO SEARCH BOX & 'CLICK' EVENT LISTENER TO SEARCH BUTTON 
 */

 // empty array for storing student objects whose first and/or last property of the name object 
 // property match the query entered by the user
 let matchedStudents = [];

 // adds 'click' event listener to search button
 searchButton.addEventListener('click', (event) => {
   // takes string value entered in searchBox input element, converts it to lowercase, 
   // removes leading & trailing whitespaces if any & stores it in queryString 
   const queryString = searchBox.value.toLowerCase().trim();
   // clears matched students array so it can be populated with newer 
   // possible matching queries
   matchedStudents = [];
   // loops through student objects in data array
   for(const student of data) {
      // gets first & last name properties of current student object
      // as strings & converts them to lower case
      const firstName = student.name.first.toLowerCase();
      const lastName  = student.name.last.toLowerCase();
      // if the array of query words (entered in search bar) match the first and last name 
      // properties of the current student object
      if(queryString.includes(firstName) || queryString.includes(lastName)) {
         // add current student object to matchedStudents array
         matchedStudents.push(student);
      }
   }
   addPagination(matchedStudents);
   showPage(matchedStudents, 1);
 });

 // adds keyup event listener to input element 
 searchBox.addEventListener('keyup', (event) => {
   // clears matchedStudents array to avoid including matches more than once
   // as user types, each key stroke will trigger this event listener
   matchedStudents = [];
   // sets queryString to the current string in search text field
   // converting it first to lowercase
   const queryString = searchBox.value.toLowerCase();
   // loops through array of student objects
   for(const student of data) {
      // sets fullName to string constructed from the first and last string properties of the name
      // object, which is itself a property of each student object 
      // fullName essentially contains the current student objects first name followed by a space and 
      // the student objects last name 
      const fullName = student.name.first.toLowerCase() + ' ' + student.name.last.toLowerCase();
      // checks if fullName includes the string stored in queryString
      if( fullName.includes(queryString) ) {
         // adds current student object to matchedStudents array
         matchedStudents.push(student);
      }
   }
   // checks if length of matchedStudents array is NOT 0
   // i.e. at least one match occured 
   if(matchedStudents.length != 0) {
      // calls function removeNoResultsDiv which will check to see if a 'No Results Found!'
      // message is displayed on the page from a previous keystroke
      // removes the HTML element containing the message if it exists
      removeNoResultsDiv();
      // calls functions addPagination & showPage with array matchedStudents
      // as argument; these functions display the matching search results to the query of the user 
      // to the page and add pagination buttons for navigating between pages of search results 
      // if they cannot fit on one page i.e. there are more than 9 search results 
      addPagination(matchedStudents);
      showPage(matchedStudents, 1);
   }
   // else ... array matchedStudents is empty
   // i.e. NO matches occurred 
   else {
      // calls function removeNoResultsDiv to remove 'No Results Found!'
      // message from the page, if it exists
      // this call is necessary so that multiple 'No Results Found!'
      // messages don't populate the screen as user continues to type into search box
      removeNoResultsDiv();
      // calls function addNoResultsDiv to 
      addNoResultsDiv();
   }
 });

 // defines function addNoResultsDiv
   // this function clears the UL elements containing the student data
   // and page buttons and then creates and appends a div to the page 
   // containing the message 'No Results Found!'
function addNoResultsDiv() {
   // sets innerHTML of listUL to an empty string
   // clears student data currently being displayed 
   listUL.innerHTML = '';
   // sets innerHTML of pageButtonsUL to an empty string
   // clears pagination buttons from page 
   pageButtonsUL.innerHTML = '';
   // sets noResultsDiv to an template literal which is an HTML div element
   // having id attribute set to 'no-results'
   const noResultsDiv = `<div id='no-results'>No Results Found!</div>`;
   // sets header to the HTML header element object
   const header = document.querySelector('header');
   // inserts div element in noResultsDiv after header element in header
   header.insertAdjacentHTML('afterend', noResultsDiv);
}

// defines function removeNoResultsDiv
   // this function checks to see if a div element having id attribute of 'no-results'
   // exists in the document object; removes it if it does
function removeNoResultsDiv() {
   const noResultsDiv = document.querySelector('#no-results');
   if(noResultsDiv) {
      noResultsDiv.remove();
   }
}

 