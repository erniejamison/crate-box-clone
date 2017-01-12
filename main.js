var mainState = {
	preload: function() {
		// Load the player
		game.load.image('player', 'assets/player.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
	},

	create: function() {
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;

		// Tell Phaser to use the arrow keys for player control
		this.cursor = game.input.keyboard.createCursorKeys();

		// Display the player
		// Position the sprite on the screen and set the anchor point to center
		// Using 'this' allows use of player everywhere in game state
		this.player = game.add.sprite(game.width/2, game.height/2, 'player');
		this.player.anchor.setTo(0.5, 0.5);

		// Tell Phaser that the player will use the Arcade physics engine
		game.physics.arcade.enable(this.player);
		// Add vertical gravity to the player
		this.player.body.gravity.y = 500;

		// // Create the left wall
		// // Add Arcade physics to the wall for collisions with the player
		// // Set property so wall does not move
		// var leftWall = game.add.sprite(0, 0, 'wallV');
		// game.physics.arcade.enable(leftWall);
		// leftWall.body.immovable = true;
		//
		// // Reapeat above for right wallV
		// var rightWall = game.add.sprite(0, 0, 'wallH');
		// game.physics.arcade.enable(rightWall);
		// rightWall.body.immovable = true;

		// Use Phaser groups to avoid messy code for walls, DRY
		// Create new group
		// this.walls = game.add.group();
		//
		// // Add Arcade physics to the whole group
		// this.walls.enableBody = true;
		//
		// // Create 2 walls in the group
		// game.add.sprite(0 , 0, 'wallV', this.walls); // Left wall
		// game.add.sprite(0, 0, 'wallH', this.walls); // Right wall
		//
		// // Set all walls to be immovable
		// this.walls.setAll('body.immovable', true);

		this.createWorld();
	},

	update: function() {
		// This function is called 60 times per second
		// It contains the game's logic

		// Use 'this' to call a function from our state
		this.movePlayer();
	},

	// Handles all of the players movements
	movePlayer: function() {
		// If the left arrow key is pressed
		if (this.cursor.left.isDown) {
			// Move the player left
			// The velocity is in pixels per second
			this.player.body.velocity.x = -200;
		}

		// If the right arrow key is pressed
		else if (this.cursor.right.isDown) {
			// Move the player to the right
			this.player.body.velocity.x = 200;
		}

		// If neither right nor left arrow keys is pressed
		else {
			// Stop the player
			this.player.body.velocity.x = 0;
		}

		// If the up arrow key is pressed and the player is on the ground
		if (this.cursor.up.isDown && this.player.body.touching.down) {
			// Player jumps
			this.player.body.velocity.y = -320;
		}
	},

	createWorld: function() {
		// Create the walls group with Arcade physics
		this.walls = game.add.group();
		this.walls.enableBody = true;

		// Create 10 walls in the group
		game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
		game.add.sprite(480, 0, 'wallV', 0, this.walls); // right

		game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
		game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
		game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
		game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right

		game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
		game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);

		// Set all walls to be immovable
		this.walls.setAll('body.immovable', true);
	}
};

// Create a 500px by 340px game in the 'gameDiv' of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
