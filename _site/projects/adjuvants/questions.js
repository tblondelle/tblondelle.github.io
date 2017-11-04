$(function () {


    var BUTTONS_NO_YES = `<button id="no_button" class="mdl-button mdl-button--raised mdl-button--accent">Non</button><button id="yes_button" class="mdl-button mdl-button--raised mdl-button--accent">Oui</button>`;
    var BUTTON_OK = `<button id="ok_button" class="mdl-button mdl-button--raised mdl-button--accent">OK</button>`;

    var ANIMATION_TIME = 600;

    function generate_range_html(min, max, default_value, unite, step = 1) {
        return ` <p style="width:300px; margin:auto 0">` + "" + `<input id="slider_range" class="mdl-slider mdl-js-slider" type="range"
  min="` + min + `" max="` + max + `" value="` + default_value + `" step = "` + step + `" tabindex="0"><span id='label'><span id='label_value'>` + default_value + `</span>` + unite + `</span></p>` + BUTTON_OK;
    }


    function is_value_in_range(value, range) {
        //console.log(range[0] <= value && value <= range[1]);
        return (range[0] <= value && value <= range[1])
    }


    function print_debug() {
        console.log("cristaux : " + cristaux);
        console.log("humidite : " + humidite);
        console.log("temp_eleve : " + temp_eleve);
        console.log("cleaner : " + cleaner);
        console.log("low_ph : " + low_ph);
        console.log("vent_fort : " + vent_fort);
        console.log("pluie : " + pluie);
        console.log("durete : " + durete);
        console.log("duree_courte : " + duree_courte);
        console.log("========================");
    }


    // variables de réponses
    var cristaux,
        humidite,
        temp_eleve,
        cleaner,
        low_ph,
        vent_fort,
        pluie,
        durete,
        duree_courte;

    var current_node = "";
    var progress = 0;


    var message = [];

    function ending() {

        bar.animate(1);



        $('#question-card').html("");
        $('.card-title').html("Résultats");


        $("#result-card").fadeIn(600, function () {
            // Animation complete
        });


        var question = $('.card-question')
        var infotext = $('.card-infotext')
        question.html("");
        infotext.html("");


        print_debug();


        if (cristaux) {
            infotext.append("<p>Il vous faut utiliser des surfactants pour que les gouttes s'étalent sur la feuille, et des polymères, pour augmenter la viscosité des gouttes, ce qui facilitera leur adhésion. Le <b>LI 700 (De Sangosse)</b> par exemple est constitué d’agents mouillants permettant un bon  étalement des gouttes à la surface des feuilles. Des produits tels que <b>Adigor (Agridyne)</b> ou <b>Actirob B (Bayer)</b> vous permettront de faciliter la pénétration dans la structure foliaire. </p>");
        } else if (vent_fort) {
            infotext.append("<p>Des polymères ou une émulsion permettraient d'augmenter le diamètre des gouttes, pour éviter le drift. </p>");
        }

        if (humidite < 30) {
            infotext.append("<p>Le faible taux d'humidité impose d'ajouter des humectants pour que le produit s'évapore moins vite. </p>");
        } else if ((humidite < 70) && (temp_eleve || vent_fort)) {
                infotext.append("<p>Le faible taux d'humidité impose d'ajouter des humectants pour que le produit s'évapore moins vite. Vous pouvez, par exemple, ajouter de <b>l’Actimum (De Sangosse)</b>. </p>");
        }

        if (pluie) {
            infotext.append("<p>Pour éviter que la pluie ne rince le produit, il est conseillé d'y ajouter un produit adhésif. Utilisez par exemple <b>Sticman (De Sangosse)</b>. Attention, ce produit est à introduire en dernier dans la cuve.</p>");
        }

        if (low_ph === false) {
            infotext.append("<p>L'ajout d'acidifiant empêche que le principe actif ne soit détruit avant d'être efficace. Utilisez par exemple <b>X-Change (De Sangosse)</b></p>");
        }

        if (cleaner) {
            infotext.append("<p>Un tank cleaner vous permettra de mieux nettoyer votre réservoir. </p>");
        }
        if (duree_courte === false) {
            infotext.append("<p>Les différents composants de votre produit risquent de se séparer par décantation. Un dispersant permet d'éviter cela.</p> ");
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
            question: "Y a t-il des cristaux de cire sur la plante à traiter ?",
            infotext: "La surface de la feuille est recouverte par une couche hydrophobe protective. Il peut s’agir d’une simple couche cireuse (certaines feuilles de pommiers ou de vignes par exemple) ou d’une couche cireuse recouverte de cristaux de cire, formant une surface rugueuse (céréales, phases précoces de maïs et de soja…). La présence de cristaux de cire influe sur le dépôt des gouttelettes de pesticide à la surface de la feuille. ",
            actions: BUTTONS_NO_YES
        },
        humidite: {
            title: "Humidité",
            question: "Indiquez le taux d'humidité local :",
            infotext: "Le taux d’humidité influe sur la volatilisation, c’est-à-dire l’évaporation de l’eau présente dans la bouillie. On cherche à ralentir au maximum la vitesse d’évaporation.",
            actions: generate_range_html(0, 100, 50, '%', 5)
        },
        temperature: {
            title: "Température",
            question: "Indiquez la température actuelle :",
            infotext: "La température influe sur la volatilisation, c’est-à-dire l’évaporation de l’eau présente dans la bouillie. On cherche à ralentir au maximum la vitesse d’évaporation. ",
            actions: generate_range_html(-20, 40, 10, '°C')
        },
        ph: {
            title: "pH",
            question: "Indiquez le pH de l'eau que vous utilisez :",
            infotext: "Les principes actifs peuvent être dégradés si le pH de l’eau est supérieur à&nbsp;7.",
            actions: generate_range_html(0, 14, 7, '')
        },
        vent: {
            title: "Vent",
            question: "Indiquez la vitesse du vent :",
            infotext: "La présence de vent accélère l’évaporation des gouttes, et augmente l’effet de dérive au moment de la pulvérisation.    <br> <i style='color: darkred'>Attention ! Le vent est supérieur à 19 km/h ? La pulvérisation de pesticide est strictement interdite en Europe et fortement déconseillée ailleurs : le vent fort accentue en effet nettement la dérive et contribue à disperser des composés potentiellement toxiques dans l'environnement !</i>",
            actions: generate_range_html(0, 19, 10, ' km/h')
        },
        durete: {
            title: "Dureté de l'eau",
            question: "L’eau utilisée est-elle une eau dure ?",
            infotext: "Une eau dure est une eau riche en ions (Ca<sup>2+</sup>, Mg<sup>2+</sup>, Fe<sup>2+</sup>), qui peuvent former des complexes avec les principes actifs et les rendre inefficaces.",
            actions: BUTTONS_NO_YES
        },
        pluie: {
            title: "Pluie",
            question: "Va-t-il pleuvoir peu de temps après la pulvérisation du pesticide dans les cultures ?",
            infotext: "En cas de pluie, le pesticide risque d’être lessivé avant que le principe actif ait pénétré dans la feuille. Celui-ci risque d’être dispersé dans l’environnement. ",
            actions: BUTTONS_NO_YES
        },
        cleaner: {
            title: "Agents nettoyants",
            question: "Votre cuve a-t-elle besoin d’être nettoyée ?",
            infotext: "Des adjuvants appelés <i>tank cleaners</i> peuvent être ajoutés à la bouillie. Ils permettent d’éliminer les dépôts et débris accumulés dans la cuve au cours du temps. ",
            actions: BUTTONS_NO_YES
        },
        duree: {
            title: "Conservation",
            question: "Le mélange que vous allez préparer sera-t-il intégralement utilisé dans les 24 heures ?",
            infotext: "Les différents agents chimiques peuvent décanter au fond de la cuve s’ils sont stockés trop longtemps, ce qui pose problème au moment de la pulvérisation. Des produits dispersants peuvent être ajoutés afin d’assurer l’homogénéisation de la solution. ",
            actions: BUTTONS_NO_YES
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
                    cristaux = true;
                }
            },
            choice_no: {
                noeud: "humidite",
                resultat: function () {
                    cristaux = false;
                }
            },
        },
        humidite: {
            type: "range",
            choice_low: {
                reponse: [0, 30],
                noeud: "temperature",
                resultat: function () {
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
                noeud: "temperature",
                resultat: function () {
                    humidite = 85;
                }
            }
        },
        temperature: {
            type: "range",
            choice_high: {
                reponse: [20, 40],
                noeud: "vent",
                resultat: function () {
                    temp_eleve = true;

                }
            },
            choice_low: {
                reponse: [-20, 20],
                noeud: "vent",
                resultat: function () {
                    temp_eleve = false;
                }
            }
        },
        vent: {
            type: "range",
            choice_low: {
                reponse: [0, 10],
                noeud: "ph",
                resultat: function () {
                    vent_fort = false;

                }
            },
            choice_high: {
                reponse: [10, 19],
                noeud: "ph",
                resultat: function () {
                    vent_fort = true;
                }
            }
        },
        ph: {
            type: "range",
            choice_low: {
                reponse: [0, 7],
                noeud: "durete",
                resultat: function () {
                    low_ph = true;
                }
            },
            choice_high: {
                reponse: [7.1, 14],
                noeud: "durete",
                resultat: function () {
                    low_ph = false;
                }
            }
        },
        durete: {
            type: "boolean",
            choice_yes: {
                noeud: "pluie",
                resultat: function () {
                    durete = true;
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
        $(".card-infotext").html(node["infotext"]);
        $(".card-question").html(node["question"]);
        $(".card-actions").html(node["actions"]);
        componentHandler.upgradeDom(); //Update MDL components
        $('#slider_range').on("input change", function () {
            // Change the bottom label for the slider.
            $("#label_value").html($(this).val()); 
        })
        progress += 1;
        bar.animate(progress / 9);
        print_debug();
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
            tree[current_node]["choice_yes"]["resultat"]();
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
            tree[current_node]["choice_no"]["resultat"]();
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
                tree[current_node]["choice_low"]["resultat"]();
                current_node = tree[current_node]["choice_low"]["noeud"];
            } else if (is_value_in_range(value, tree[current_node]["choice_high"]["reponse"])) {
                tree[current_node]["choice_high"]["resultat"]();
                current_node = tree[current_node]["choice_high"]["noeud"];
            } else if (is_value_in_range(value, tree[current_node]["choice_middle"]["reponse"])) {
                tree[current_node]["choice_middle"]["resultat"]();
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
        trailColor: '#D8F687',
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
        $("#splash-card").remove();
        current_node = "feuille";
        update_question(nodes[current_node]);
        $("#question-card").css("display", "block");
        show_question();
    });

});
