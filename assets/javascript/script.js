// This function runs all the bottom functions when the page loads
$(function () {
  $('.saveBtn').on('click', saveTask);
  updateTasks();
  updateTime();
  loadTasks();
  // Load tasks from local storage and update tasks and time at regular intervals (1 minute).
  setInterval(() => {
    updateTasks();
    updateTime();
  }, 1000 * 60);

});

// Function to save a task in local storage based on the clicked button.
  function saveTask(event) {
    // Find the parent element of the clicked button.
    var timeBlock = $(event.target).parent();
    if (timeBlock.is('button')) {
      timeBlock = timeBlock.parent();
    }
    console.log(timeBlock);
    var task = timeBlock.find('.description').val();
    var time = timeBlock.attr('id');
    // Store the task in local storage with the associated time as the key.
    localStorage.setItem(time, task);
  }

  // Function to update the visual representation of tasks on the page.
  function updateTasks() {
    var currentHour = dayjs().hour();
    // Log the current hour for debugging purposes.
    console.log(currentHour);
    // Iterate through each time block on the page.
    $('.time-block').each(function () {
      // Extract the hour from the time block's ID.
      var hour = parseInt($(this).attr('id').split('-')[1]);
      // Update the time block's class based on its relation to the current hour.
      if (hour < currentHour) {
        $(this).removeClass('present');
        $(this).removeClass('future');
        $(this).addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past');
        $(this).removeClass('future');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  }

  // Function to update the displayed current date and time on the page.
  function updateTime() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
  }

  // Function to load tasks from local storage and display them in the corresponding time blocks.
  function loadTasks() {
    $('.time-block').each(function () {
      // Retrieve the time and associated task from local storage.
      var time = $(this).attr('id');
      var task = localStorage.getItem(time);
      if (task) {
        $(this).find('.description').val(task);
      }
    });
  }
 