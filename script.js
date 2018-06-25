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

    // EVENT FOR SHOWING TEAMS
    $(".split").click((event) => {
        event.preventDefault();
        $(".split").addClass("active");
        $("#hide").hide();

        $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
            let targetConferenceId = event.currentTarget.id;
            let nbaTeams = nba.teams.filter(el => el.conference == targetConferenceId);
            let container = $("<div>").attr("id", targetConferenceId).addClass(`container-fluid container-${targetConferenceId}`).appendTo("body");



            // Sort the sync list based on device platform





            function showTeams(filteredTeams) {


                let rowDiv = $("<div>").addClass("row").appendTo(container);
                let showTeamsDiv = $("<div>").addClass("col-xs-1 col-sm-4 col-md-2 col-lg-4");
                let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
                let bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);
                // let results = nbaTeams.sort((a, b) => {
                //     let nameCompare = a.name.localeCompare(b.name);
                //     if (nameCompare !== 0) {
                //         return nameCompare
                //     }
                // })
                // console.log(results);

                let testBtn = $("<i id='back' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(container);

                $(container).on("click", "#back", function (e) {
                    $(container).hide();
                    $(".container123").show();
                })



                filteredTeams.forEach(element => {
                    showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-4").appendTo(rowDiv);
                    cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
                    bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);


                    bodyCardDiv
                        .append($(`<img src=${element.logo} />`).attr("id", element.name).addClass("image-card-body"))
                        .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
                        .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                        .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
                        .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
                        .append($("<p>").text("Ranking").val(0).attr("id", "btnRanking").addClass("card-body-text text-prop"))
                        .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))



                    return bodyCardDiv;


                })



                // let clickedDevicePlatformSorting = $("#btnRanking").hasClass('ASC') ? 'DESC' : 'ASC';
                // let sortedRanking = nbaTeams.slice().sort(function (a, b) {

                //     if (clickedDevicePlatformSorting == 'ASC' && a.ranking) return b.ranking ? a.ranking - b.ranking : -1;
                //     else if (b.ranking) return a.ranking ? b.ranking - a.ranking : 1;

                // });

                // sorted from 15-1
                // let sortedRanking = nbaTeams.slice().sort((a, b) => {
                //     return b.ranking - a.ranking
                // })

                // sorted from 1-15
                // let sortedRanking = nbaTeams.slice().sort((a, b) => {
                //     return a.ranking - b.ranking
                // })

                $(container).on("click", "#btnRanking", function (e) {
                    $(container).html("");
                    if (e.target.value == 0) {
                        let sortedRanking = nbaTeams.sort((a, b) => a.ranking - b.ranking);

                        showTeams(sortedRanking);
                    } else {
                        let sortedRanking = nbaTeams.sort((a, b) => b.ranking - a.ranking);
                        showTeams(sortedRanking);
                    }
                    $("#btnRanking").val(1);

                })









                // EVENT FOR SHOWING PLAYERS
                $(".image-card-body").click((event) => {
                    // showPlayers();
                    // event.preventDefault();
                    let targetTeamId = event.currentTarget.id;
                    $(container).hide();
                    let containerTeams = $("<div>").attr({ "id": targetConferenceId, "id": targetTeamId }).addClass(`container-fluid container-${targetConferenceId}`).appendTo("body");
                    rowDiv = $("<div>").addClass("row").appendTo(containerTeams);
                    nbaTeams.forEach(element => {
                        if (targetTeamId === element.name) {

                            element.players.forEach(element => {
                                showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-3").appendTo(rowDiv);
                                cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                                bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);


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

                            let backBtn = $("<i id='back' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(containerTeams);
                            $(containerTeams).on("click", "#back", function (e) {
                                $(containerTeams).hide();
                                $(container).show();
                            })
                        }
                    })
                });



            }

            showTeams(nbaTeams);










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
            // Za prv tim i subs=====================
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
            // Za prv tim i subs=========================








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