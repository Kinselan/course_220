$(function() {


  $("main > h1").prependTo($("body > header"));

  $("header").prependTo(document.body);

  var $chin = $("img[src*=chin]");
  var $baby = $("[src*=baby]");

  $("#content").find("figure").first().prepend($chin);
  $("#content").find("figure").last().prepend($baby);

  $("#content").find("figure").appendTo($("#content > article"));
})

///images/chin_stick.jpg