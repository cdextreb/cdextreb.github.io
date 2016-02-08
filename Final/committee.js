
  $(function() {

  $(".thumbnail").on("click", function(event) {
    event.preventDefault();
    var elementThatWasClicked = $(this);
    console.log(elementThatWasClicked);
    elementThatWasClicked.parent().remove();
  })

})


$(document).ready(function(e) {
    $('.element').each(function() {
        $(this).mouseover(function() {
            $(this).addClass('active');
          $('.stage').children('.element').not('.active').addClass('inactive');
        });
        $(this).mouseleave(function() {
            $(this).removeClass('active');
            $('.stage').children('.element').not('.active').removeClass('inactive');
        });
    });
});
  