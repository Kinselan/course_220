var posts = [];

var post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<b>Sed ut perspiciatis</b> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  tags: ["coffee", "tea", "chocolate"]
};

posts.push(post);

var post2 = {
  title: 'Lorem',
  published: 'April 1, 2215',
  body: '<b>Sed ut perspiciatis</b> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
};

posts.push(post2);




$(function() {
  Handlebars.registerPartial("tag", $("#tag").html());

  var postHTML = $("#post").html(); 
  var postTemplate = Handlebars.compile(postHTML);
  $("body").append(postTemplate({ posts: posts }));  
});

