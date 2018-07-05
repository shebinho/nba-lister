$(document).ready(function () {

    function getData() {
        let nbaTeams;
        $.ajax({
            method: "GET",
            url: ("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json"),
            async: false,
            success: function (data) {
                nbaTeams = data;
            },
            error: function (data) {
                console.log("Error");
                alert("Error");
            }

        })
        return nbaTeams;
    }


    function init() {
        const nbaTeams = getData();
        const left = document.querySelector(".left");
        const right = document.querySelector(".right");
        const mainContainer = document.querySelector(".main-container");
        let conference;

        // Za Hover na main page

        left.addEventListener("mouseenter", () => {
            mainContainer.classList.add("hover-left");
        });

        left.addEventListener("mouseleave", () => {
            mainContainer.classList.remove("hover-left");
        });

        right.addEventListener("mouseenter", () => {
            mainContainer.classList.add("hover-right");
        });

        right.addEventListener("mouseleave", () => {
            mainContainer.classList.remove("hover-right");
        });

        // Za selection na conference
        $(".split").click((event) => {
            event.preventDefault();
            conference = event.target.id;
            $(".split").addClass("active");
            $("#hide").hide();
            showTeams(filterConference(nbaTeams, conference), conference);
        });

        // Za Selection na Team
        $(`body`).on("click", `img[name="team"]`, function (e) {
            e.preventDefault();
            $(".container-fluid").html("");
            showPlayers(filterConference(nbaTeams, conference), e.target.id)
        });

        $('body').on("click", ".paraBack", function (e) {
            $(".navbar").html("");
            $(".container-fluid").html("");
            $(".main-container").show();
        })

        //Sorting by Ranking 15-1
        $('body').on("click", ".btnRankingDown", function (e) {
            $(".navbar").html("");
            $(".container-fluid").html("");
            console.log(conference);
            showTeams(filterRankingDown(nbaTeams, conference), conference);

        })

        //Sorting by Ranking 1-15
        $('body').on("click", ".btnRankingUp", function (e) {
            $(".navbar").html("");
            $(".container-fluid").html("");
            console.log(conference);
            showTeams(filterRankingUp(nbaTeams, conference), conference);

        })


        // Za Selection na Team

    }

    function filterConference(teams, conference) {
        let newTeam = JSON.parse(teams);
        return newTeam.teams.filter((t) => t.conference == conference);
    }

    function filterRankingDown(teams, conference) {
        let newTeam = JSON.parse(teams);
        let sortedTeams = newTeam.teams.filter((t) => t.conference == conference);
        let sortedRanking = sortedTeams.sort((a, b) => a.ranking - b.ranking);
        return sortedRanking;
    }

    function filterRankingUp(teams, conference) {
        let newTeam = JSON.parse(teams);
        let sortedTeams = newTeam.teams.filter((t) => t.conference == conference);
        let sortedRanking = sortedTeams.sort((a, b) => b.ranking - a.ranking);
        return sortedRanking;
    }

    function showTeams(filteredTeams, conf) {
        // console.log(filteredTeams);
        let container = $("<div>").attr("id", filteredTeams[0].conference).addClass(`container-fluid container-${filteredTeams[0].conference}`).appendTo("body");
        let data = getData();
        let dataParse = JSON.parse(data);
        let navbar = $("<nav class='navbar navbar-expand-lg navbar-light bg-light'></nav>");
        $(container).before(navbar);
        let navbarBrand = $("<a class='navbar-brand' href='#'></a>").appendTo(navbar);
        navbarBrand.append($(`<img src=${dataParse.media.img.league[conf]} width='60' height='60' class='d-inline-block align-top conference-logo' alt=''>`));
        let navbarCollapse = $("<div class='collapse navbar-collapse' id='navbarSupportedContent'></div>").appendTo(navbar);
        navbarCollapse.append($("<ul class='navbar-nav mr-auto'></ul>")
            .append($("<li class='nav-item dropdown'></li>")
                .append($("<a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Ranking</a>"))
                .append($("<div class='dropdown-menu' aria-labelledby='navbarDropdown'></div>")
                    .append($("<a class='dropdown-item btnRankingDown' href='#'>By Ascending</a>"))
                    .append($("<a class='dropdown-item btnRankingUp' href='#'>By Descending</a>")))));


        // console.log(`<img src=${dataParse.media.img.league[conf]}`)

        let rowDiv = $("<div>").addClass("row").appendTo(container);
        let showTeamsDiv = $("<div>").addClass("col-xs-1 col-sm-4 col-md-2 col-lg-4");
        let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
        let bodyCardDiv = $(`<div class='card-body card-body-${filteredTeams[0].conference}'>`).appendTo(cardDiv);
        let testBtn = $("<i id='back' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(container);

        filteredTeams.forEach(element => {
            showTeamsDiv = $(`<div id='${element.name}'>`).addClass("col-xs-6 col-sm-4 col-md-4 col-lg-4").appendTo(rowDiv);
            cardDiv = $(`<div class='card'>`).appendTo(showTeamsDiv);
            bodyCardDiv = $(`<div class='card-body card-body-${filteredTeams[0].conference} card-${element.name.replace(/\s/g, "")}'>`).appendTo(cardDiv);

            bodyCardDiv
                .append($(`<img name="team" src=${element.logo} />`).attr("id", element.name).addClass("image-card-body"))
                .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
                .append($("<p>").text("Ranking").attr("id", "btnRanking").addClass("card-body-text text-prop")
                    .append($("<span class='btnRankingUp'><i class='fas fa-arrow-up'></i></span>").css("color", "green"))
                    .append($("<span class='btnRankingDown'><i class='fas fa-arrow-down'></i></span>").css("color", "red")))
                .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))

        })
    }

    function showPlayers(nbaTeams, team) {
        let teamPlayers = nbaTeams.filter(t => t.name == team);
        let firstTeam = $(`<button class="btn btn-block">`).html("Starters");
        let subs = $(`<button class="btn btn-block">`).html("Substitutions");
        let containerTeams = $("<div>").attr({ "id": team })
            .addClass(`container-fluid container-${teamPlayers[0].conference}`)
            .appendTo("body");
        let rowDiv = $("<div>").addClass("row").appendTo(containerTeams);

        teamPlayers.forEach(element => {

            element.players.forEach((element, index) => {
                if (index == 0) {
                    firstTeam.appendTo(rowDiv);
                }
                if (index == 5) {
                    subs.appendTo(rowDiv);
                }
                showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-3").appendTo(rowDiv);
                cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
                bodyCardDiv = $(`<div class='card-body card-body-${teamPlayers[0].conference}'>`).appendTo(cardDiv);


                bodyCardDiv
                    .append($(`<img src=${element.img} />`).addClass("image-card-body"))
                    .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                    .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.nationality}`).addClass("card-body-text"))
                    .append($("<p>").text("Position").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.position}`).addClass("card-body-text"))
            })
        })
    }

    init();

    // =====================================================================================
    //main page
    //     const left = document.querySelector(".left");
    //     const right = document.querySelector(".right");
    //     const container123 = document.querySelector(".main-container");

    //     left.addEventListener("mouseenter", () => {
    //         container123.classList.add("hover-left");
    //     });

    //     left.addEventListener("mouseleave", () => {
    //         container123.classList.remove("hover-left");
    //     });

    //     right.addEventListener("mouseenter", () => {
    //         container123.classList.add("hover-right");
    //     });

    //     right.addEventListener("mouseleave", () => {
    //         container123.classList.remove("hover-right");
    //     });

    //     // EVENT FOR SHOWING TEAMS
    //     $(".split").click((event) => {
    //         event.preventDefault();
    //         $(".split").addClass("active");
    //         $("#hide").hide();

    //         $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
    //             let targetConferenceId = event.currentTarget.id;
    //             let nbaTeams = nba.teams.filter(el => el.conference == targetConferenceId);
    //             let container = $("<div>").attr("id", targetConferenceId).addClass(`container-fluid container-${targetConferenceId}`).appendTo("body");



    //             // Sort the sync list based on device platform





    //             function showTeams(filteredTeams) {


    //                 let rowDiv = $("<div>").addClass("row").appendTo(container);
    //                 let showTeamsDiv = $("<div>").addClass("col-xs-1 col-sm-4 col-md-2 col-lg-4");
    //                 let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
    //                 let bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);
    //                 // let results = nbaTeams.sort((a, b) => {
    //                 //     let nameCompare = a.name.localeCompare(b.name);
    //                 //     if (nameCompare !== 0) {
    //                 //         return nameCompare
    //                 //     }
    //                 // })
    //                 // console.log(results);

    //                 let testBtn = $("<i id='back' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(container);

    //                 $(container).on("click", "#back", function (e) {
    //                     $(container).hide();
    //                     $(".container123").show();
    //                 })



    //                 filteredTeams.forEach(element => {
    //                     showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-4").appendTo(rowDiv);
    //                     cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
    //                     bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);


    //                     bodyCardDiv
    //                         .append($(`<img src=${element.logo} />`).attr("id", element.name).addClass("image-card-body"))
    //                         .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
    //                         .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
    //                         .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
    //                         .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
    //                         .append($("<p>").text("Ranking").val(0).attr("id", "btnRanking").addClass("card-body-text text-prop"))
    //                         .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))



    //                     return bodyCardDiv;


    //                 })



    //                 // let clickedDevicePlatformSorting = $("#btnRanking").hasClass('ASC') ? 'DESC' : 'ASC';
    //                 // let sortedRanking = nbaTeams.slice().sort(function (a, b) {

    //                 //     if (clickedDevicePlatformSorting == 'ASC' && a.ranking) return b.ranking ? a.ranking - b.ranking : -1;
    //                 //     else if (b.ranking) return a.ranking ? b.ranking - a.ranking : 1;

    //                 // });

    //                 // sorted from 15-1
    //                 // let sortedRanking = nbaTeams.slice().sort((a, b) => {
    //                 //     return b.ranking - a.ranking
    //                 // })

    //                 // sorted from 1-15
    //                 // let sortedRanking = nbaTeams.slice().sort((a, b) => {
    //                 //     return a.ranking - b.ranking
    //                 // })

    //                 $(container).on("click", "#btnRanking", function (e) {
    //                     $(container).html("");
    //                     if (e.target.value == 0) {
    //                         let sortedRanking = nbaTeams.sort((a, b) => a.ranking - b.ranking);
    //                         $("#btnRanking").val(1);
    //                         showTeams(sortedRanking);
    //                     } else {
    //                         let sortedRanking = nbaTeams.sort((a, b) => b.ranking - a.ranking);
    //                         $("#btnRanking").val(0);
    //                         showTeams(sortedRanking);

    //                     }
    //                 })



    // // dhfsdihisdfughidfghdfghdifughiudfghudifghui DO TUKA SME =========================





    //                 // EVENT FOR SHOWING PLAYERS
    //                 $(".image-card-body").click((event) => {
    //                     // showPlayers();
    //                     // event.preventDefault();
    //                     let targetTeamId = event.currentTarget.id;
    //                     $(container).hide();
    //                     let containerTeams = $("<div>").attr({ "id": targetConferenceId, "id": targetTeamId }).addClass(`container-fluid container-${targetConferenceId}`).appendTo("body");
    //                     rowDiv = $("<div>").addClass("row").appendTo(containerTeams);
    //     nbaTeams.forEach(element => {
    //         if (targetTeamId === element.name) {

    //             element.players.forEach(element => {
    //                 showTeamsDiv = $("<div>").addClass("col-xs-6 col-sm-4 col-md-4 col-lg-3").appendTo(rowDiv);
    //                 cardDiv = $("<div class='card'>").attr("id", element.name).appendTo(showTeamsDiv);
    //                 bodyCardDiv = $(`<div class='card-body card-body-${targetConferenceId}'>`).appendTo(cardDiv);


    //                 bodyCardDiv
    //                     .append($(`<img src=${element.img} />`).addClass("image-card-body"))
    //                     .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
    //                     .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
    //                     .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
    //                     .append($("<p>").text(`${element.nationality}`).addClass("card-body-text"))
    //                     .append($("<p>").text("Position").addClass("card-body-text text-prop"))
    //                     .append($("<p>").text(`${element.position}`).addClass("card-body-text"))



    //                 return bodyCardDiv;
    //             })

    //             let backBtn = $("<i id='back' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(containerTeams);
    //             $(containerTeams).on("click", "#back", function (e) {
    //                 $(containerTeams).hide();
    //                 $(container).show();
    //             })
    //         }
    //     })
    // });



    //             }

    //             showTeams(nbaTeams);










    //   function showPlayers(){

    //         $(container).hide();

    //       let bostonPlayers =  nbaEastTeams.filter(el => el.name === "Boston Celtics");
    //       console.log(bostonPlayers);
    //       console.log(bodyCardDiv);

    //       bostonPlayers.forEach(el => {
    //         console.log(el.players);
    //       })

    //   }
    // console.log(nba);
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

    //         });

    //     })





});