$(document).ready(function () {
    
    //main page
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const container = document.querySelector(".container");
    
    left.addEventListener("mouseenter",() =>{
        container.classList.add("hover-left");
    });

    left.addEventListener("mouseleave",() =>{
        container.classList.remove("hover-left");
    });

    right.addEventListener("mouseenter",() =>{
        container.classList.add("hover-right");
    });

    right.addEventListener("mouseleave",() =>{
        container.classList.remove("hover-right");
    });

    $("#hide").click((event)=>{
        event.preventDefault();
        $("#hide").hide();
    })
    

    
        $.getJSON("https://raw.githubusercontent.com/shebinho/nba-lister/master/nba.json", (nba) => {
            // $('<img>').attr('src', nba.media.img.teams.logos.ATL).addClass('nba-logo').appendTo("body");
          
            // const filteredplayers = nba.filter(nba => nba.team[0].ATL.player)
            // $("<p>")
            let nezz = []
            let playerName;
            let saveButton = $("#saveButton");
    
            $(saveButton).click((event) => {
                event.preventDefault();
               
                 playerName = $("#player-name").val();
                 nba.teams.forEach(element => {
                    if(element.players)
                    element.players.forEach(player=>{
                        if( playerName === player.name)
                        nezz.push(player)
                        // console.log(nezz);
                    })
                })
    
                // for(let i = 0 ; i < nba.teams.length ; i++){
                //     console.log("Team Name: "+ nba.teams[i].name)
                //     for(let j = 0; j < 5; j++) {
                //         nba.teams[i].players[j].stats.forEach(element => {
                //             if(nba.teams[i].players[j].name === playerName){
                //                 console.log("Player Name: "+nba.teams[i].players[j].name,"\n", "Position: "+ nba.teams[i].players[j].position)
                //                 console.log(" PTS: " + element.PTS,"\n", "AST: "+ element.AST,"\n", "REB: "+element.REB,"\n","BLK: "+element.BLK,"\n", "STL: "+element.STL);
                //             }
                            
                //         });
                    
                //    }
        
                // }
            
                console.log(nezz[0].stats[0])

                let numberComparer = (a, b) => {
                    console.log(` Comparing ${a} and ${b}`)
                    return b - a;
                };
            })
           
           
    
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
