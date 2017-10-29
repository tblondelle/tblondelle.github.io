$(function () {


    var BUTTONS_YES_NO = `<button id="yes_button" class="mdl-button mdl-button--raised mdl-button--accent">Oui</button>
        <button id="no_button" class="mdl-button mdl-button--raised mdl-button--accent">Non</button>`;
    var BUTTON_OK = `<button id="ok_button" class="mdl-button mdl-button--raised mdl-button--accent">OK</button>`;

    var ANIMATION_TIME = 600;

    function generate_range_html(min, max, default_value, unite) {
        return ` <p style="width:300px; margin:auto 0">` + "" + `<input id="slider_range" class="mdl-slider mdl-js-slider" type="range"
  min="` + min + `" max="` + max + `" tabindex="0"><span id='label'><span id='label_value'>` + default_value + `</span>` + unite + `</span></p>` + BUTTON_OK;
    }


    function is_value_in_range(value, range) {
        //console.log(range[0] <= value && value <= range[1]);
        return (range[0] <= value && value <= range[1])
    }


    // variables de parametres
    var diametre = 0,
        viscosite = false,
        humectant = false,
        acidifiant = false;

    // variables de réponses
    var cristaux = false,
        humidite = 20,
        temp = 20,
        cleaner = false,
        pluie = false,
        durete = false,
        duree_courte = false;

    var current_node = "";
    var progress = -1;


    var message = [];

    function ending() {
        bar.animate(1);


        
        $('.question-card').html("");
        $('.card-title').html("Résultats");
        

        $(".result-card").fadeIn(600, function () {
            // Animation complete
        });


        var message = $('.card-propertext')
        message.html("");


        var emulsifiant = 1 - diametre;

        if (cristaux) {
            message.append("<p>La présence de cristaux de cire impose d'augmenter la viscosité du produit pour éviter le rebond des gouttes.</p>");
        }
        if (humidite < 30) {
            message.append("<p>Le faible taux d'humidité impose d'ajouter des humectants pour que le produit s'évapore moins vite.</p>")
        } else if (humectant) {
            message.append("<p>Les conditions climatiques imposent d'ajouter des humectants pour que le produit s'évapore moins vite.</p>");
        }

        if (viscosite) {
            message.append("<p>Pour éviter que les gouttes ne rebondissent, il nous faut aussi diminuer le diamètre de la goutte au contact de la feuille.</p>")
        } else {
            message.append("<p>Pour éviter que les gouttes ne rebondissent, il nous faut diminuer le diamètre de la goutte au contact de la feuille.</p>")
        }

        if (humectant && emulsifiant === 0) {
            message.append("<p>Au vu des conditions météorologiques, comme l'évaporation diminue déjà le diamètre de goutte durant son trajet, nous n'ajoutons pas d'émulsifiants");
        } else if (!humectant && emulsifiant > 0) {
            message.append("<p>Il nous faut donc des émulsifiants pour diminuer le diamètre en sortie de buse.</p>")
        } else if (humectant && emulsifiant > 0) {
            message.append("<p>L'évaporation ne suffit pas à obternir un diamètre assze faible lorsque la goutte arrive sur la feuille, il nous faut donc ajouter des émulsifiants pour augenter le diamètre en sortie de buse.</p>")
        } // Le quatrième cas ne peut pas se produire.

        if (pluie) {
            message.append("<p>Pour éviter que la pluie ne rince le produit, il est conseillé d'y ajouter un produit sticker.</p>")
        }

        if (acidifiant) {
            message.append("<p>L'ajout d'acidifiant empeche que le principe actif ne soit détruit avant d'etre efficace.</p>")
        }

        if (cleaner) {
            message.append('<p>Un tank cleaner vous permettra de mieux nettoyer votre réservoir.</p>')
        }

        if (!duree_courte) {
            message.append("<p>Les différents composants de votre produit risquent de se séparer par décantation. Un dispersant permet d'éviter cela.</p>")
        }








    }

    /**
     *  
     *  HTML QUESTION-CARDS
     *
     */
    var nodes = {
        feuille: {
            title: "Type de feuille",
            text: "Y a t-il des cristaux de cire sur la plante à traiter ?",
            actions: BUTTONS_YES_NO
        },
        humidite: {
            title: "Humidité",
            text: "Indiquez le taux d'humidité localement :",
            actions: generate_range_html(0, 100, 50, '%')
        },
        temperature: {
            title: "Temperature",
            text: "Indiquez la température actuelle :",
            actions: generate_range_html(0, 40, 20, '°C')
        },
        ph: {
            title: "pH",
            text: "Indiquez le pH de l'eau que vous utilisez",
            actions: generate_range_html(0, 14, 7, '')
        },
        vent: {
            title: "Vent",
            text: "Indiquez la vitesse du vent :",
            actions: generate_range_html(0, 19, 10, 'km/h')
        },
        durete: {
            title: "Dureté de l'eau",
            text: "L'eau est-elle riche en ions (calcium, magnésium, fer) ?",
            actions: BUTTONS_YES_NO
        },
        pluie: {
            title: "Pluie",
            text: "Pleut-il souvent lorsque vous pulverisez vos cultures ?",
            actions: BUTTONS_YES_NO
        },
        cleaner: {
            title: "Agents nettoyants",
            text: "Avez-vous du mal à nettoyer votre réservoir après pulvérisation ?",
            actions: BUTTONS_YES_NO
        },
        duree: {
            title: "Conservation",
            text: "Avez-vous l'intention de conserver le mélange moins de deux jours?",
            actions: BUTTONS_YES_NO
        }
    }

    /**
     *  
     *  TREE IMPLEMENTATION
     *
     */
    var tree = {

        feuille: {
            type: "boolean",
            choice_yes: {
                noeud: "humidite",
                resultat: function () {
                    viscosite = true;
                }
            },
            choice_no: {
                noeud: "humidite",
                resultat: function () {
                    viscosite = false;
                }
            },
        },
        humidite: {
            type: "range",
            choice_low: {
                reponse: [0, 30],
                noeud: "ph",
                resultat: function () {
                    humectant = true;
                    humidite = 15;
                }
            },
            choice_middle: {
                reponse: [31, 70],
                noeud: "temperature",
                resultat: function () {
                    humidite = 50;
                }
            },
            choice_high: {
                reponse: [71, 100],
                noeud: "ph",
                resultat: function () {
                    humectant = false;
                    humidite = 85;
                }
            }
        },
        temperature: {
            type: "range",
            choice_high: {
                reponse: [20, 40],
                noeud: "ph",
                resultat: function () {
                    humectant = true;
                    diametre += 1;
                }
            },
            choice_low: {
                reponse: [0, 20],
                noeud: "vent",
                resultat: function () {}
            }
        },
        vent: {
            type: "range",
            choice_low: {
                reponse: [0, 10],
                noeud: "ph",
                resultat: function () {
                    humectant = true;
                }
            },
            choice_high: {
                reponse: [10, 19],
                noeud: "ph",
                resultat: function () {
                    humectant = false;
                }
            }
        },
        ph: {
            type: "range",
            choice_low: {
                reponse: [0, 7],
                noeud: "durete",
                resultat: function () {
                    acidifiant = false;
                }
            },
            choice_high: {
                reponse: [7.1, 14],
                noeud: "durete",
                resultat: function () {
                    acidifiant = true;
                }
            }
        },
        durete: {
            type: "boolean",
            choice_yes: {
                noeud: "pluie",
                resultat: function () {
                    durete = true
                }
            },
            choice_no: {
                noeud: "pluie",
                resultat: function () {
                    durete = false;
                }
            },
        },
        pluie: {
            type: "boolean",
            choice_yes: {
                noeud: "cleaner",
                resultat: function () {
                    pluie = true;
                }
            },
            choice_no: {
                noeud: "cleaner",
                resultat: function () {
                    pluie = false;
                }
            }
        },
        cleaner: {
            type: "boolean",
            choice_yes: {
                noeud: "duree",
                resultat: function () {
                    cleaner = true;
                }
            },
            choice_no: {
                noeud: "duree",
                resultat: function () {
                    cleaner = false;
                }
            }
        },
        duree: {
            type: "boolean",
            choice_yes: {
                noeud: "END",
                resultat: function () {
                    duree_courte = true;
                }
            },
            choice_no: {
                noeud: "END",
                resultat: function () {
                    duree_courte = false;
                }
            }
        }
    }


    /**
     *  
     *  ANIMATIONS 
     *    - dissimed card
     *    - updating card
     *    - incoming card
     *
     */

    var go_left = [
        {
            transform: 'translate3D(0, 0, 0)',
        },
        {
            transform: ' translate3D(' + -2 * $(window).width() + "px" + ' , 0, 0)',
        }
    ];

    var come_right = [
        {
            transform: 'translate3D(' + 2 * $(window).width() + "px" + ', 0, 0)',
        },
        {
            transform: ' translate3D(0, 0, 0)',
        }
    ];

    var cardTiming = {
        duration: ANIMATION_TIME,
        iterations: 1,
        easing: 'ease-in-out'
    }

    function show_question(current_node) {
        document.getElementById("question-card").animate(come_right, cardTiming);

    }

    function update_question(node) {
        $(".card-title").html(node["title"]);
        $(".card-propertext").html(node["text"]);
        $(".card-actions").html(node["actions"]);
        componentHandler.upgradeDom(); //Update MDL components
        $('#slider_range').on("input change", function () {
            $("#label_value").html($(this).val()); // Change the label for sliders.
        })
        progress += 1;
        bar.animate(progress / 9);
    }

    function hide_question() {
        document.getElementById("question-card").animate(go_left, cardTiming);
    }


    /**
     *  
     *  USER-ACTIVATED EVENTS  
     *    - 'YES' button
     *    - 'NO' button
     *    - 'OK' button
     *
     */
    $(document).on('click', '#yes_button', function () {
        hide_question();
        setTimeout(function () {
            current_node = tree[current_node]["choice_yes"]["noeud"];
            if (current_node !== "END") {
                update_question(nodes[current_node]);
                show_question(current_node);
            } else {
                ending();
            }

        }, ANIMATION_TIME - 50);

    });

    $(document).on('click', '#no_button', function () {
        hide_question();
        setTimeout(function () {
            current_node = tree[current_node]["choice_no"]["noeud"];
            if (current_node !== "END") {
                update_question(nodes[current_node]);
                show_question(current_node);
            } else {
                ending();
            }


        }, ANIMATION_TIME - 50);
    });

    $(document).on('click', '#ok_button', function () {
        hide_question();
        setTimeout(function () {
            value = $('#slider_range').val();
            if (is_value_in_range(value, tree[current_node]["choice_low"]["reponse"])) {
                current_node = tree[current_node]["choice_low"]["noeud"];
            } else if (is_value_in_range(value, tree[current_node]["choice_high"]["reponse"])) {
                current_node = tree[current_node]["choice_high"]["noeud"];
            } else if (is_value_in_range(value, tree[current_node]["choice_middle"]["reponse"])) {
                current_node = tree[current_node]["choice_middle"]["noeud"];
            }
            if (current_node !== "END") {
                update_question(nodes[current_node]);
                show_question(current_node);
            } else {

                ending();
            }



        }, ANIMATION_TIME - 50);
    });

    /**
     *  
     *  PROGRESS BAR
     *
     */
    var bar = new ProgressBar.Line(container, {
        strokeWidth: 2,
        easing: 'easeInOut',
        duration: 1000,
        color: '#428A01',
        trailColor: '#AFEC79',
        trailWidth: 1,
        svgStyle: {
            width: '100%',
            height: '10px'
        }
    });


    /**
     *  
     *  INIT
     *
     */

    $("#start").click(function () {
        $("#splash-screen").remove();
        current_node = "feuille";
        update_question(nodes[current_node]);
        $(".question-card").css("display", "block");
        show_question();
        bar.animate(0.1); // Number from 0.0 to 1.0*/
    });




});
