$(function () {
    changePage = function (href) {
        $("body").fadeOut(1000, function () {
            window.location = href;
        });
    }

    var imageIndex = -1;
    $("#pics img").click(function () {
        if (imageIndex === -1) {
            $("#buttonHidden").addClass("button");
        }

        $(this).parent().find("img").css("box-shadow", "none");
        $(this).css({ "box-shadow": "0 0 20px rgba(0, 0, 0, 0.5)" }, 300);

        imageIndex = $(this).index();
    });

    $("#buttonHidden").click(function () {
        var href = $(this).find("a").attr("href");

        changePage(href);
    });
});

