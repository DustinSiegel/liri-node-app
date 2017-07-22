var twitterAuthenticate = require("./keys.js");
var fs = require('file-system');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//Twitter API Keys
var client = new Twitter({
	consumer_key: twitterAuthenticate.twitterKeys.consumer_key,
 	consumer_secret: twitterAuthenticate.twitterKeys.consumer_secret,
 	access_token_key: twitterAuthenticate.twitterKeys.access_token_key,
 	access_token_secret: twitterAuthenticate.twitterKeys.access_token_secret
});

//Spotify API Keys
var spotify = new Spotify({
	id: twitterAuthenticate.spotifyKeys.clientID,
	secret: twitterAuthenticate.spotifyKeys.clientSecret
});

var params = {screen_name: 'MntGoatsDilemma'};
var userInput = process.argv[2];
var userInputTwo = process.argv[3];

function toggleQuery(input) {
	
	switch (input) {
	  	
	  	case "my-tweets":
	    	tweetPullAndLog();
	    break;
	  	
	  	case "spotify-this-song":
	   		songPullAndLog();
	    break;
	  	
	  	case "movie-this":
	    	moviePullAndLog();
	    break;
	    
	    case "do-what-it-says":
	    	randomPullAndLog();
	    break;
	}
};

toggleQuery(userInput)

function tweetPullAndLog() {

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	
	  	for(i = 0; i < tweets.length; i++) {

	  		console.log("------------------------------------------------------------");
	    	console.log("Mountain Goat Says: " + tweets[i].text);
	    	console.log("-")
	    	console.log("This is when he said it: " + tweets[i].created_at);
	    	console.log("------------------------------------------------------------");
	    		
	    	fs.appendFile("log.txt", "\nMountain Goat Says: " + tweets[i].text + "\n" + "\nThis is when he said it: " + tweets[i].created_at + "\n--------------------------------------", function(err) {
	    		if (err) {
	      			return console.log('Error occured: ' + err);
	    		}
	  		});
	    }
	});
};

function songPullAndLog() {
	
	spotify.search({ type: 'track', query: "'" + (userInputTwo || "Ace of Base The Sign" ) + "'" }, function(err, song) {

	  	console.log("------------------------------------------------------------");
		console.log("Band/Artist name: " + song.tracks.items[0].artists[0].name); //Band name
		console.log("Album name: " + song.tracks.items[0].album.name);	//Album name
		console.log("Song name: " + song.tracks.items[0].name);	//Song name
		console.log("URL link to this song: " + song.tracks.items[0].external_urls.spotify);  //Song URL
		console.log("------------------------------------------------------------");

		fs.appendFile("log.txt", "\nBand/Artist name: " + song.tracks.items[0].artists[0].name + "\nAlbum name: " + song.tracks.items[0].album.name + "\nSong name: " + song.tracks.items[0].name + "\nURL link to this song: " + song.tracks.items[0].external_urls.spotify + "\n--------------------------------------", function(err) {

	  		if (err) {
	    		return console.log('Error occurred: ' + err);
	  		}
		});
	});
};

function moviePullAndLog() {

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + (userInputTwo || "Mr. Nobody")+ `&tomatoes=true`, function (err, response, body) {
  		
  		var bodyObj = JSON.parse(body);

  		console.log("------------------------------------------------------------");
  		console.log("Movie Title: " + bodyObj.Title);
  		console.log("Release Year: " + bodyObj.Year);
  		console.log("IMDB Rateing: " + bodyObj.Ratings[0].Value);
  		console.log("Movie Nationality: " + bodyObj.Country);
  		console.log("Language: " + bodyObj.Language);
  		console.log("Plot: " + bodyObj.Plot);
  		console.log("Actors: " + bodyObj.Actors);
  		console.log("Link to Rotten Tomatoes: " + bodyObj.tomatoURL);
  		console.log("------------------------------------------------------------");

  		fs.appendFile("log.txt", "\nMovie Title: " + bodyObj.Title + "\nRelease Year: " + bodyObj.Year + "\nIMDB Rateing: " + bodyObj.Ratings[0].Value + "\nMovie Nationality: " + bodyObj.Country + "\nLanguage: " + bodyObj.Language + "\nPlot: " + bodyObj.Plot + "\nActors: " + bodyObj.Actors + "\nLink to Rotten Tomatoes: " + bodyObj.tomatoURL + "\n--------------------------------------", function(err) {
	  		if (err) {
		    		return console.log('Error occurred: ' + err);
		  	}
  		})
	});  		
};

function randomPullAndLog() {
	
	fs.readFile("random.txt", "utf8", function (err, data) {

		var contentArray = [];
		contentArray = data.split(",");
		
		userInput = contentArray[0];
		userInputTwo = contentArray[1];

		toggleQuery(userInput);

        if (err) {
          return console.log(err);
        }
	});
};