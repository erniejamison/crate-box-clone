var mainState = {

	// We define the 3 default Phaser functions

	preload: function() {
		// Load the player
		game.load.image('player', 'assets/player.png');
	},

	create: function() {
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;

		// Display the player
		// Position the sprite on the screen and set the anchor point to center
		// Using this allows use of player everywhere in game state
		this.player = game.add.sprite(game.width/2, game.height/2, 'player');
		this.player.anchor.setTo(0.5, 0.5);

		// Tell Phaser that the player will use the Arcade physics engine
		game.physics.arcade.enable(this.player);
		// Add vertical gravity to the player
		this.player.body.gravity.y = 500;
	},

	update: function() {
		// This function is called 60 times per second
		// It contains the game's logic
	},
	// And here we will later add some of our own functions
};

// Create a 500px by 340px game in the 'gameDiv' of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
