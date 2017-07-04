$(function() {
  function getFormObject($f) {
    var o = {};

    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });

    return o;
  }

  function createElement(data) {
    var $d = $("<div />", {
      "class": data.shape,
      data: data
    });

    resetElement($d);

    return $d;
  }

  function resetElement($e) {
    var data = $e.data();

    $e.css({
      left: +data.start_x,
      top: +data.start_y
    });
  }

  function stopAnimations() {
    $("#container").find("div").stop();
  }

  function animateElement() {
    var $e = $(this),
        data = $e.data();

    resetElement($e);

    $e.animate({
      left: +data.end_x,
      top: +data.end_y
    }, +data.duration);
  }

  $("form").on("submit", function(e) {
    e.preventDefault();
    var $f = $(this),
        data = getFormObject($f);

    $("#container").append(createElement(data));
  });

  $("#animate").on("click", function(e) {
    e.preventDefault();

    $("#container").find("div").each(animateElement);
  });

  $("#stop").on("click", function(e) {
    e.preventDefault();

    stopAnimations();
  })
})