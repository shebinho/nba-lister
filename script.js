$(document).ready(function () {

    $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
        console.log(nba);
        $('<img>').attr('src', nba.media.img.teams.logos.ATL).addClass('nba-logo').appendTo("body");
      
        // const filteredplayers = nba.filter(nba => nba.team[0].ATL.player)
        // $("<p>")
        for(let i = 0 ; i < nba.teams.length ; i++){
            for(let j = 0; j < nba.teams[i].players.length; j++) {
                console.log(nba.teams[i].players[j].name);
           }

        }



        console.log(nba.teams.length)
    });
    

})