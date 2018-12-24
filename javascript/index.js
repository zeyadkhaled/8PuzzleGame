$(function () {
    //SLIDER
    $("#slider > div:gt(0)").hide();

    setInterval(function () {
        $("#slider > div:first")
            .next()
            .fadeIn(1000)
            .end()
            .appendTo("#slider")
            .hide();
    }, 3000);

    changePage = function (href) {
        $("body").fadeOut(1000, function () {
            window.location = href;
        });
    }

    $(".button").click(function () {
        var href = $(this).find("a").attr("href");

        changePage(href);
    });

    
    
});

