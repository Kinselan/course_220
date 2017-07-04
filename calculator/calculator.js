$(function() {
  var $answer = $("#answer");

  $("form").on("submit", function(e) {
    e.preventDefault();
    var first = +$("#first").val();
    var second = +$("#second").val();
    var operator = $("#operator").val();

    if (operator === "+") {
      $answer.text(first + second);
    } else if (operator === "-") {
      $answer.text(first - second);
    } else if (operator === "*") {
      $answer.text(first * second);
    } else if (operator === "/") {
      $answer.text(first / second);
    }
  })
})