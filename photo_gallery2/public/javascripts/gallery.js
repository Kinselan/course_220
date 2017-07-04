$(function() {
  var templates = {},
      photos,
      $partial = $("[data-type='partial']");

  Handlebars.registerPartial($partial.attr("id"), $partial.html());

  $("script[type='text/x-handlebars']").each(function(i, script) {
    script = $(script);
    templates[script.attr("id")] = Handlebars.compile(script.html());
  });

  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      setPhotos();
      setPhotoInformation(1);
      getCommentsFor(photos[0].id);
    }
  });

  $("a.prev").on("click", function(e){
    e.preventDefault();
    var $current = $("#slides").find("figure:visible");
    var $prev = $current.prev();
    if (!$prev.length) {
      $prev = $("#slides figure").eq(-1);
    }
    $current.fadeOut(500);
    $prev.fadeIn(500);

    setPhotoInformation(+$prev.attr("data-id"));
    getCommentsFor($prev.attr("data-id"));
  });


  $("a.next").on("click", function(e){
    e.preventDefault();
    var $current = $("#slides").find("figure:visible");
    var $next = $current.next();
    if (!$next.length) {
      $next = $("#slides figure").eq(0);
    }
    $current.fadeOut(500);
    $next.fadeIn(500);

    setPhotoInformation(+$next.attr("data-id"));
    getCommentsFor($next.attr("data-id"));
  });

  $("section > header").on("click", ".actions a", function(e) {
    e.preventDefault();
    var $anchor = $(e.target),
        photo_index = $("#slides").find("figure:visible").index(),
        current_photo = photos[photo_index];

    $.ajax({
      url: $anchor.attr("href"),
      type: "POST",
      data: "photo_id=" + $anchor.attr("data-id"),
      success: function(json) {
        $anchor.text(function(i, txt) {
          return txt.replace(/\d+/, json.total);
        });

        current_photo[$anchor.attr("data-property")] = json.total; 
      }
    })
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    debugger;
    $.ajax({
      url: "/comments/new",
      type: "POST",
      data: $(this).serialize(),
      success: function(json) {
        debugger;
        $("#comments ul").append(templates.comment(json));
        $("form").get(0).reset();
      }
    })
  })

  function setPhotos() {
    $("#slides").html(templates.photos({ photos: photos }));
  }

  function setPhotoInformation(id) {
    $("[name='photo_id']").val(id);

    photo = photos.filter(function(obj) {
      return obj.id === id;
    });
    var info = templates.photo_information(photo[0]);
    $("section > header").html(info);    
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: "comments",
      data: "photo_id=" + idx,
      success: function(json_comment) {
        var cmt = templates.comments({ comments: json_comment });
        $("#comments ul").html(cmt);
      }
    })
  }
  

})