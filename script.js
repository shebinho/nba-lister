$(document).ready(function () {

    //main page
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const container123 = document.querySelector(".container123");

    left.addEventListener("mouseenter", () => {
        container123.classList.add("hover-left");
    });

    left.addEventListener("mouseleave", () => {
        container123.classList.remove("hover-left");
    });

    right.addEventListener("mouseenter", () => {
        container123.classList.add("hover-right");
    });

    right.addEventListener("mouseleave", () => {
        container123.classList.remove("hover-right");
    });

    $(".split").click((event) => {
        event.preventDefault();
        $("#hide").hide();

        $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {

            if (event.currentTarget.id === "eastern-conference") {

                let container = $("<div>").attr("id", "eastern-conference").addClass("container-fluid container-east").appendTo("body");
                let rowDiv = $("<div>").addClass("row").appendTo(container);
                let showTeamsDiv = $("<div>").addClass("col-xs-1 col-sm-4 col-md-2 col-lg-4");
                let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
                let bodyCardDiv = $("<div class='card-body card-body-east'>").appendTo(cardDiv);
                let nbaEastTeams = nba.teams.filter(el => el.conference == "east");
                console.log(nbaEastTeams);


                function showTeams() {


                    nbaEastTeams.forEach(element => {
                        showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-4").appendTo(rowDiv);
                        cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                        bodyCardDiv = $("<div class='card-body card-body-east'>").appendTo(cardDiv);


                        bodyCardDiv
                            .append($(`<img src=${element.logo} />`).addClass("image-card-body"))
                            .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                            .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
                            .append($("<p>").text("Ranking").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))

                        return bodyCardDiv;

                    })
                    $(".card").click((event) => {
                        // showPlayers();
                        // event.preventDefault();
                        $(container).hide();
                        container = $("<div>").attr("id", "eastern-conference").addClass("container-fluid container-east").appendTo("body");
                        rowDiv = $("<div>").addClass("row").appendTo(container);
                        nbaEastTeams.forEach(element => {
                            if (event.currentTarget.id === element.name) {

                                element.players.forEach(element => {
                                    showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-3").appendTo(rowDiv);
                                    cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                                    bodyCardDiv = $("<div class='card-body card-body-east'>").appendTo(cardDiv);


                                    bodyCardDiv
                                        .append($(`<img src=${element.img} />`).addClass("image-card-body"))
                                        .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                                        .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.nationality}`).addClass("card-body-text"))
                                        .append($("<p>").text("Position").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.position}`).addClass("card-body-text"))

                                    return bodyCardDiv;
                                })

                            }
                        })
                    });

                    // console.log(bodyCardDiv);

                    //console.log(nbaTeams);
                    //console.log(nbaLogosArray);
                };

                showTeams();
            }

            if (event.currentTarget.id === "western-conference") {
                let container = $("<div>").attr("id", "western-conference").addClass("container-fluid container-west").appendTo("body");
                let rowDiv = $("<div>").addClass("row").appendTo(container);
                let showTeamsDiv = $("<div>").addClass("col-xs-1 col-sm-4 col-md-2 col-lg-4");
                let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
                let bodyCardDiv = $("<div class='card-body card-body-west'>").appendTo(cardDiv);
                let nbaWestTeams = nba.teams.filter(el => el.conference == "west");
                // console.log(nbaWestTeams);


                function showTeams() {


                    nbaWestTeams.forEach(element => {
                        showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-4").appendTo(rowDiv);
                        cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                        bodyCardDiv = $("<div class='card-body card-body-west'>").appendTo(cardDiv);


                        bodyCardDiv
                            .append($(`<img src=${element.logo} />`).addClass("image-card-body"))
                            .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                            .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
                            .append($("<p>").text("Ranking").addClass("card-body-text text-prop"))
                            .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))

                        return bodyCardDiv;

                    })
                    $(".card").click((event) => {
                        // showPlayers();
                        // event.preventDefault();
                        $(container).hide();
                        console.log(nbaWestTeams);
                        container = $("<div>").attr("id", "western-conference").addClass("container-fluid container-west").appendTo("body");
                        rowDiv = $("<div>").addClass("row").appendTo(container);
                        nbaWestTeams.forEach(element => {
                            if (event.currentTarget.id === element.name) {

                                element.players.forEach(element => {
                                    showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-3").appendTo(rowDiv);
                                    cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                                    bodyCardDiv = $("<div class='card-body card-body-west'>").appendTo(cardDiv);


                                    bodyCardDiv
                                        .append($(`<img src=${element.img} />`).addClass("image-card-body"))
                                        .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                                        .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.nationality}`).addClass("card-body-text"))
                                        .append($("<p>").text("Position").addClass("card-body-text text-prop"))
                                        .append($("<p>").text(`${element.position}`).addClass("card-body-text"))

                                    return bodyCardDiv;
                                })

                            }
                        })
                    });

                    // console.log(bodyCardDiv);

                    //console.log(nbaTeams);
                    //console.log(nbaLogosArray);
                };

                showTeams();
            }



            //   function showPlayers(){

            //         $(container).hide();

            //       let bostonPlayers =  nbaEastTeams.filter(el => el.name === "Boston Celtics");
            //       console.log(bostonPlayers);
            //       console.log(bodyCardDiv);

            //       bostonPlayers.forEach(el => {
            //         console.log(el.players);
            //       })

            //   }
            console.log(nba);
            // Za prv tim i subs====================
            // nba.teams.forEach(e => {
            //     e.players.forEach((element, i) => {
            //         if(i < 5){
            //             let div = $(".darko");
            //             let card = $(`<img src="${element.img}"> `);
            //             card.appendTo(div);
            //             let h1 = $(`<h1>`).html(element.name);
            //             h1.appendTo(div);
            //             console.log(element, "FirstTeam")
            //         } else {
            //             let div = $(".trajan");
            //             let card = $(`<img src="${element.img}"> `);
            //             card.appendTo(div);
            //             let h1 = $(`<h1>`).html(element.name);
            //             h1.appendTo(div);
            //             console.log(element,"Subs")
            //         }
            //     })
            // })
            // Za prv tim i subs========================








            // $('<img>').attr('src', nba.media.img.teams.logos.ATL).addClass('nba-logo').appendTo("body");

            // const filteredplayers = nba.filter(nba => nba.team[0].ATL.player)
            // $("<p>")
            // let nezz = []
            // let playerName;
            // let saveButton = $("#saveButton");

            // $(saveButton).click((event) => {
            //     event.preventDefault();

            //     playerName = $("#player-name").val();
            //     nba.teams.forEach(element => {
            //         if (element.players)
            //             element.players.forEach(player => {
            //                 if (playerName === player.name)
            //                     nezz.push(player)
            //                 // console.log(nezz);
            //             })
            //     })

            // for(let i = 0 ; i < nbaWestTeams.length ; i++){
            //     for(let j = 0; j < 5; j++) {
            //         nba.teams[i].players[j].forEach(element => {


            //         });

            //    }

            // }

            //     console.log(nezz[0].stats[0])

            //     let numberComparer = (a, b) => {
            //         console.log(` Comparing ${a} and ${b}`)
            //         return b - a;
            //     };
            // })



            // console.log(nba.teams);
            //console.log(nezz)

            // let filteredplayer = nba.teams.filter(element =>{
            //     for(let i = 0; i < element.length; i++){
            //         for(let j = 0; j < element.players.length; j++){
            //             element.players[j].name === "Kent Bazemore";
            //         }
            //     }
            // })


            // console.log(filteredplayer);

            //  let nbal= nba.teams.name.filter(function(item) {
            //     for (var key in nba) {
            //         if(item[key] === "Atlanta Hawks");
            //     }
            //     return true;
            //   });
            //   console.log(nbal);

            // nba.teams[i].players[j].stats.forEach(element => {
            //     console.log(" PTS: " + element.PTS,"\n", "AST: "+ element.AST,"\n", "REB: "+element.REB,"\n","BLK: "+element.BLK,"\n", "STL: "+element.STL);
            // });

        });

    })





})