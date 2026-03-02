$(document).ready(function () {
  $(".menu-icon").on("click", function () {
    $(this).toggleClass("rotate");
    $(".menu-wrapper").toggleClass("active");
    $(".menu").toggle();
  });
  $(".menu-icon").on("keypress", function () {
    $(this).toggleClass("rotate");
    $(".menu-wrapper").toggleClass("active");
    $(".menu").toggle();
  });
  $(".artwork-menu-text").on("click", function () {
    $(".artwork-sublinks").toggleClass("active");
    $(".artwork-sublinks").toggle();
  });
  $(".other-works-menu-text").on("click", function () {
    $(".other-works-links").toggleClass("active");
    $(".other-works-links").toggle();
  });
});
