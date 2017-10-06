$(function () {

    var new_button = $('#new_button'),
        undo_button = $('#undo_button'),
        save_button = $('#save_button'),
        positions;

    var onDrop = function (source, target, piece, newPos, oldPos, orientation) {
        positions.push(newPos);
        save_content(positions);
    };

    function save_content(positions) {
        localStorage.setItem("positions", JSON.stringify(positions));
        console.log(JSON.stringify(positions));
    }

    new_button.click(function () {
        board.start();
        positions = [board.fen()];
        save_content(positions);
    });

    undo_button.click(function () {
        if (positions.length > 1) {
            positions.splice(positions.length - 1, 1);
            board.position(positions[positions.length - 1]);
            save_content(positions);
        }
    });

    // Retrieve old positions or start new board.
    if (localStorage.getItem("positions")) {

        var positions = JSON.parse(localStorage.getItem("positions")),
            board = ChessBoard('board', {
                position: positions[positions.length - 1],
                showNotation: false,
                draggable: true,
                onDrop: onDrop,
            });

    } else {
        var board = ChessBoard('board', {
                position: 'start',
                showNotation: false,
                draggable: true,
                onDrop: onDrop,
            }),
            positions = [board.fen()];
    }
});
