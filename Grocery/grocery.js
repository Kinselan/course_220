$(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    var name = $("#name").val(),
        quantity = $("#quantity").val() || 1,
        $li = $("<li />");

    $li.text(quantity + " " + name);
    $("ul").append($li);
    debugger;
    e.target.reset();
  })
})