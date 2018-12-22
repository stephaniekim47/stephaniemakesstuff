$(document).ready(function(){
    $(".menu-icon").on("click", function () {
        $(this).toggleClass("rotate");
        $(".menu-wrapper").toggleClass("active");
        $(".menu").toggle();
    })
    $(".menu-icon").on("keypress", function () {
        $(this).toggleClass("rotate");
        $(".menu-wrapper").toggleClass("active");
        $(".menu").toggle();
    })
});
