$(function() {
  var $list = $('#list');
  var $form = $('form');

  $form.on('submit', function(e) {
    e.preventDefault();

    var $item = $(this).find('#item');
    var $quantity = $(this).find('#quantity');

    $list.append('<li>' + $quantity.val() + ' ' + $item.val() + '</li>');
    $form.get(0).reset();
  })
});