$(document).ready(function () {
  $('li').css('margin', '10px');
  $('li').attr('id', 'uw');

  $('#p1 li').click(function () {
    console.log("$(this):" + $(this));
    $(this).fadeOut(2000, function () {
      console.log("fadeout complete!")
    });
  });
});