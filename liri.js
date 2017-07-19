var twitterAuthenticate = require("./keys.js");
var fs = require('file-system');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//Twitter API Keys
var client = new Twitter({
	consumer_key: twitterAuthenticate.twitterKeys.consumer_key,
 	consumer_secret: twitterAuthenticate.twitterKeys.consumer_secret,
 	access_token_key: twitterAuthenticate.twitterKeys.access_token_key,
 	access_token_secret: twitterAuthenticate.twitterKeys.access_token_secret
});

var spotify = new Spotify({
	id: twitterAuthenticate.spotifyKeys.clientID,
	secret: twitterAuthenticate.spotifyKeys.clientSecret
});

var params = {screen_name: 'MntGoatsDilemma'};
var userInput = process.argv[2];
var userInputTwo = process.argv[3];

switch (userInput) {
  case "my-tweets":
    tweetPullAndLog();
    break;
  case "spotify-this-song":
    songPullAndLog();
    break;
  case "movie-this":
    moviePullAndLog();
    break;
}

function tweetPullAndLog() {

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  
	  	if (userInput === "my-tweets") {
	  	
	  		for(i = 0; i < tweets.length; i++) {

	  			console.log("------------------------------------------------------------");
	    		console.log("Mountain Goat Says: " + tweets[i].text);
	    		console.log("-")
	    		console.log("This is when he said it: " + tweets[i].created_at);
	    		console.log("------------------------------------------------------------");
	    		
	    		fs.appendFile("log.txt", "---------------------------------------------------------- Mountain Goat Says: " + tweets[i].text + "--- This is when he said it: " + tweets[i].created_at, function(err) {
	    			if (err) {
	      				return console.log('Error occured: ' + err);
	    			}
	  			});
	    	}
	    }
	});
};

function songPullAndLog() {
	
	spotify.search({ type: 'track', query: "'" + userInputTwo + "'" }, function(err, song) {
  		
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
	  	console.log("------------------------------------------------------------");
		console.log("Band/Artist name: " + song.tracks.items[0].artists[0].name); //Band name
		console.log("Album name: " + song.tracks.items[0].album.name);	//Album name
		console.log("Song name: " + song.tracks.items[0].name);	//Song name
		console.log("URL link to this song: " + song.tracks.items[0].external_urls.spotify);  //Song URL
		console.log("------------------------------------------------------------");

		fs.appendFile("log.txt", "---------------------------------------------------------- Band/Artist name: " + song.tracks.items[0].artists[0].name + "--- Album name: " + song.tracks.items[0].album.name + "--- Song name: " + song.tracks.items[0].name + "--- URL link to this song: " + song.tracks.items[0].external_urls.spotify);
	});
};