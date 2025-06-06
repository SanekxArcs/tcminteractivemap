var bl_container_icon = L.icon({
    iconUrl: 'img/BikeLovers/bl_container.png',
    iconSize: [68, 75],
    iconAnchor: [34,75],
    popupAnchor: [0,-60],
});

var bl_event_icon = L.icon({
    iconUrl: 'img/BikeLovers/bl_event.png',
    iconSize: [35, 45],
    iconAnchor: [17.5,45],
    popupAnchor: [0,-35],
});

bl_container_group = [];
bl_events_group = [];
bl_photo_ops_group = [];
bl_feats_group = [];
bl_collectibles_group = [];

//CONTAINER
bl_container_marker = L.marker([2498.001828, 2199.5], {icon:bl_container_icon});
bl_container_marker.bindPopup('<b>Bike Lovers</b><br>\
                               <i>Container</i>', {
    className: "hstPopup"
})

//EVENTS
//Event 01
bl_event01_marker = L.marker([2852.877637, 2047], {icon:bl_event_icon});
bl_event01_marker.bindPopup("<b style=\"font-size:20px\">GP Glory</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(1/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Morning</span><br>\
                              <span><b>Bike:</b> KTM RC16 Red Bull Team</span><br>\
                              <span><b>Category:</b> Racing</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">21,600</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">40,500</span></span><br>", {
    className: "hstPopup"
});

//Event 02
bl_event02_marker = L.marker([2583.942175, 1523.8125], {icon:bl_event_icon});
bl_event02_marker.bindPopup("<b style=\"font-size:20px\">Riveround Rumble</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(2/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Sunrise</span><br>\
                              <span><b>Bike:</b> Ducatti Hypermotard</span><br>\
                              <span><b>Category:</b> Rally Raid</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">9,600</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">18,000</span></span><br>", {
    className: "hstPopup"
});

//Event 03
bl_event03_marker = L.marker([2964.130613, 2029.48485], {icon:bl_event_icon});
bl_event03_marker.bindPopup("<b style=\"font-size:20px\">Haleiwa Heyday</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(3/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Sunrise</span><br>\
                              <span><b>Bike:</b> Honda CB1000R Neo Sports Café</span><br>\
                              <span><b>Category:</b> Street Tier 2</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">9,600</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">18,000</span></span><br>", {
    className: "hstPopup"
});

//Event 04
bl_event04_marker = L.marker([2739.636777, 2836], {icon:bl_event_icon});
bl_event04_marker.bindPopup("<b style=\"font-size:20px\">Beach Bonanza</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(4/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Morning</span><br>\
                              <span><b>Bike:</b> KTM 450 EXC Red Bull Edition</span><br>\
                              <span><b>Category:</b> Motocross</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">8,400</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">15,750</span></span><br>", {
    className: "hstPopup"
});

//Event 05
bl_event05_marker = L.marker([2550.483363, 3008.739354], {icon:bl_event_icon});
bl_event05_marker.bindPopup("<b style=\"font-size:20px\">Roadie Rumble</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(5/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Sunset</span><br>\
                              <span><b>Bike:</b> Harley Davidson Iron 883</span><br>\
                              <span><b>Category:</b> Street Tier 1</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">18,000</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">33,750</span></span><br>", {
    className: "hstPopup"
});

//Event 06
bl_event06_marker = L.marker([1238.46428, 3409.580511], {icon:bl_event_icon});
bl_event06_marker.bindPopup("<b style=\"font-size:20px\">Hectic Hanauma</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(6/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Afternoon</span><br>\
                              <span><b>Bike:</b> Suzuki GSX-RR</span><br>\
                              <span><b>Category:</b> Racing</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">18,000</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">33,750</span></span><br>", {
    className: "hstPopup"
});

//Event 07
bl_event07_marker = L.marker([1301.727741, 2716.439088], {icon:bl_event_icon});
bl_event07_marker.bindPopup("<b style=\"font-size:20px\">Midnight Magic</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(7/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Dusk</span><br>\
                              <span><b>Bike:</b> Ducatti Panigale R</span><br>\
                              <span><b>Category:</b> Street Tier 2</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">10,800</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">20,250</span></span><br>", {
    className: "hstPopup"
});

//Event 08
bl_event08_marker = L.marker([1295.717905, 2556.014237], {icon:bl_event_icon});
bl_event08_marker.bindPopup("<b style=\"font-size:20px\">Airtime Advantage</b><br>\
                              <i>Event</i><br>\
                              <span><b>Bike Lovers(8/8)</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Event type:</b> Race</span><br>\
                              <span><b>Weather:</b> Afternoon</span><br>\
                              <span><b>Bike:</b> Suzuki RM-Z450</span><br>\
                              <span><b>Category:</b> Motocross</span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/blue_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">12,000</span></span><br>\
                              <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">22,500</span></span><br>", {
    className: "hstPopup"
});

//FEATS
var BLfeatsArr = [[1684.026155, 3525, "slalom", "Waimanalo", "Slalom", "4,010 PTS", "2,880", "5,400"],  //Feat 01
                  [2673.45594, 2656.95373, "slalom", "Hau'ula Forest", "Slalom", "5,250 PTS", "2,880", "5,400"],  //Feat 02
                  [2680.776928, 2366.5, "speedtrap", "Wahiawa Forest", "Speedtrap", "160.0 km/h", "960", "1,800"],  //Feat 03
                  [2665.647637, 2195.920109, "speedtrap", "Wahiawa Field", "Speedtrap", "210.0 km/h", "960", "1,800"],  //Feat 04
                  [2710.559358, 1941.715221, "escape", "Hale'au'au Gulch", "Escape", "690 m", "2,880", "5,400"],  //Feat 05
                  [2745.196156, 1898.935261, "slalom", "Peacock Road", "Slalom", "4,320 PTS", "2,880", "5,400"],  //Feat 06
                 ]

function createBLFeatsMarkers(featsArr) {
    for(var i = 0; i < featsArr.length; i++) {
        window["bl_feat" + i + "_marker"] = L.marker([featsArr[i][0], featsArr[i][1]], {icon:window[featsArr[i][2] +"_icon"]});
        window["bl_feat" + i + "_marker"].bindPopup("<b style=\"font-size:20px\">Rider Feats - " + featsArr[i][3] + "</b><br>\
                                     <i>Feat - " + featsArr[i][4] + "</i><br>\
                                     <span><b>Bike Lovers</b></span><br>\
                                     <hr style=\"background-color:white;height:0.5px\">\
                                     <span><b>Objective:</b> " + featsArr[i][5] + "</span><br>\
                                     <span style=\"display:inline-block;\"><img src=\"img/Misc/green_xp.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">" + featsArr[i][6] + "</span></span><br>\
                                     <span style=\"display:inline-block;\"><img src=\"img/Misc/bucks.png\" style=\"vertical-align:middle; width:25%; height:25%\"> <span style=\"vertical-align:middle;\">" + featsArr[i][7] + "</span></span><br>", {
            className: "hstPopup"
        });
    }
}

createBLFeatsMarkers(BLfeatsArr);

//PHOTO OPS
//Photo Ops 1 Rider Views - Urbex Ride
bl_photo_ops01_marker = L.marker([1652.028412, 3668.823534], {icon:photo_op_icon});
bl_photo_ops01_marker.bindPopup("<b style=\"font-size:20px\">Rider Views - Urbex Ride</b><br>\
                              <i>Photo Ops</i><br>\
                              <span><b>Bike Lovers</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Requirements</b></span><br>\
                              <span>- Bike</span><br>\
                              <span>- Jump</span><br>\
                              <span>- ruins of the Coconut Resort</span><br>", {
    className: "hstPopup"
});

//Photo Ops 2 Rider Views - Giant Tiki
bl_photo_ops02_marker = L.marker([2730.162307, 2832.227824], {icon:photo_op_icon});
bl_photo_ops02_marker.bindPopup("<b style=\"font-size:20px\">Rider Views - Giant Tiki</b><br>\
                              <i>Photo Ops</i><br>\
                              <span><b>Bike Lovers</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Requirements</b></span><br>\
                              <span>- Motocross Bike</span><br>\
                              <span>- Giant Tiki</span><br>\
                              <span>- Ma'akua Black Beach</span><br>", {
    className: "hstPopup"
});

//Photo Ops 3 Rider Views - Control Tower
bl_photo_ops03_marker = L.marker([1343.269359, 2379.106183], {icon:photo_op_icon});
bl_photo_ops03_marker.bindPopup("<b style=\"font-size:20px\">Rider Views - Control Tower</b><br>\
                              <i>Photo Ops</i><br>\
                              <span><b>Bike Lovers</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Requirements</b></span><br>\
                              <span>- Bike</span><br>\
                              <span>- Wheelie</span><br>\
                              <span>- Oahu Airport control tower in the background</span><br>", {
    className: "hstPopup"
});

//Photo Ops 4 Rider Views - Gas Station
bl_photo_ops04_marker = L.marker([2441.933422, 2223.3125], {icon:photo_op_icon});
bl_photo_ops04_marker.bindPopup("<b style=\"font-size:20px\">Rider Views - Gas Station</b><br>\
                              <i>Photo Ops</i><br>\
                              <span><b>Bike Lovers</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Requirements</b></span><br>\
                              <span>- KTM RC16 Red Bull Team</span><br>\
                              <span>- Burn</span><br>\
                              <span>- Gas station</span><br>\
                              <span>- Wahiawa</span><br>", {
    className: "hstPopup"
});

//Photo Ops 5 Rider Views - Loops
bl_photo_ops05_marker = L.marker([1452.98536, 3362.646298], {icon:photo_op_icon});
bl_photo_ops05_marker.bindPopup("<b style=\"font-size:20px\">Rider Views - Loops</b><br>\
                              <i>Photo Ops</i><br>\
                              <span><b>Bike Lovers</b></span><br>\
                              <hr style=\"background-color:white;height:0.5px\">\
                              <span><b>Requirements</b></span><br>\
                              <span>- Bike</span><br>\
                              <span>- The top of the double loop</span><br>\
                              <span>- Motorfest Grounds</span><br>", {
    className: "hstPopup"
});

//COLLECTIBLES
//Rider Helmets
//Collectible 1 Rider Helmets
bl_collectible01_marker = L.marker([2824.630203, 2045.625], {icon:collectible_icon});
bl_collectible01_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 2 Rider Helmets
bl_collectible02_marker = L.marker([2978.377496, 2015.625], {icon:collectible_icon});
bl_collectible02_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 3 Rider Helmets
bl_collectible03_marker = L.marker([2580.010476, 1541.125], {icon:collectible_icon});
bl_collectible03_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 4 Rider Helmets
bl_collectible04_marker = L.marker([2573.896882, 3008.099397], {icon:collectible_icon});
bl_collectible04_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 5 Rider Helmets
bl_collectible05_marker = L.marker([2754.504675, 2842], {icon:collectible_icon});
bl_collectible05_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 6 Rider Helmets
bl_collectible06_marker = L.marker([1234.083655, 3414.144558], {icon:collectible_icon});
bl_collectible06_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 7 Rider Helmets
bl_collectible07_marker = L.marker([1286.438844, 2696.993652], {icon:collectible_icon});
bl_collectible07_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

//Collectible 8 Rider Helmets
bl_collectible08_marker = L.marker([1310.128909, 2585.005615], {icon:collectible_icon});
bl_collectible08_marker.bindPopup("<b style=\"font-size:20px\">Bike Lovers</b><br>\
                              <i>Collectible</i><br>\
                              <span><b>Challenge:</b> Rider Helmets</span><br>", {
    className: "hstPopup"
});

bl_container_group.push(bl_container_marker);

for(var i = 1; i <= 8; i++) {
    if(i < 10) {
        bl_events_group.push(window["bl_event0" + i + "_marker"]);
    }
    else {
        bl_events_group.push(window["bl_event" + i + "_marker"]);
    }
}

for(var i = 0; i <= 5; i++) {
    bl_feats_group.push(window["bl_feat" + i + "_marker"]);
}

for(var i = 1; i <= 5; i++) {
    if(i < 10) {
        bl_photo_ops_group.push(window["bl_photo_ops0" + i + "_marker"]);
    }
    else {
        bl_photo_ops_group.push(window["bl_photo_ops" + i + "_marker"]);
    }
}

for(var i = 1; i <= 8; i++) {
    if(i < 10) {
        bl_collectibles_group.push(window["bl_collectible0" + i + "_marker"]);
    }
    else {
        bl_collectibles_group.push(window["bl_collectible" + i + "_marker"]);
    }
}

markers_canvas.addMarkers(bl_container_group);
markers_canvas.addMarkers(bl_events_group);
markers_canvas.addMarkers(bl_collectibles_group);
markers_canvas.addMarkers(bl_photo_ops_group);
markers_canvas.addMarkers(bl_feats_group);