$("#header").addClass("animate__animated animate__bounceInDown");
$("main > div").addClass("animate__animated animate__bounceInUp");
$(".btn").addClass("animate__animated animate__pulse animate__infinite infinite");

$("#header").on("animationend", function(event) {
    if(event.originalEvent.animationName == "bounceInDown") {
        $("#header").removeClass("animate__bounceInDown");
        $("#header").addClass("animate__tada");
    }
});