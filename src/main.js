import kaboom from "kaboom";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 750;
const SPEED = 300;
const GAP_BETN_PIPES = 300;


// initialize context
kaboom();

// load assets
loadSprite("bean", "sprites/bean.png");
loadSprite("sad", "sprites/sad.png");

scene("game", () => {

    // define gravity
    setGravity(1600);

    // add a game object to screen
    const player = add([
        // list of components
        sprite("bean"),
        pos(80, 40),
        area(),
        body()
    ]);

    // floor
    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);

    function jump() {
        
            player.jump(JUMP_FORCE);
        
    }

    // jump when user press space
    onKeyPress("space", jump);
    onClick(jump);

    function spawnPipe() {

        const HEIGHTOFPIPE = rand(50, 400);
        
        // TOP PIPES 
        add([
            rect(90, height() ),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT - HEIGHTOFPIPE - GAP_BETN_PIPES),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "tree",
        ]);      
        
        // BOTTOM PIPES 
        add([
            rect(90, HEIGHTOFPIPE),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "tree",
        ]);

        // wait a random amount of time to spawn next tree
        wait(1.5, spawnPipe);

    }

    // start spawning trees
    spawnPipe();
    
    
    // lose if player collides with any game obj with tag "tree"
    player.onCollide("tree", () => {
        // go to "lose" scene and pass the score
        go("lose", score);
        addKaboom(player.pos);
    });

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        scale(2),
        pos((width()/2 )-30, 240),
        color(rgb(0,0,0))
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

});

scene("lose", (score) => {

    add([
        sprite("sad"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
        color(rgb(0,0,0))
    ]);
 

    add([
        text("Game Over"),
        pos(width() / 2, (height() / 2)+ 60 + 80),
        scale(2),
        anchor("center"),
        color(rgb(0,0,0))
    ]);

    add([
        text("Click to play again"),
        pos(width() / 2, (height() / 2)+ 120 + 80),
        scale(2),
        anchor("center"),
        color(rgb(0,0,0))
    ]);

    // go back to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});

go("game");