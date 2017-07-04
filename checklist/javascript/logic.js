$(function() {
  var $item = $('#item');
  var $quantity = $('#quantity');
  var $list = $('#list');
  var $form = $('form')

  $form.on('submit', function(e) {
    e.preventDefault();

    $list.append('<li>' + $quantity.val() + ' ' + $item.val() + '</li>');
    $form.get(0).reset();
  })
});