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

function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex   = page * itemsPerPage;

   let listUL = document.getElementsByClassName('student-list')[0];
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
   // stores it in pageButtons
let pageButtons = document.getElementsByClassName('link-list')[0]; 

/*
Creates the `addPagination` function
creates and inserts/appends the elements needed for the pagination buttons
*/

function addPagination(list) {
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
      // ul element stored in pageButtons 
      pageButtons.insertAdjacentHTML('beforeend', li);

      // on first iteration, or creation of the first button
      // set the first button's class to 'active'
      if(i == 1) {
         pageButtons.firstElementChild.className = 'active';
         console.log('it works');
      }
   }
}

// Call functions showPage & addPagination 
// to add pagination buttons and display first nine
// students onto the page
showPage(data, 1);
addPagination(data);

// adds event listener to ul element inside pageButtons
// to listen for click events on the buttons
pageButtons.addEventListener('click', (e) => {
   // checks if target is button
   if(e.target.tagName === 'BUTTON') {
      // console.log('it works');
      // gets button element clicked & stores it in button 
      let button = e.target;
      // sets activeLi to the list element containing the 'active' class
      let activeLi = pageButtons.getElementsByClassName('active')[0];
      // sets the className of the list element in activeLi to an empty string
      activeLi.className = '';
      // sets buttonLi to the li parent element of the button that was clicked
      let buttonLi = button.parentElement;
      // gives li parent of clicked button the 'active' class
      buttonLi.className = 'active';
      // stores page # of on the button by getting the text contents of button
      let pageNum = button.textContent;
      // calls function showPage with array of student data objects & the page #
      // this function will display a new set of students on the page
      showPage(data, pageNum);
   }
});

