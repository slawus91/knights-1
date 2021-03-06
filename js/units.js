

var UnitType = {
    WORKER : 0,
    WARRIOR : 1,
    ARCHER : 2,
    KNIGHT : 3,
    SPECIAL : 4
}


var UnitClass = function(side, name, is_warrior, speed, type, strength, attack){
    
    /**
    * 0 - NPC, 1 - Knights, 2 - Skeletons
    */
    var _side = side;

    this.GetSide = function(){
        return _side;
    }

    /**
    * Warrior, Knight etc.
    */
    var _name = name;

    this.GetName = function(){
        return _name;
    }

    /**
    * True if this unit can fight
    * 
    */
    var _is_warrior = is_warrior;

    this.IsWarrior = function(){
        return _is_warrior;
    }

    /**
    * Speed of movement
    * [0 - 100]
    */
    var _speed = speed;

    this.GetSpeed = function(){
        return _speed;
    }

    /**
    * Unit's type: worker, warrior etc.
    * 
    */
    var _type = type;

    this.GetType = function(){
        return _type;
    }

    /**
    * Ability to endure opponent's attack
    * [0 - 100]
    */
    var _strength = strength;

    this.GetStrength = function(){
        return _strength;
    }

    /**
    * Power of unit's attack abilities
    * [0 - 100]
    */
    var _attack = attack;

    this.GetAttack = function(){
        return _attack;
    }

    this.image = new Image();

    // animation tilesheet
    this.walkcycle = new Image();

    // animation tilesheet
    this.fighting = new Image();
    
    // hurt animation
    this.hurt = new Image();
}

/**
* Skeletons
*/

// Worker
unit_skeletons_worker = new UnitClass(GameSide.SKELETONS, "Worker", false, 0.9, UnitType.WORKER, 30, 0);
unit_skeletons_worker.walkcycle.src = config.IMAGES_PATH + 'skeletons_worker_walk32.png';
unit_skeletons_worker.hurt.src = config.IMAGES_PATH + 'skeletons_worker_hurt32.png';

// Warrior
unit_skeletons_warrior = new UnitClass(GameSide.SKELETONS, "Warrior", true, 0.8, UnitType.KNIGHT, 40, 20);
unit_skeletons_warrior.walkcycle.src = config.IMAGES_PATH + 'skeletons_warrior_walk32.png';
unit_skeletons_warrior.fighting.src = config.IMAGES_PATH + 'skeletons_warrior_slash32.png';
unit_skeletons_warrior.hurt.src = config.IMAGES_PATH + 'skeletons_warrior_hurt32.png';

// Archer
unit_skeletons_archer = new UnitClass(GameSide.SKELETONS, "Archer", true, 0.7, UnitType.ARCHER, 70, 40);
unit_skeletons_archer.walkcycle.src = config.IMAGES_PATH + 'skeletons_archer_walk32.png';
unit_skeletons_archer.fighting.src = config.IMAGES_PATH + 'skeletons_archer_bow32.png';
unit_skeletons_archer.hurt.src = config.IMAGES_PATH + 'skeletons_archer_hurt32.png';

// Knight
unit_skeletons_knight = new UnitClass(GameSide.SKELETONS, "Knight", true, 0.7, UnitType.KNIGHT, 70, 40);
unit_skeletons_knight.walkcycle.src = config.IMAGES_PATH + 'skeletons_knight_walk32.png';
unit_skeletons_knight.fighting.src = config.IMAGES_PATH + 'skeletons_knight_slash32.png';
unit_skeletons_knight.hurt.src = config.IMAGES_PATH + 'skeletons_knight_hurt32.png';

// Monk
unit_skeletons_monk = new UnitClass(GameSide.SKELETONS, "Wizard", true, 0.7, UnitType.SPECIAL, 70, 40);
unit_skeletons_monk.walkcycle.src = config.IMAGES_PATH + 'skeletons_monk_walk32.png';
unit_skeletons_monk.fighting.src = config.IMAGES_PATH + 'skeletons_monk_spellcast32.png';
unit_skeletons_monk.hurt.src = config.IMAGES_PATH + 'skeletons_monk_hurt32.png';



/**
* Knights
*/

// Worker
unit_knights_worker = new UnitClass(GameSide.KNIGHTS, "Worker", false, 0.8, UnitType.WORKER, 30, 0);
unit_knights_worker.walkcycle.src = config.IMAGES_PATH + 'knights_worker_walk32.png';
unit_knights_worker.hurt.src = config.IMAGES_PATH + 'knights_worker_hurt32.png';

// Warrior
unit_knights_warrior = new UnitClass(GameSide.KNIGHTS, "Warrior", true, 0.8, UnitType.WARRIOR, 40, 20);
unit_knights_warrior.walkcycle.src = config.IMAGES_PATH + 'knights_warrior_walk32.png';
unit_knights_warrior.fighting.src = config.IMAGES_PATH + 'knights_warrior_thrust32.png';
unit_knights_warrior.hurt.src = config.IMAGES_PATH + 'knights_warrior_hurt32.png';

// Archer
unit_knights_archer = new UnitClass(GameSide.KNIGHTS, "Archer", true, 0.9, UnitType.ARCHER, 30, 25);
unit_knights_archer.walkcycle.src = config.IMAGES_PATH + 'knights_archer_walk32.png';
unit_knights_archer.fighting.src = config.IMAGES_PATH + 'knights_archer_bow32.png';
unit_knights_archer.hurt.src = config.IMAGES_PATH + 'knights_archer_hurt32.png';

//Knight
unit_knights_knight = new UnitClass(GameSide.KNIGHTS, "Knight", true, 0.7, UnitType.KNIGHT, 60, 60);
unit_knights_knight.walkcycle.src = config.IMAGES_PATH + 'knights_knight_walk32.png';
unit_knights_knight.fighting.src = config.IMAGES_PATH + 'knights_knight_slash32.png';
unit_knights_knight.hurt.src = config.IMAGES_PATH + 'knights_knight_hurt32.png';

// Paladin
unit_knights_paladin = new UnitClass(GameSide.KNIGHTS, "Paladin", true, 0.5, UnitType.SPECIAL, 100, 90);
unit_knights_paladin.walkcycle.src = config.IMAGES_PATH + 'knights_paladin_walk32.png';
unit_knights_paladin.fighting.src = config.IMAGES_PATH + 'knights_paladin_slash32.png';
unit_knights_paladin.hurt.src = config.IMAGES_PATH + 'knights_paladin_hurt32.png';


/**
* With this class create every single unit in the game
* 
* @param unit_class
*/
var Unit = function(unit_class){

    var that = this;
    
    this.what = 'unit';
    
    this.hash = random_str();
    
    /**
    * Unit's class i.e. one of the objects from above
    * 
    */
    this.unit_class = unit_class;

    this.health = 100;
    
    // true if played death animation
    this.played_death = false;

    this.visible = true;

    /**
    * Coordinates of the top-left corner of the image
    */
    this.x = 0;
    this.y = 0;

    this.width = 32;
    this.height = 32;
    
    this.size = 32;
    
    //this.center = { x: this.x - this.width / 2, y: this.y - this.height / 2}

    /**
    * Coordinates of the center of the unit
    */
    this.GetCenterX = function(){
        return this.x - 16;   
    }
    
    this.GetCenterY = function(){
        return this.y - 16;   
    }
    
    this.DrawUnit = function(){
        return (this.visible == true && this.health > 0);
    }

    this.GetRect = function(){
        //return [this.GetCenterX(), this.GetCenterY(), this.GetCenterX() + this.width, this.GetCenterY() + this.height];
        return [this.x, this.y, this.x + this.width, this.y + this.height];
    }

    /**
    * Keys of the tiles during movement
    */
    this.road = [];
    
    this.current_tile = -1;

    this.SetTile = function(tile)
    {
        that.current_tile = tile;
        var t =  get_tile_by_key (tile);
        that.y = t[0] * 32;
        that.x = t[1] * 32;
    }
    
    this.IsMoving = function(){
        return this.road.length > 0;
    }
    
    // is this unit in fight
    this.fighting = false;
    
    // is currently dying? :D
    this.dying = false;
    
    // at the end of the travel - try attack opposing unit
    this.try_attack = false;
    
    this.attack_target = null;

    /**
    * Needed for moving sprite
    */
    this.road_travelled = 0;

    /**
    * Current frame during walkcycle
    */
    this.current_frame = 0;

    /**
    * Current direction of movement
    */
    this.current_dir = 0;

    var _ms = 0;
    
    // 2-element array holding path the worker follows
    this.workers_job = [];
    
    // id of the tree/stone the worker is working on
    this.workers_dest = -1;
    
    // countint time the worker rests before he heads back to work
    this.rest_time = 0;
    
    // worker is at home
    this.at_home = true;

    /**
    * Returns array holding coordinates from spritesheet needed for animation
    */
    this.get_frame = function(){

        switch (this.current_dir)
        {
            case Direction.N:
               
            if (this.IsMoving() || this.fighting || this.dying)
            {
                return [this.size * this.current_frame, 0];   
            }
            else
            {
                return [0, 0];
            }


            break;

            case Direction.E:

            if (this.IsMoving() || this.fighting || this.dying)
            {
                return [this.size * this.current_frame, 3 * this.size];   
            }
            else
            {
                return [0, 3 * this.size];
            }

            break;

            case Direction.S:

            if (this.IsMoving() || this.fighting || this.dying)
            {
                return [this.size * this.current_frame, 2 * this.size];    
            }
            else
            {
                return [0, 2 * this.size];
            }

            break;

            case Direction.W:

            if (this.IsMoving() || this.fighting || this.dying)
            {
                return [this.size * this.current_frame, 1 * this.size];    
            }
            else
            {
                return [0, 1 * this.size];
            }

            break;
        }

        return [0, 0];
    }

    
    /*
    *    sets new road for unit -ss
    */
    this.set_new_road = function(tabWithNewRoad) {
        if(this.road.length > 1)
        {
                var first = this.road[0];
            //if(tabWithNewRoad.length == 1  || second != tabWithNewRoad[0])
            //{
        //        var second = this.road[1];
            //    tabWithNewRoad.unshift(second);
            //}
                tabWithNewRoad.unshift(first);
            this.road = tabWithNewRoad;
        }
        else
        {
            this.road = tabWithNewRoad;
        }
    }

    /*
    * get tile form unit start his road -ss
    */    
    this.get_start_tile_to_walk = function() {
        if(this.road.length > 1)
        {
            return this.road[1];
        }
        else if(this.IsMoving())
        {
            return this.road[0];
        }
        else
        {
            return this.current_tile;
        }
    }
    
    /*
    * search position where unit can stop when purpose title is full of other thinks-ss
    */
    this.search_last_road_position = function(curr_position,purpose_position) {
        
        if(current_map.build_map[purpose_position] == 0 )
        {
            return purpose_position;
        }
        else 
        {    
            search_way  = function(start,end) {
                if(start == end)
                    return 0;
                else if( start > end)
                    return -1;
                else
                    return 1;
            }
        
            var pos_start = get_tile_by_key(curr_position);
            var pos_end = get_tile_by_key(purpose_position);
            var purpose_position_h_normaly = pos_end[1];
            var purpose_position_v_normaly = pos_end[0];
            var walking_horizontally = search_way(pos_start[1],purpose_position_h_normaly);
            var walking_vertictally = search_way(pos_start[0],purpose_position_v_normaly);
            
            var v = purpose_position_v_normaly;
            var h = purpose_position_h_normaly;
            
            var curr_pos_for_v = v * config.map_tiles_w + purpose_position_h_normaly;
            var curr_pos_for_h = purpose_position_v_normaly * config.map_tiles_w + h;
            
            
            for(;;)
            {
                v += walking_vertictally;
                curr_pos_for_v += walking_vertictally;
                
                if(v < current_map.height && v > -1)
                {
                    if(current_map.build_map[curr_pos_for_v] == 0 )
                    {
                        return curr_pos_for_v;
                    }
                }
                else
                {
                    walking_vertictally = -walking_vertictally;
                    curr_pos_for_v = v*config.map_tiles_w+purpose_position_h_normaly;
                }
                
                h += walking_horizontally;
                curr_pos_for_h += walking_horizontally;
                
                if(h < current_map.height && h > -1)
                {
                    if(current_map.build_map[curr_pos_for_h] == 0 )
                    {
                        return curr_pos_for_h;
                    }
                }
                else
                {
                    walking_horizontally = -walking_horizontally;
                    curr_pos_for_h = purpose_position_v_normaly * config.map_tiles_w + h;
                }
            }
        }
    }
    
    
    /**
    * Attack animation for a unit
    */
    this.fight = function(ms){
        
        if (this.fighting)
        {
            _ms += ms;

            if (_ms > animation_time.attack / 100)
            {
                    that.current_frame++;
                    _ms = 0;

            }

            var frames = 0;
            var start_frame = 0;
            
            switch (that.unit_class.GetType())
            {
                case UnitType.WARRIOR:
                    frames = 8;
                break;
                
                case UnitType.KNIGHT:
                    frames = 6;
                break;
                
                case UnitType.ARCHER:
                    frames = 13;
                    start_frame = 5;
                    
                case UnitType.SPECIAL:
                
                    if (that.unit_class.GetSide() == GameSide.KNIGHTS)
                    {
                        frames = 6;
                        start_frame = 0;
                    }
                    else if (that.unit_class.GetSide() == GameSide.SKELETONS)
                    {
                        frames = 7;
                        start_frame = 0;
                    }

                break;
            }
            
            if (this.current_frame == frames)
                this.current_frame = start_frame;
        }
    }
    
    /**
    * :D
    */
    this.die = function(ms){
        
        if (this.dying)
        {
            _ms += ms;

            if (_ms > (animation_time.dying / 100))
            {
                    that.current_frame++;
                    _ms = 0;
                    
                    if (that.current_frame == 5)
                    {
                        that.current_frame = 0;
                        that.dying = false;
                        that.played_death = true;  
                        //that.visible = false;

                        console.log('zdechlk'); 
                    }   
                    
            }
            
            
        }
    }
    
    /**
    * Make unit move
    */
    this.move = function(ms){

        if(this.IsMoving() && ! this.dying)
        {
            var first = parseInt(this.road[0]);
            var second = parseInt(this.road[1]);

            var dir = current_map.get_direction(first, second);

            if (dir > -1)
                this.current_dir = dir;
            else if (dir == -1)
                this.current_frame = 0;

            switch (dir)
            {
                case Direction.N:
                    //this.y -= this.unit_class.GetSpeed() * ms;
                    this.y -= this.unit_class.GetSpeed();
                    break;

                case Direction.E:
                    //this.x += this.unit_class.GetSpeed() * ms;
                    this.x += this.unit_class.GetSpeed();
                    break;

                case Direction.S:
                    //this.y += this.unit_class.GetSpeed() * ms;
                    this.y += this.unit_class.GetSpeed();
                    break;

                case Direction.W:
                    //this.x -= this.unit_class.GetSpeed() * ms;
                    this.x -= this.unit_class.GetSpeed();
                    break;
            }

            //this.road_travelled += this.unit_class.GetSpeed() * ms;
            this.road_travelled += this.unit_class.GetSpeed();
            
            /**
            * Vital for moving sprites
            */
            
            /*
            var tmp_t = get_tile_by_key(this.current_tile);
            var t_x = tmp_t[1] * 32;
            var t_y = tmp_t[0] * 32;
            
            
            if ((Calc.is_within(this.x, t_x - 2, t_x + 2, true))
                &&
                (Calc.is_within(this.y, t_y - 2, t_y + 2, true))
                )
            {
                console.log('next tile...');
                this.current_tile = this.road[0];
                this.road_travelled = 0;
                this.road.shift();   
            }
            */
            
            //if (this.road_travelled > 31)
            if ((Calc.is_within(this.road_travelled, 31, 33, true)))
            {
                //console.log("next tile");
                
                var tile = get_tile_by_key(this.road[1]);
                
                if (tile > -1)
                {
                    this.x = tile[1] * 32;
                    this.y = tile[0] * 32;
                }      
                
                //resets place where building  can be builds -ss
                current_map.build_map_with_unit[this.current_tile] = 0;    
                
                
                this.current_tile = parseInt(this.road[0], 10);       
                
                //resets place where building  can be builds -ss
                current_map.build_map_with_unit[this.current_tile] = 0; 
                
                this.road_travelled = 0;
                this.road.shift();    
                
                // this group of lines set place where we can`t build and check that some  build is creating on our road-ss
                if(this.road.length > 0)
                {
                    current_map.build_map_with_unit[this.road[0]] =1;  
                    if(this.road.length > 1)
                    {
                        current_map.build_map_with_unit[this.road[1]] =1; 
                        //check that some build is on road
                        if(current_map.build_map[this.road[1]] != 0)
                        {
                            // If yes, we search new road to purpose, but we must check that we have free last tiles on road
                            var first  =  this.road[0];
                            var last = this.road[this.road.length-1];
                            
                            console.log("normal " + last);
                            last = this.search_last_road_position(first,last);
                            console.log("after " + last);
                            this.road = dijkstra.find_path(graph, first, last);
                        }
                    }
                }  
                
                //alert(this.road.length);
            }

            /**
            * Animation stuff
            */
            if (dir > -1)
            {
                _ms++;

                if (_ms > animation_time.walkcycle)
                {
                    this.current_frame++;
                    _ms = 0;

                }
            }

            if (this.current_frame == 9)
                this.current_frame = 0;

        }
        else if ( ! this.fighting && ! this.dying)
        {
            //set place where we can`t build -ss
            current_map.build_map_with_unit[this.current_tile] = 1;
            this.current_frame = 0;
        }
    }




}