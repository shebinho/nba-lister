$(document).ready(function () {

    $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
        console.log(nba);
        $('<img>').attr('src', nba.media.img.teams.logos.ATL).addClass('nba-logo').appendTo("body");
      
        // const filteredplayers = nba.filter(nba => nba.team[0].ATL.player)
        // $("<p>")
        for(let i = 0 ; i < nba.teams.length ; i++){
            console.log("Team Name: "+ nba.teams[i].name)
            for(let j = 0; j < nba.teams[i].players.length; j++) {
                console.log("Player Name: "+nba.teams[i].players[j].name)
                nba.teams[i].players[j].stats.forEach(element => {
                    console.log(" PTS: " + element.PTS,"\n", "AST: "+ element.AST,"\n", "REB: "+element.REB,"\n","BLK: "+element.BLK,"\n", "STL: "+element.STL);
                });
           }

        }

    });
    

})
