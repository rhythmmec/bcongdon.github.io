// window.addEventListener("scroll", function() {
//     if (window.scrollY > 400) {
//         $('.navbar').fadeIn();
//     }
//     else {
//         $('.navbar').fadeOut();
//     }
// },false);

// $(document).ready(function(){
// 	if (window.scrollY < 400) {
//         $('.navbar').hide();
//     }
// });

$(function() {
  $('a').click(function() {
    var href = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(href).offset().top - 80
    }, 500);
    return false;
  });
});
