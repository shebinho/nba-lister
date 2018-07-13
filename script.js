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
            }

        })
        return nbaTeams;
    }


    function init() {
        const nbaTeams = getData();
        const left = $(".left");
        const right = $(".right");
        const mainContainer = $(".main-container");
        let conference;
        let team;

        // Za Hover na main page

        $(left).on("mouseenter", () => {
            $(mainContainer).addClass("hover-left");
        }).on("mouseleave", () => {
            $(mainContainer).removeClass("hover-left");
        })

        $(right).on("mouseenter", () => {
            $(mainContainer).addClass("hover-right");
        }).on("mouseleave", () => {
            $(mainContainer).removeClass("hover-right");
        })

        // Za selection na conference
        $(".split").click((event) => {
            event.preventDefault();
            conference = event.target.id;
            $("#hide").hide();
            showTeams(filterConference(nbaTeams, conference), conference);
        });
        // Za Autocomplete na input
        let playerSuggestions = [];
        let players = getData();
        let parsePlayers = JSON.parse(players);
        parsePlayers.teams.forEach(element => {
            element.players.forEach(element => {
                playerSuggestions.push(element.name);
            })
        });
        $("#p1").autocomplete({
            source: playerSuggestions,
            minLength: 2
        })

        $("#p2").autocomplete({
            source: playerSuggestions,
            minLength: 2
        })

        $('modalPlayers').modal('show');
        $("#p1").autocomplete("option", "appendTo", ".modal-autocomplete");
        $('modalPlayers').modal('show');
        $("#p2").autocomplete("option", "appendTo", ".modal-autocomplete");

        //Compare Players Button
        $('body').on('submit', function (e) {
            e.preventDefault();
            document.getElementsByClassName("modal-body")[0].children[0].children[0].children[0].innerHTML = "";
            document.getElementsByClassName("modal-body")[0].children[0].children[0].children[1].innerHTML = "";
            document.getElementsByClassName("modal-body")[0].children[0].children[0].children[3].innerHTML = "";
            comparePlayersModal();

        })

        $(".modal").on("hidden.bs.modal", function () {
            $(".column-playerOne").html("");
            $(".column-playerTwo").html("");

        });

        // Za Selection na Team
        $(`body`).on("click", `img[name="team"]`, function (e) {
            e.preventDefault();
            $(".navbar").remove();
            $(".container-teams").remove();
            team = e.target.id;
            showPlayers(filterConference(nbaTeams, conference), e.target.id)
        });

        $(`body`).on("click", `img[name="player"]`, function (e) {
            e.preventDefault();
            $(".navbar").remove();
            $(".container-teams").remove();
            $(".container-players").html("");
            statsPlayersModal(filterConference(nbaTeams, conference), team, e.target.id)
        });

        $('body').on("click", "#btnBackToMainPage", function (e) {
            $(".navbar").remove();
            $(".container-teams").remove();
            $(".main-container").show();
        })

        $('body').on("click", "#btnBackToTeams", function (e) {
            $(".container-players").remove();
            showTeams(filterConference(nbaTeams, conference), conference);

        })

        $('body').on("click", ".btnBackToPlayers", function (e) {
            $(".stats-container").remove();
            console.log(e);
            showPlayers(filterConference(nbaTeams, conference), e.target.id)

        })

        //Sorting by Ranking 15-1
        $('body').on("click", ".btnRankingDown", function (e) {
            $(".navbar").remove();
            $(".container-teams").remove();
            showTeams(filterRankingDown(nbaTeams, conference), conference);

        })

        //Sorting by Ranking 1-15
        $('body').on("click", ".btnRankingUp", function (e) {
            $(".navbar").remove();
            $(".container-teams").remove();
            showTeams(filterRankingUp(nbaTeams, conference), conference);

        })

        //Sorting by Ranking 1-15
        $('body').on("click", ".btnNameAsc", function (e) {
            $(".navbar").remove();
            $(".container-teams").remove();
            showTeams(filterNameAsc(nbaTeams, conference), conference);

        })

        $('body').on("click", ".btnNameDesc", function (e) {
            $(".navbar").remove();
            $(".container-teams").remove();
            showTeams(filterNameDesc(nbaTeams, conference), conference);

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

    function filterNameAsc(teams, conference) {
        let newTeam = JSON.parse(teams);
        let sortedTeams = newTeam.teams.filter((t) => t.conference == conference);
        let sortedNames = sortedTeams.sort((a, b) => a.name.localeCompare(b.name))
        return sortedNames
    }

    function filterNameDesc(teams, conference) {
        let newTeam = JSON.parse(teams);
        let sortedTeams = newTeam.teams.filter((t) => t.conference == conference);
        let sortedNames = sortedTeams.sort((a, b) => b.name.localeCompare(a.name))
        return sortedNames
    }

    function comparePlayersModal() {
        let p1 = $("#p1").val();
        let p2 = $("#p2").val();
        let nba = JSON.parse(getData());
        let team1 = [];
        let team2 = [];
        let pc1 = [];
        let pc2 = [];
        let cardBodyPlayerOne;
        let cardBodyPlayerTwo;

        nba.teams.forEach(team => {
            team.players.filter(player => {


                if (player.name === p1) {
                    team1.push(team);
                    pc1.push(player)
                    cardBodyPlayerOne = $(`<div class='card card-body card-${team.name.replace(/\s/g, "")} card-body-${team.conference}'</div>`)
                        .append($(`<img class='card-img-top' src='${player.img}'> `)).append($("<div class='card-body-text mt-2'></div>")
                            .append($(`<p class='card-body-text modal-player-name-text'>${player.name}</p>`))
                            .append($(`<p class='card-body-text modal-player-name-text'>Position: ${player.position}</p>`)));
                }


                if (player.name === p2) {
                    team2.push(team);
                    pc2.push(player)
                    cardBodyPlayerTwo = $(`<div class='card card-body card-${team.name.replace(/\s/g, "")} card-body-${team.conference}'</div>`)
                        .append($(`<img class='card-img-top' src='${player.img}'> `)).append($("<div class='card-body-text mt-2'></div>")
                            .append($(`<p class='card-body-text modal-player-name-text'>${player.name}</p>`))
                            .append($(`<p class='card-body-text modal-player-name-text'>Position: ${player.position}</p>`)));
                }

            })
        })

        pc1[0].stats.forEach((stat, i) => {

            if (stat.PTS === pc2[0].stats[0].PTS) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>PTS: ${stat.PTS}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>PTS: ${pc2[0].stats[0].PTS}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
            }

            if (stat.PTS > pc2[0].stats[0].PTS) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>PTS: ${stat.PTS}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>PTS: ${pc2[0].stats[0].PTS}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
            }

            if (stat.PTS < pc2[0].stats[0].PTS) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>PTS: ${stat.PTS}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>PTS: ${pc2[0].stats[0].PTS}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
            }

            if (stat.AST === pc2[0].stats[0].AST) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>AST: ${stat.AST}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>AST: ${pc2[0].stats[0].AST}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
            }

            if (stat.AST > pc2[0].stats[0].AST) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>AST: ${stat.AST}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>AST: ${pc2[0].stats[0].AST}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
            }

            if (stat.AST < pc2[0].stats[0].AST) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>AST: ${stat.AST}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>AST: ${pc2[0].stats[0].AST}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
            }

            if (stat.REB === pc2[0].stats[0].REB) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>REB: ${stat.REB}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>REB: ${pc2[0].stats[0].REB}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
            }

            if (stat.REB > pc2[0].stats[0].REB) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>REB: ${stat.REB}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>REB: ${pc2[0].stats[0].REB}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
            }

            if (stat.REB < pc2[0].stats[0].REB) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>REB: ${stat.REB}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>REB: ${pc2[0].stats[0].REB}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
            }

            if (stat.STL === pc2[0].stats[0].STL) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>STL: ${stat.STL}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>STL: ${pc2[0].stats[0].STL}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
            }

            if (stat.STL > pc2[0].stats[0].STL) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>STL: ${stat.STL}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>STL: ${pc2[0].stats[0].STL}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
            }

            if (stat.STL < pc2[0].stats[0].STL) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>STL: ${stat.STL}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>STL: ${pc2[0].stats[0].STL}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
            }

            if (stat.BLK === pc2[0].stats[0].BLK) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>BLK: ${stat.BLK}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>BLK: ${pc2[0].stats[0].BLK}</li>`).append($("<span><i class='fas fa-arrows-alt-h'></i></span>")))
            }

            if (stat.BLK > pc2[0].stats[0].BLK) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>BLK: ${stat.BLK}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>BLK: ${pc2[0].stats[0].BLK}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
            }

            if (stat.BLK < pc2[0].stats[0].BLK) {
                let statsListPlayerOne = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerOne);
                let statsListPlayerTwo = $("<div class='list-group list-group-flush'></div>").appendTo(cardBodyPlayerTwo);
                statsListPlayerOne.append($(`<li class='list-group-item card-body-text text-prop card-body-${team1[0].conference}'>BLK: ${stat.BLK}</li>`).append($("<span><i class='fas fa-arrow-down'></i></span>")))
                statsListPlayerTwo.append($(`<li class='list-group-item card-body-text text-prop card-body-${team2[0].conference}'>BLK: ${pc2[0].stats[0].BLK}</li>`).append($("<span><i class='fas fa-arrow-up'></i></span>")))
            }

        })

        if (p1 === p2) {
            $(".column-playerOne").html("");
            $(".column-playerOne").html("");
            $(`<div class='alert alert-danger alert-dismissible fade show' role='alert'>
            <strong>You can't compare same player twice !</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`).appendTo(".alert-compare");


        } else {
            cardBodyPlayerOne.appendTo(".column-playerOne");
            cardBodyPlayerTwo.appendTo(".column-playerTwo");
        }



    }

    function showTeams(filteredTeams, conf) {
        let container = $("<div>").attr("id", filteredTeams[0].conference).addClass(`container-fluid container-${filteredTeams[0].conference} container-teams`).appendTo("body");
        let data = getData();
        let dataParse = JSON.parse(data);
        let navbar = $("<nav class='navbar navbar-expand-lg navbar-light bg-light'></nav>").append($("<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button>"));
        $(container).before(navbar);
        let navbarBrand = $("<a class='navbar-brand' href='#'></a>").prependTo(navbar);
        navbarBrand.append($(`<img src=${dataParse.media.img.league[conf]} width='60' height='60' class='d-inline-block align-top conference-logo' alt=''>`));
        let navbarCollapse = $("<div class='collapse navbar-collapse' id='navbarSupportedContent'></div>").appendTo(navbar);
        navbarCollapse.append($("<ul class='navbar-nav mr-auto'></ul>")
            .append($("<li class='nav-item dropdown'></li>")
                .append($("<a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Ranking</a>"))
                .append($("<div class='dropdown-menu' aria-labelledby='navbarDropdown'></div>")
                    .append($("<a class='dropdown-item btnRankingDown' href='#'>By Ascending</a>"))
                    .append($("<a class='dropdown-item btnRankingUp' href='#'>By Descending</a>"))))
            .append($("<li class='nav-item dropdown'></li>")
                .append($("<a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Name</a>"))
                .append($("<div class='dropdown-menu' aria-labelledby='navbarDropdown'></div>")
                    .append($("<a class='dropdown-item btnNameAsc' href='#'>By Ascending</a>"))
                    .append($("<a class='dropdown-item btnNameDesc' href='#'>By Descending</a>")))).append($("<li class='nav-item'></li>").append($("<button type='button' class='btn btn-secondary' data-toggle='modal' data-target='.bd-example-modal-lg'>Compare Players</button>"))));


        let rowDiv = $("<div>").addClass("row").appendTo(container);
        let showTeamsDiv = $("<div>");
        let cardDiv = $("<div class='card'>").appendTo(showTeamsDiv);
        let bodyCardDiv = $(`<div class='card-body card-body-${filteredTeams[0].conference}'>`).appendTo(cardDiv);
        let testBtn = $("<i id='btnBackToMainPage' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(container);

        filteredTeams.forEach(element => {
            showTeamsDiv = $(`<div id='${element.name}'>`).addClass("col-12 col-sm-2 col-md-4 col-lg-4").appendTo(rowDiv);
            cardDiv = $(`<div class='card'>`).appendTo(showTeamsDiv);
            bodyCardDiv = $(`<div class='card-body card-body-${filteredTeams[0].conference} card-${element.name.replace(/\s/g, "")}'>`).appendTo(cardDiv);

            bodyCardDiv
                .append($(`<img name="team" src=${element.logo} />`).attr("id", element.name).addClass("image-card-body"))
                .append($("<p>").text("Team Name").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                .append($("<p>").text("Season Record").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${element["season-record"]}`).addClass("card-body-text"))
                .append($("<p>").text("Ranking").attr("id", "btnRanking").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${element.ranking}`).addClass("card-body-text"))

        })
    }

    function showPlayers(nbaTeams, team) {
        let teamPlayers = nbaTeams.filter(t => t.name == team);
        let firstTeam = $(`<button class="btn btn-block">`).html("Starters");
        let subs = $(`<button class="btn btn-block">`).html("Substitutions");
        let containerTeams = $("<div>").attr({ "id": team })
            .addClass(`container-fluid container-${teamPlayers[0].conference} container-players`)
            .appendTo("body");
        let rowDiv = $("<div>").addClass("row").appendTo(containerTeams);
        let testBtn = $("<i id='btnBackToTeams' class='fas fa-arrow-circle-left'><span class='paraBack'>Back</span></i>").appendTo(containerTeams);

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
                bodyCardDiv = $(`<div class='card-body card-${team.replace(/\s/g, "")} card-body-${teamPlayers[0].conference}'>`).appendTo(cardDiv);



                bodyCardDiv
                    .append($(`<img name='player' src='${element.img}'/>`).attr("id", element.name).addClass(`image-card-body`))
                    .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.name}`).addClass("card-body-text"))
                    .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.nationality}`).addClass("card-body-text"))
                    .append($("<p>").text("Position").addClass("card-body-text text-prop"))
                    .append($("<p>").text(`${element.position}`).addClass("card-body-text"))
            })
        })
    }

    function statsPlayersModal(nbaTeams, team, playerFilter) {
        let teamPlayers = nbaTeams.filter(t => t.name == team);
        let player = teamPlayers[0].players.filter(p => p.name == playerFilter);
        let statsPlayer = player[0].stats.filter(s => s);
        let statsContainerDiv = $(`<div class='container-fluid stats-container container-${teamPlayers[0].conference}'>`).appendTo("body");
        let statsRowDiv = $("<div class='row'>").appendTo(statsContainerDiv);
        // let playerSearch = getSearchTwitter(player[0].name);  //// for Twitter API
        statsRowDiv.append($("<div class='col-6 col-sm-6 col-md-6 col-lg-6'>").append($("<h5>Players Stats:</h5>"))
            .append($(`<div class='card-body card-${team.replace(/\s/g, "")} card-body-${teamPlayers[0].conference}'>`)
                .append($(`<img name='player' src='${player[0].img}'/>`).addClass(`image-card-body`))
                .append($("<p>").text("Player Name").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${player[0].name}`).addClass("card-body-text"))
                .append($("<p>").text("Nationality").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${player[0].nationality}`).addClass("card-body-text"))
                .append($("<p>").text("Position").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${player[0].position}`).addClass("card-body-text"))
                .append($("<p>").text("PTS").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${statsPlayer[0].PTS}`).addClass("card-body-text"))
                .append($("<p>").text("AST").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${statsPlayer[0].AST}`).addClass("card-body-text"))
                .append($("<p>").text("REB").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${statsPlayer[0].REB}`).addClass("card-body-text"))
                .append($("<p>").text("STL").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${statsPlayer[0].STL}`).addClass("card-body-text"))
                .append($("<p>").text("BLK").addClass("card-body-text text-prop"))
                .append($("<p>").text(`${statsPlayer[0].BLK}`).addClass("card-body-text"))))
            .append($("<div class='col-6 col-sm-6 col-md-6 col-lg-6'>").append($("<h5>Youtube Feeds:</h5>"))
                .append($(`<iframe class='player-iframe' src='https://www.youtube.com/embed?listType=search&list=${player[0].name} highlights'></iframe>`))
                .append($(`<i id='${teamPlayers[0].name}' class='fas fa-arrow-circle-left btnBackToPlayers'><span id='${teamPlayers[0].name}' class='paraBack btnBackToPlayers'>Back</span></i>`)))
        console.log(statsPlayer);

    }


    /******************************* Twitter API ******************************************/

    // function getSearchTwitter(name) {
    //     let twitterSearch;
    //     $.ajax({
    //         method: "GET",
    //         url: (`https://api.twitter.com/1.1/search/tweets.json?q=${name}&result_type=popular`),
    //         async: false,
    //         success: function (data) {
    //             twitterSearch = data;
    //         },
    //         error: function (data) {
    //             console.log("Error");
    //         }

    //     })
    //     return twitterSearch;
    // }

    init();

});