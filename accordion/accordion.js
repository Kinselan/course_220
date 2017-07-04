$(function() {
  var key,
      $accordion = $("#accordion");

  $("form").on("submit", function(e) {
    e.preventDefault();
    key = $("#key").val();

    $(document).off("keypress");

    $(document).on("keypress", function(e) {
      if (e.key === key) { $("#toggle").trigger("click"); }
    });
  });

  $("#toggle").on("click", function(e) {
    e.preventDefault();
    $accordion.slideToggle();
  })
})