$(function() {
  setTab(localStorage.getItem("tab"));
  setColor(localStorage.getItem("color"));
  setText(localStorage.getItem("text"));

  $("nav").on("click", "a", function(e) {
    e.preventDefault();
    var idx = $(e.target).closest("li").index();
    setTab(idx);
    localStorage.setItem("tab", idx);
  });

  $("form").on("change", ":radio", function(e) {
    e.preventDefault();
    var color = $(e.target).val();
    setColor(color);

    localStorage.setItem("color", color);
  });

  $(window).on("unload", function(e) {
    var text = $("textarea[name='note']").val();
    localStorage.setItem("text", text);
  });

  function setText(text) {
    $("textarea[name='note']").text(text);
  }

  function setColor(color) {
    $("body").css({
      background: color
    });

    $("form").find("input[value='" + color + "']").prop("checked", true);
  }

  function setTab(idx) {
    var $anchors = $("nav").find("a");
    $anchors.removeClass("active");
    $anchors.eq(idx).addClass("active");
    $("#tabs").find("article").hide().eq(idx).show();
  }
});