

current_map.b_tiles = buildings_tiles();

update_build_map();

build_graph();


var buttons = load_buttons();


function destroy_building()
{
    for (var i = 0; i < units.length; ++i)
    {
        if (selected_units[0].x == units[i].x && selected_units[0].y == units[i].y)
        {
            var price = prices[selected_units[0].building_class.GetLabel()];
            current_game.gold += Math.floor(price.gold / 2);
            current_game.material += Math.floor(price.material / 2);
            
            delete units[i];
            selected_units.length = 0;

            current_map.b_tiles = buildings_tiles();
            update_build_map();
            build_graph();

            break;
        }
    }
}

/**
* Construction of a building
* 
* @param name
*/
function build(name)
{
    var gold = current_game.gold;
    var material = current_game.material;
    
    var price = prices[name];

    if (price)
    {
        if (gold >= price['gold'] && material >= price['material'])
        {
            //
            current_game.constructing = true;
            
            // Knights
            if (name == 'farm')
            {
                current_game.building_built_class = building_knights_farm;
                current_game.building_built_name = 'farm';
            }
            else if (name == 'woodcutter')
            {
                current_game.building_built_class = building_knights_woodcutter;
                current_game.building_built_name = 'woodcutter';
            }
            else if (name == 'kgoldmine')
            {
                current_game.building_built_class = building_knights_mine;
                current_game.building_built_name = 'kgoldmine';
            }
            else if (name == 'ktower')
            {
                current_game.building_built_class = building_knights_tower;
                current_game.building_built_name = 'ktower';
            }
            else if (name == 'kbarracks')
            {
                current_game.building_built_class = building_knights_barracks;
                current_game.building_built_name = 'kbarracks';
            }
                      
            // Skeletons
            else if (name == 'temple')
            {
                current_game.building_built_class = building_skeletons_farm;
                current_game.building_built_name = 'temple';
            }
            else if (name == 'mason')
            {
                current_game.building_built_class = building_skeletons_woodcutter;
                current_game.building_built_name = 'mason';
            }
            else if (name == 'sgoldmine')
            {
                current_game.building_built_class = building_skeletons_mine;
                current_game.building_built_name = 'sgoldmine';
            }
            else if (name == 'stower')
            {
                current_game.building_built_class = building_skeletons_tower;
                current_game.building_built_name = 'stower';
            }
            else if (name == 'sbarracks')
            {
                current_game.building_built_class = building_skeletons_barracks;
                current_game.building_built_name = 'sbarracks';
            }
        }
        else
        {
            popups['not_enough_to_build'].visible = true;
        }
    }
}

function finalize_build()
{
    if (current_game.construction_allowed)
    {
        //  console.log(current_game.building_built_class);
        var b = new Building(current_game.building_built_class);

        //var w = Math.floor((mouse_pos.x + View.x) / 32);
        //var h = Math.floor((mouse_pos.y + View.y) / 32);

        b.x = current_game.construction_x;
        b.y = current_game.construction_y;
        units.push(b);
        
        // substract price
        current_game.gold -= prices[current_game.building_built_name].gold;
        current_game.material -= prices[current_game.building_built_name].material;
        
        // map stuff...
        current_map.b_tiles = buildings_tiles();
        update_build_map();
        build_graph();
    }
}













//u1 = new Unit(unit_skeleton_worker);
u2 = new Unit(unit_knights_worker);

//u1.health = 17;

//u2.x = 100;
//u2.y = 100;


units.push(u2);



u2.SetTile(32);









/*
var remove_from_graph = function (b)
{
for (var x = 0; x < b.building_class.size[0]; ++x)
{
for (var y = 0; y < b.building_class.size[1]; ++y)
{
if ( ! (x in b.building_class.rows_top_layer))
{
var rem_key = i - 1;
delete graph[i][rem_key];
}
}    
}
}*/





//path = dijkstra.find_path(graph, 29, 81);
//alert(path);



/**
* LMB Click
* 
* @param event
*/
lmb_click = function(event){
    event.preventDefault();

    var search = true;
    
    // finalizing construction of a building
    // has to be beofre clicking a button
    if (current_game.constructing)
    {
        finalize_build();
        
        current_game.constructing = false;
        current_game.building_built_class = null;
    }
    
    // Buttons click
    for (var b in buttons)
    {
        if (Calc.in_rect(mouse_pos.x, mouse_pos.y, buttons[b].GetRect()) && buttons[b].visible)
        {
            search = false;
            if (typeof buttons[b].click == "function")
            {            
                buttons[b].click();
            }
            break;
        }
    }

    if (search)
    {
        // Selecting units & buildings
        if ( ! select_units(event.clientX, event.clientY))
            select_building(event.clientX, event.clientY)
    }
    
    
}

/**
* RMB Click
* 
* @param event
*/
rmb_click = function(event){
    event.preventDefault();

    // moving only one selected unit
    if (selected_units.length == 1)
    {
        // selected unit
        var u = selected_units[0];

        if (u.what == 'unit')
        {

            if (u.IsMoving())
            {
                //u.road.splice(1, u.road.length - 2);
                //alert(u.road);
                //return 0;
            }
            else
                {

                //u.road.length = 0;
                u.road_travelled = 0;

                //var tile_start = get_tile(u.x, u.y);
                var tile_start = u.current_tile;
                console.log(tile_start + " : " + get_tile_by_key(tile_start));

                var target_x = Calc.constrain(event.clientX + View.x, 0, View.map_width);
                var target_y = Calc.constrain(event.clientY + View.y, 0, View.map_height);

                var tile_finish = get_tile(target_x, target_y);

                //console.log(graph);

                try
                {
                    var path = dijkstra.find_path(graph, parseInt(tile_start), get_tile_key_mat(tile_finish));
                    u.road = path;
                    console.log(path);
                }
                catch(e)
                {
                    // path not found
                    u.road.length = 0;
                    console.log("Path not found");
                }
            }   
        }
    }
    
    
    // Turning off highlight for a new building (while preparing to build)
    if (current_game.constructing)
    {
        current_game.constructing = false;
        current_game.building_built_class = null;
        current_game.building_built_name = '';
    }
}


var find_workers_path = function(u)
{
    //u.workers_job[0] = -1;
    //u.workers_job[1] = -1;
    //u.workers_dest = -1;
    //u.road.length = 0;
    
    // find trees
    for (var i in units)
    {
        if (units[i] && units[i].what == 'material')
        {
            if (units[i].material_class.type == 'tree')
            {
                //console.log(units[i].x + " " + units[i].y);

                var found = false;

                try
                {
                    var dest = get_tile_key(units[i].x + 1, units[i].y);
                    var path = dijkstra.find_path(graph, u.workers_job[0], dest);
                    u.workers_job[1] = dest;
                    u.workers_dest = i;
                    u.road = path;
                    found = true;
                }
                catch(e)
                {
                    // path not found
                    u.road.length = 0;
                    //console.log("Path not found");
                    found = false;
                }

                if (found)
                    break;
            }
        }
    }
}


var update = function(ms){

    //console.log(ms);
    /**
    * Movement
    */
    for (var i = 0; i < units.length; ++i)
    {
        if (units[i] && units[i].what == 'unit')
            units[i].move(ms);
    }

    /**
    * Checking if mouse is withing buttons rect to show hint etc.
    */
    for (var b in buttons)
    {
        if (buttons[b].visible)
        {
            if (Calc.in_rect(mouse_pos.x, mouse_pos.y, buttons[b].GetRect()))
            {
                buttons[b].show_hint = true;
            }
            else
            {
                buttons[b].show_hint = false;
            }
        }
    }

    /** 
    * Drawing menu buttons when necessary
    */
    if (selected_units.length == 1 && selected_units[0].what == 'building')
    {
        buttons['destroy_building'].visible = true;
        buttons['building_health'].visible = true;

        if (selected_units[0].building_class.GetType() == BuildingType.MAIN && selected_units[0].construction_progress >= 100)
        {
            buttons['destroy_building'].visible = false;
            
            if (current_game.player1_side_id == GameSide.KNIGHTS)
            {
                buttons['build_farm'].visible = true;
                buttons['build_woodcutter'].visible = true;
                buttons['build_ktower'].visible = true;
                buttons['build_kbarracks'].visible = true;
                buttons['build_kgoldmine'].visible = true;
            }
            else if (current_game.player1_side_id == GameSide.SKELETONS)
            {
                buttons['build_temple'].visible = true;
                buttons['build_mason'].visible = true;
                buttons['build_stower'].visible = true;
                buttons['build_sbarracks'].visible = true;
                buttons['build_sgoldmine'].visible = true;
            }

        }
        else
        {
            buttons['build_farm'].visible = false;
            buttons['build_woodcutter'].visible = false;
            buttons['build_ktower'].visible = false;
            buttons['build_kbarracks'].visible = false;
            buttons['build_kgoldmine'].visible = false;
            
            buttons['build_temple'].visible = false;
            buttons['build_mason'].visible = false;
            buttons['build_stower'].visible = false;
            buttons['build_sbarracks'].visible = false;
            buttons['build_sgoldmine'].visible = false;
        }
    }
    else
    {
        buttons['destroy_building'].visible = false;
        buttons['building_health'].visible = false;

        buttons['build_farm'].visible = false;
        buttons['build_woodcutter'].visible = false;
        buttons['build_ktower'].visible = false;
        buttons['build_kbarracks'].visible = false;
        buttons['build_kgoldmine'].visible = false;
                
        buttons['build_temple'].visible = false;
        buttons['build_mason'].visible = false;
        buttons['build_stower'].visible = false;
        buttons['build_sbarracks'].visible = false;
        buttons['build_sgoldmine'].visible = false;
    }
    
    /**
    * Worker's path
    */
    
    for(u in units)
    {
        if(units[u] && units[u].what == 'unit' && units[u].unit_class.GetType() == UnitType.WORKER)
        {
            if (units[u].road.length == 0)
            {
                units[u].rest_time += (ms * config.fps);
                
                if (units[u].rest_time > 100)
                {
                    units[u].workers_job.reverse();
                    var path = dijkstra.find_path(graph, units[u].workers_job[0], units[u].workers_job[1]);
                    
                    units[u].road = path;
                    
                    units[u].rest_time = 0;
                    
                    if(units[u].at_home == false)
                    {        
                        var material_id = units[u].workers_dest;
                        
                        if (material_id > -1) 
                        {
                            // add material
                            current_game.material++;
                            
                            units[material_id].supply -= 30;

                            if (units[material_id].supply <= 0)
                            {
                                delete units[material_id];

                                // gotta find another material source
                                find_workers_path(units[u]);
                            }

                        }
                    }
                    
                    units[u].at_home = !units[u].at_home;
                }
            }
            
            
        }
    }
    
    /**
    * Updating building construction
    */
    
    for (b in units)
    {
        if (units[b] && units[b].what == 'building')
        {
            if (units[b].construction_progress < 100)
            {
                //console.log(ms);
                if (units[b].building_class != null)
                {
                    units[b].construction_progress += (ms * config.fps / units[b].building_class.construction_time);
                }
                else
                {
                    console.log(units[b] + ' buildingclass is null.');
                }
            }
            else if (units[b].construction_progress >= 100 && units[b].worker == null)
            {
                // creating unit associated with the building
                
                if (units[b].building_class.GetType() == BuildingType.MATERIAL && units[b].building_class.GetSide() == GameSide.KNIGHTS)
                {
                    var u = new Unit(unit_knights_worker);
                    var tile = get_tile_key(units[b].x + units[b].building_class.size[0], units[b].y + units[b].building_class.size[1]);
                    u.SetTile(tile);
                    u.workers_job[0] = tile;
                    units.push(u);
                    units[b].worker = u;
                    
                    find_workers_path(u);
                }
                
                
                
            }
        }
    }
}


// render

var main = function (){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);

    View.move();

    if (Date.now() - current_game.tiles_drawing_time > 2)
    {
        render();
    }
    current_game.tiles_drawing_time = Date.now();
    

    then = now;
};

var then = Date.now();
setInterval(main, 0);