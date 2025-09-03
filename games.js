class Game {
	constructor(url, name, image='', creation_date=null) {
		this.url = url;
		this.name = name;
		this.image = image;

		if (creation_date)
			this.creation_date = creation_date;
		else
			this.creation_date = new Date(2023, 1, 1);
	}

	htmlify() {
		let addonTxt = '<a class="like">NEW</a>';

		if ((new Date()) - this.creation_date > (7 * 24 * 3600 * 1000)) {
			addonTxt = '';
		}

		return '<h1><a href="' + normalize_game_url(this.url) + '">' + this.name + '</a>' + addonTxt + '</h1>';
	}
}

var games = [
	new Game("/paper-io-3d/", "Paper.io 3D", "paper-io-3d.jpg"),
	new Game("/geometrydash/", "Geometry Dash", "geometrydash.png"),
	new Game("/moto-x3m/", "Moto X3M", "moto-x3m.png"),
	new Game("/moto-x3m-winter/", "Moto X3M Winter Edition", "moto-x3m-winter.webp"),
	new Game("/moto-x3m-pool-party/", "Moto X3M Pool Party Edition", "moto-x3m-pool-party.webp"),
	new Game("/drift-hunters/", "Drift Hunters", "drift-hunters.png"),
	new Game("https://stennen.github.io/games/cookies/", "Cookie Clicker", "cookie-clicker.webp"),
	new Game("https://stennen.github.io/games/2048/", "2048", "2048.png"),
	new Game("/wheelie-bike/", "Wheelie Bike 2", "wheelie-bike-2.jpg"),
	new Game("/bottle-flip-3d/", "Bottle Flip 3D", "bottle-flip-3d-game.png"),
	new Game("/short-ride/", "Short Ride", "short-ride.jpg"),
	new Game("/moto-x3m-3/", "Moto X3M 3", "moto-x3m-3.png"),
	new Game("/moto-x3m-2/", "Moto X3M 2", "moto-x3m-2.webp"),
	new Game("/slope/", "Slope", "slope-icon.jpg"),
	new Game("/wheeliebike/", "Wheelie Bike", "wheelie-bikes.png"),
	new Game("/traffic-run/", "Traffic Run", "traffic-run-online.webp"),
	new Game("/1v1-lol/", "1v1.LOL", "1v1-lol_1x1.jfif"),
	//["/drive-mad/", "Drive Mad"],
	new Game("/pixel-warfare/", "Pixel Warfare", "pixel-warfare_small.webp"),
	new Game("/hole-io/", "Hole.IO", "hole-io.png"),
	new Game("/moto-x3m-spookyland/", "Moto X3M Spooky Land Edition", "moto-x3m-spooky-land_1x1-cover.png"),
	new Game("/tunnel-rush/", "Tunnel Rush", "tunnel-rush.jpg"),
	new Game("/traffic-mania/", "Traffic Mania", "traffic-mania.webp"),
	new Game("/happywheels/", "Happy Wheels", "happy-wheels.png"),
	new Game("/CaseClicker/", "Case Clicker - CSGO", "case-clicker.webp"),
	new Game("/helix-jump/", "Helix Jump", "helix-jump.webp"),
	new Game("/paper-io-2/", "Paper.IO 2", "paper-io-2.jfif"),
	new Game("/snowball-io/", "Snowball.IO", "snowball-io.jpg"),
	new Game("/fireboy-and-watergirl/", "Fireboy & Watergirl", "fboy-and-wgirl.jpg"),
	new Game("/gun-spin/", "Gun Spin", "gunspin.webp"),
	new Game("/overkill-apache/", "Overkill Apache", "apache-overkill.jpg"),
	new Game("/neon-pong/", "Neon Pong", "neon-pong.webp"),
	new Game("/drift-hunters/second_mirror.html", "Drift Hunters (2nd Link)", "drift-hunters.png"),
	new Game("/time-shooter-2/", "Time Shooter 2", "time-shooter-2_1x1-cover.png"),
	new Game("/jacksmith/", "Jacksmith", "jacksmith.png"),
	new Game("/stunt-master/", "City Car Driving Simulator: Stunt Master", "city-car-driving-simulator-ultimate_1x1-cover.png"),
	new Game("/drift-hunters/third_miror.html", "Drift Hunters (3rd Link)", "drift-hunters.png"),
	new Game("/fruit-merge/", "Fruit Merge", "fruit-merge.jpg"),
	new Game("/gold-digger/", "Gold Digger FRVR", "gold-digger-frvr_1x1-cover.png"),
	new Game("/bitlife/", "BitLife Life Simulator", "bitlife.png"),
	new Game("/moto-run/frame.html", "Moto Traffic Run 3D", "moto-run-crazy.png"),
	new Game("/geometry_arrow/", "Geometry Arrow", "../geometry_arrow/boot_splash.png", new Date(2025, 8, 31))
];