$(function() {
  var $blinds = $("[id^=blind]"),
      speed = 250,
      delay = 1500;


  function startAnimation() {
    $blinds.each(function(i, blind) {
      var $blind = $(blind);
      $blind.delay(delay * i + speed).animate({
        top: "+=" + $blind.height(),
        height: 0
      })
    });    
  }
  startAnimation();

  $("#reset").on("click", function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr("style");
    startAnimation();
  })
})