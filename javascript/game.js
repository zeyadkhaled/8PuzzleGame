$(function () {
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
            ul.append(li);
        });
    }();

    var immovables = [];
    var getImmovables = function () {
        immovables = [];
        for (var i = 0; i < tiles.length; i++) {
            if (Math.abs(tiles[i].row - emptyTile.row) + Math.abs(tiles[i].col - emptyTile.col) !== 1)
                immovables.push(tiles[i]);
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


            changeOpacity(1);
            getImmovables();
            changeOpacity(0.5);
        }
    };
});

