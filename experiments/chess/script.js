$(function () {

    var new_button = $('#new_button'),
        undo_button = $('#undo_button'),
        redo_button = $('#redo_button'),
        save_button = $('#save_button');

    var fen_positions,
        step;

    var START_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

    /**
     * A chaque coup joué, on enregistre la positioon dans la variable
     * et on l'enregistre dans le cookie.
     */
    var onDrop = function (source, target, piece, newPos, oldPos, orientation) {
        step = step + 1;
        fen_positions = fen_positions.slice(0, step);
        fen_positions.push(ChessBoard.objToFen(newPos));
        save_content(fen_positions, step);
        //console.log(step, fen_positions);
    };

    function save_content(fen_positions, step) {
        localStorage.setItem("fen_positions", JSON.stringify(fen_positions));
        localStorage.setItem("step", step);
    }

    /*!
     * chessboard.js v0.3.0
     *
     * Copyright 2013 Chris Oakman
     * Released under the MIT license
     * http://chessboardjs.com/license
     *
     * Date: 10 Aug 2013
     */
    function validFen(fen) {
        if (typeof fen !== 'string') return false;

        // cut off any move, castling, etc info from the end
        // we're only interested in position information
        fen = fen.replace(/ .+$/, '');

        // FEN should be 8 sections separated by slashes
        var chunks = fen.split('/');
        if (chunks.length !== 8) return false;

        // check the piece sections
        for (var i = 0; i < 8; i++) {
            if (chunks[i] === '' ||
                chunks[i].length > 8 ||
                chunks[i].search(/[^kqrbnpKQRNBP1-8]/) !== -1) {
                return false;
            }
        }

        return true;
    }

    function check_file_fen_positions(fen_positions_) {
        for (var i = 0; i < fen_positions_.length; i++) {
            if (!validFen(fen_positions_[i])) {
                return false;
            }
        }
        return true;
    }

    new_button.click(function () {
        if (confirm("Do you really want to start over?")) {
            board.start();
            fen_positions = [START_POSITION];
            step = 0;
            save_content(fen_positions, step);
        }
    });

    undo_button.click(function () {
        if (step > 0) {
            step = step - 1;
            //console.log(step, fen_positions);
            board.position(fen_positions[step]);
            save_content(fen_positions, step);
        }
    });

    redo_button.click(function () {
        if (step < fen_positions.length - 1) {
            step = step + 1;
            //console.log(step, fen_positions);
            board.position(fen_positions[step]);
            save_content(fen_positions, step);
        }
    });

    save_button.click(function () {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(fen_positions)));
        element.setAttribute('download', Date.now() + '.chessgame');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    var fileInput = document.querySelector('#file');
    fileInput.addEventListener('change', function () {
        var reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.addEventListener('load', function () {
            new_fen_positions = JSON.parse(reader.result);
            if (check_file_fen_positions(new_fen_positions)) {
                fen_positions = new_fen_positions;
                save_content(fen_positions, step);
                //console.log(fen_positions);
                board.position(fen_positions[fen_positions.length - 1])
            } else {
                alert('File corrupted.')
            }
        });
    });



    // Init the board.
    if (localStorage.getItem("fen_positions") && localStorage.getItem("step")) {
        fen_positions = JSON.parse(localStorage.getItem("fen_positions"))
        step = JSON.parse(localStorage.getItem("step"));
    } else {
        fen_positions = [START_POSITION];
        step = 0;
    }

    board = ChessBoard('board', {
        showNotation: false,
        draggable: true,
        onDrop: onDrop,
    });

    board.position(fen_positions[step]);

});
