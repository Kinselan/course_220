$(function() {
  $("li > a").on("click", function(e) {
    e.preventDefault();

    $(this).next(".modal").css({
      top: $(window).scrollTop() + 100
    })

    var $divs = $(this).nextAll("div").fadeIn(500);

    var $li = $(this).closest("li");
    $li.find(".modal a, .modal_layer").on("click", function(e) {
      e.preventDefault();
      $divs.fadeOut(500);
    })
  });
})