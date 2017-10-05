$(function () {

    var new_button = $('#new_button'),
        undo_button = $('#undo_button'),
        save_button = $('#save_button');

    var onDrop = function (source, target, piece, newPos, oldPos, orientation) {
        console.log(newPos);
        positions.push(newPos);
    };

    var board = ChessBoard('board', {
        position: 'start',
        showNotation: false,
        draggable: true,
        onDrop: onDrop,
    });

    var positions = [board.fen()];

    new_button.click(function () {
        board.start();
        positions = [board.fen()];
    });

    undo_button.click(function () {
        if (positions.length > 1) {
            positions.splice(positions.length - 1, 1);
            console.log(positions);
            board.position(positions[positions.length - 1]);
        }
    });

    console.log(positions, positions.length);

});
