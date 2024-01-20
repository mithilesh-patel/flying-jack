import kaboom from "kaboom"

kaboom()

// load a image to a screen
loadSprite("bean", "sprites/bean.png")

// add something to the screen
add([
    sprite("bean"),
    pos(80, 40),
])

//add some modifications to it
add([
    sprite("bean"),
    pos(100, 80),
    scale(3),
    rotate(30),
    color(240, 0, 255),
])