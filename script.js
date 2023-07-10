
$(function () {
// Click event listener for save button
  $(".saveBtn").on("click", function () {
// Get the user input from the text area
    let userInput = $(this).siblings(".description").val().trim();

// Get the id of the ontaining time-block
    let timeBlockId = $(this).parent().attr("id")

// Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });
  

// Function to update the time block colors
function updateTimeBlockColors() {

  // Get the crrent hour using Day.js
  let currentHour = dayjs().hour();

  // Loop thorugh each time block
  $(".time-block").each(function () {
    let blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the block hour to the current hour and add/remove classes accordingly
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else if (blockHour > currentHour && blockHour <= 17) { //Added this condition for blocks after 5pm
      $(this).removeClass("past present").addClass("future");
    } else { // Add this condition for blocks after 5pm
      $(this).removeClass("past present future");
    }
  });
}


// Function to retrieve saved user input from local storage
function retrieveSavedUserInput() {
  $(".time-block").each(function () {
    let timeBlockId = $(this).attr("id");
    let userInput = localStorage.getItem(timeBlockId);

    // Set the value of the corresponding textarea
    $(this).find(".description").val(userInput);
  });
}

// Display the current date in the header
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// Update time block colors on page load
updateTimeBlockColors();

// Retrieve saved user input on page load
retrieveSavedUserInput();
});
