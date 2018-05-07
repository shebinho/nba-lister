$(document).ready(function () {

    $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
        console.log(nba);
        $('<img>').attr('src', nba.media.img.teams.logos.ATL).addClass('nba-logo').appendTo("body");
      
        // const filteredplayers = nba.filter(nba => nba.team[0].ATL.player)
        // $("<p>")
        let saveButton = $("#saveButton");
        $(saveButton).click(function(event){
            event.preventDefault();

            let playerName = $("#player-name").val();

            for(let i = 0 ; i < nba.teams.length ; i++){
                console.log("Team Name: "+ nba.teams[i].name)
                for(let j = 0; j < 5; j++) {
                    nba.teams[i].players[j].stats.forEach(element => {
                        if(nba.teams[i].players[j].name === playerName){
                            console.log("Player Name: "+nba.teams[i].players[j].name,"\n", "Position: "+ nba.teams[i].players[j].position)
                            console.log(" PTS: " + element.PTS,"\n", "AST: "+ element.AST,"\n", "REB: "+element.REB,"\n","BLK: "+element.BLK,"\n", "STL: "+element.STL);
                        }
                        
                    });
                
               }
    
            }

        })
   
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
