$(window).load(function(){
	var hash = window.location.hash.substring(1);
    var href = document.getElementById(hash)
    $('html, body').animate({
      scrollTop: $(href).offset().top - 50
    }, 500);
    return false;
});

$(function() {
  $('a').click(function() {
    var href = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(href).offset().top - 50
    }, 500);
    return false;
  });
});
