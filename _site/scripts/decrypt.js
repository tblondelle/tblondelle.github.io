$(function () {

    // Conf Youtube : https://speakerdeck.com/engelke/cryptography-in-the-browser
    // Mozilla : https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
    // w3 : https://www.w3.org/TR/WebCryptoAPI/#examples-section

    var username = $('#username');
    var password = $('#password');
    var enter = $('#Enter');



    $("#authentification").submit(function (e) {
        e.preventDefault();
    });

    
    enter.on("click", function () {
        var aesKeyBytes = mdpbytesToAesKeyBytes(mdpToNb(username.val() + password.val()));

        function mdpToNb(mdp) {
            var mdpBytes = new Uint8Array(16);
            for (var i = 0; i < mdp.length; i++) {
                mdpBytes[i] = mdp[i].charCodeAt(0);
            }
            return mdpBytes;
        }

        function mdpbytesToAesKeyBytes(mdpbytes) {
            var aesKeyBytes = new Uint8Array(16);
            var o = [133, 110, 208, 92, 250, 112, 76, 83, 195, 40, 150, 127, 159, 218, 205, 75];
            for (var i = 0; i < mdpbytes.length; i++) {
                aesKeyBytes[i] = (o[i] + mdpbytes[i]) % 255;
            }
            return aesKeyBytes;
        }



        var webcrypto = window.crypto || window.msCrypto || window.webkitCrypto || window.mozCrypto;
        var iv = new Uint8Array([170, 85, 90, 80, 46, 17, 226, 26, 164, 248, 57, 27, 7, 59, 171, 5]);
        var textHiddenBytes = new Uint8Array([129,175,60,226,5,17,155,222,150,205,120,206,246,231,66,18,57,115,234,3,165,144,64,56,145,13,210,70,57,25,153,172,143,0,41,123,80,115,58,162,141,175,162,82,155,35,102,248,123,34,183,228,252,186,174,133,180,21,234,117,239,151,49,122,132,226,0,251,247,2,211,125,97,105,116,244,174,63,169,1,151,213,152,206,41,100,138,209,119,6,23,3,250,146,235,29,251,224,223,63,179,9,88,18,221,189,132,119,229,222,84,44,217,180,34,170,95,119,235,97,161,59,75,147,26,163,98,249,21,65,155,223,117,141,200,70,103,130,43,39,54,2,208,79,68,91,150,38,186,148,194,82,160,176,124,170,58,128,13,8]);

        function hexStringToByteArray(hexString) {
            console.log("hexString", hexString);
            if (hexString.length < 9) {
                throw "hexString has length < 9";
            }

            if (hexString.length % 2 !== 0) {
                throw "Must have an even number of hex digits to convert to bytes";
            }
            var numBytes = hexString.length / 2;
            var byteArray = new Uint8Array(numBytes);
            for (var i = 0; i < numBytes; i++) {
                byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
            }
            return byteArray;
        }

        function byteArrayToHexString(byteArray) {
            var decryptedString = "";
            for (var i = 0; i < byteArray.byteLength; i++) {
                decryptedString += String.fromCharCode(byteArray[i]);
            }
            return decryptedString;
        }





        var importedAesKey;
        var decryptedBytes;

        window.crypto.subtle.importKey(
            "raw", // Exported key format
            aesKeyBytes, // The exported key
            {
                name: "AES-CBC",
                length: 128
            }, // Algorithm the key will be used with
            true, // Can extract key value to binary string
        ["encrypt", "decrypt"] // Use for these operations
        ).then(function (key) {
            importedAesKey = key;
        }).then(function () {
            window.crypto.subtle.decrypt({
                    name: "AES-CBC",
                    iv: iv
                }, // Same IV as for encryption
                importedAesKey, // The key to use
                textHiddenBytes // Data to decrypt
            ).then(function (result) {
                decryptedBytes = new Uint8Array(result);
                //alert(byteArrayToHexString(decryptedBytes));
                replace__All(byteArrayToHexString(decryptedBytes));
            }).catch(function (err) {
                alert("Problem decrypting: " + err.message);
                console.log(err)
            });
        }).catch(function (err) {
            alert("Something went wrong: " + err.message);
        });
    });

    
    function replace__All(html) {
        $('body').empty()
        $('body').append(html);
    };
});