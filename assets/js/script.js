$(function () {

  // Select HTML elements:
  const $currentDay = $('#currentDay'); // Select div to contain current date
  const $saveButtons = $('.saveBtn'); // Select all save buttons
  const $hour = $('.time-block'); // Select time block divs
  let today = dayjs();
  let $currentHour = today.hour();

  // Add current date to top of page
  $currentDay.text(today.format('dddd, MMMM D'));

  // Retrieve all descriptions in local storage then update the textareas with their text
  function updateTaskDesc() {
    $hour.each(function () {
      const hourId = this.id;
      const description = localStorage.getItem(hourId);
      $(this).find(".description").val(description);
    });
  }
  updateTaskDesc();

  // When save button is clicked, save description in textarea into local storage
  $saveButtons.on("click", function() {
    const $hourID = $(this).parent().attr('id');
    const $taskDesc = $(this).siblings(".description").val();
    console.log(`Hour ID: ${$hourID}, description: ${$taskDesc}`); 
    localStorage.setItem($hourID, $taskDesc);
  });


  // Set class for each time block to past, present or future
  function checkTimeState() {
    $hour.each(function () {
      const hourId = this.id;
      const hourIdNumber = parseInt(hourId.substring(5)); // Extract the hour number from the ID
      let hour24Format;

      if (hourIdNumber >= 1 && hourIdNumber <= 5) {
        hour24Format = hourIdNumber + 12;
      } else {
        hour24Format = hourIdNumber;
      }

      if (hour24Format < $currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      } else if (hour24Format === $currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("future");
      }
    });
  }

  checkTimeState();

});
