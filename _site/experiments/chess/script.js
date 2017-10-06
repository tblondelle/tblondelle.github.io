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

    function retrieve_content() {
        if (localStorage.getItem("positions")) {
            console.log(1);
            return JSON.parse(localStorage.getItem("positions"));
        } else {
            console.log(0);
            return [board.fen()];
        }   
    };

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

    var positions = retrieve_content();
    
    var board = ChessBoard('board', {
        position: positions[positions.length - 1],
        showNotation: false,
        draggable: true,
        onDrop: onDrop,
    });

    



});
