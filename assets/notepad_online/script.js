$(function () {

    
    
    if (typeof (Storage) == "undefined") {
        alert("Sorry! The content will not be stored when you leave this page.");
    }

    var store = $('#save');
    var retrieve = $('#retrieve');
    var te = $('#te');
    var snackbar = document.querySelector('.mdl-snackbar');
    var linenumber = $("#linenumber");

    te.focus();

    store.click(function () {
        save_content();
        var data = {
            message: "'" + te.val().substr(0, 30) + "...'" + " saved.",
            timeout: 1000
        };
        snackbar.MaterialSnackbar.showSnackbar(data);

    });

    retrieve.click(retrieve_content);

    linenumber.click(function () {
        alert("Everything you write is stored locally on your browser. Every 20 seconds, it is automatically saved. You can still save it manually of course.")
    });

    function save_content() {
        localStorage.setItem("content", te.val());
    }
    
    function retrieve_content(){
        te.val(localStorage.getItem("content"));
    };

    setInterval(save_content, 10000);
    retrieve_content();

});
