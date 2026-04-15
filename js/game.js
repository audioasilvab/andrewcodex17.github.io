var config = {
    type: Phaser.AUTO,
    width: 460,
    height: 400,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 460,
        height: 400
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    render: {
        pixelArt: false,
        antialias: false,
        roundPixels: true,
        powerPreference: 'low-power'
    },
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1]
]
var platforms, player, cursors, camera;

function preload ()
{
    this.load.image('background', 'assets/background.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('player', 'assets/player.png');
}

function create ()
{
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'background');

    platforms = this.physics.add.staticGroup();

    player = this.physics.add.sprite(100, -100, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false); //evita sacarlo de la pantalla

    player.body.setGravityY(400)

    this.physics.add.collider(player, platforms);

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == 1) {
                platforms.create(x * 37, y * 37, 'platform');
            }
        }
    }

    camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, 2000, 600);
    camera.setLerp(0.1, 0.1);
    camera.setZoom(1.25);
    //camera.setBackgroundColor('#2c3e50');
    //camera.setAlpha(0.8);
}

function update ()
{
    /*if (true)
{
    //player.setVelocityX(-160);
    //player.setFlipX(true);

    if (player.body.touching.down) {
        player.setVelocityY(-70);  

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-440);
        }
    }
}
else */
    if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
    
        if (player.body.touching.down) {
            player.setVelocityY(-70); 
        
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-440);
            }
        }
    } if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
    
        if (player.body.touching.down) {
            player.setVelocityY(-70); 
        
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-440);
            }
        }
    } else if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-440);
    } else {
        player.setVelocityX(0);
    }
}
