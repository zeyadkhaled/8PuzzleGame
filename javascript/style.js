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

    //pick image
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

    // game functions
    var tiles = [];
    var img = "url(img/" + (2) + ".jpg) no-repeat";
    var num = 0;
    var emptyTile = {
        left: 10,
        top: 10,
        row: 0,
        col: 0
    };
    for (var row = 0; row < 3; row++) {
        for (var column = 0; column < 3; column++) {
            if (row == 0 && column == 0) continue;
            (column > 0) ? leftMargin = (column + 1) * 10 : leftMargin = 10;
            (row > 0) ? topMargin = (row + 1) * 10 : topMargin = 10;

            tiles.push(
                {
                    left: column * 150 + leftMargin,
                    top: row * 150 + topMargin,
                    btop: -row * 150,
                    bleft: -column * 150,
                    data: num,
                    current: num++,
                    backgroundImage: img,
                    opacity: 1,
                    row: row,
                    col: column
                });
        }
    }

    var createBoard = function () {
        var ul = $("ul").empty();

        $(tiles).each(function (index) {
            // var correct = index + 1 === this.data;
            // var cssClass = (this.data === 0) ? "empty" : (correct ? "correct" : "incorrect");



            // if (cssClass !== "empty") {
            //     li.css(
            //         {
            //             "background": img,
            //             "background-position": (tiles[index].bleft + "px " + tiles[index].btop + "px")
            //         });
            // }
            var li = $("<li id='" + tiles[index].data + "'>");
            li.css(
                {
                    "background": img,
                    "background-position": (tiles[index].bleft + "px " + tiles[index].btop + "px")
                });

            li.css({
                "top": tiles[index].top + "px ",
                "left": + tiles[index].left + "px"
            });

            // li.addClass(cssClass);
            ul.append(li);
        });
    }();

    var immovables = [];
    var getImmovables = function () {
        immovables = [];
        for (var i = 1; i < tiles.length; i++) {
            // if ( i % 3 == 0)
            //     console.log("\n");  
            // console.log("[" + tiles[i].row + "]" + "[" + tiles[i].col + "]");
            if (Math.abs(tiles[i].row - emptyTile.row) + Math.abs(tiles[i].col - emptyTile.col) !== 1)
                immovables.push(tiles[i]);
            console.log(tiles[emptyTile]);
        }
    };

    var isMovable = function (index) {
        return !immovables.includes(tiles[index]);
    };

    var changeOpacity = function (opacity) {
        immovables.forEach(function (item, i) {
            $("#" + immovables[i].data).css("opacity", opacity);

        });
    };

    $("ul").on("mouseenter", function () {
        getImmovables();
        changeOpacity(0.5);
    }).on("mouseleave", function () {
        changeOpacity(1);
    });

    $("#game ul").on('click', 'li', function () {
        index = $(this).index();
        shiftTiles(index);
    });




    var shiftTiles = function (pressed) {

        var a = isMovable(pressed);

        if (a) {
            $("#" + pressed).animate({
                "top": emptyTile.top,
                "left": emptyTile.left,
            }, 1000);

            // $("#0").animate({
            //     "top" : tiles[pressed].top,
            //     "left" : tiles[pressed].left,                
            // }, 1000);

            console.log("Empty Tile: " + emptyTile.row + "," + emptyTile.col);
            console.log("Pressed Tile: " + tiles[pressed].row + "," + tiles[pressed].col);

            var tempRow = emptyTile.row;
            var tempCol = emptyTile.col;
            var tempTop = emptyTile.top;
            var tempLeft = emptyTile.left;

            emptyTile.row = tiles[pressed].row;
            emptyTile.col = tiles[pressed].col;
            emptyTile.top = tiles[pressed].top;
            emptyTile.left = tiles[pressed].left;

            tiles[pressed].row = tempRow;
            tiles[pressed].col = tempCol;
            tiles[pressed].top = tempTop;
            tiles[pressed].left = tempLeft;


            console.log("Empty Tile: " + emptyTile.row + "," + emptyTile.col);
            console.log("Pressed Tile: " + tiles[pressed].row + "," + tiles[pressed].col);

        }
    };
});

