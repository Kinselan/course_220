$(function() {
  var $slideshow = $("#slideshow")
      $nav = $slideshow.find("ul");

  $nav.on("click", "a", function(e) {
    e.preventDefault();

    var $li = $(e.target).closest("li"),
        idx = $li.index();

    $slideshow.find("figure").filter(":visible").fadeOut(300);
    $slideshow.find("figure").eq(idx).delay(300).fadeIn(300);

    $nav.find("li.active").removeClass("active");
    $li.addClass("active");

  })
})