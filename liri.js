var twitterAuthenticate = require("./keys.js"); //a variable that represents API objects
var fs = require('file-system'); //pulls from fs node packet
var Twitter = require('twitter'); //pulls from twitter node packet
var Spotify = require('node-spotify-api');	//pulls from spotify node packet
var request = require('request');	//used for requesting JSON packet from OMDB

var client = new Twitter({ //a variable that ties in the Twitter API keys
	consumer_key: twitterAuthenticate.twitterKeys.consumer_key,
 	consumer_secret: twitterAuthenticate.twitterKeys.consumer_secret,
 	access_token_key: twitterAuthenticate.twitterKeys.access_token_key,
 	access_token_secret: twitterAuthenticate.twitterKeys.access_token_secret
});

var spotify = new Spotify({	//a variable that ties in the Spotify API keys
	id: twitterAuthenticate.spotifyKeys.clientID,
	secret: twitterAuthenticate.spotifyKeys.clientSecret
});

var params = {screen_name: 'MntGoatsDilemma'}; //ties in a specific twitter account
var userInput = process.argv[2];	//A variable to hold the first avialable command line input (3rd)
var userInputTwo = process.argv[3];	//a variable to hold the next command line input (4th)

function toggleQuery(input) {	//a function that calls a switch case that passses in userInput
	
	switch (input) {	//passes in userInput when called
	  	
	  	case "my-tweets": 	//it the userInput is my-tweets
	    	tweetPullAndLog();	//then perform the tweet function
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

toggleQuery(userInput)	//passes the user input in to the switch case

function tweetPullAndLog() {	//pulls from twitter and parses out the last 20 tweets from a twitter account with dates

	client.get('statuses/user_timeline', params, function(error, tweets, response) {	//envokes the twitter api keys, parses out the timeline and passes into a function that pulls 20 tweets
	  	
	  	for(i = 0; i < tweets.length; i++) {	//passes each of the 20 or less tweets into a variable

	  		console.log("------------------------------------------------------------");	//displays the tweets in the console
	    	console.log("Mountain Goat Says: " + tweets[i].text);
	    	console.log("-")
	    	console.log("This is when he said it: " + tweets[i].created_at);
	    	console.log("------------------------------------------------------------");
	    		
	    	fs.appendFile("log.txt", "\nMountain Goat Says: " + tweets[i].text + "\n" + "\nThis is when he said it: " + tweets[i].created_at + "\n--------------------------------------", function(err) {	//pushes the tweets to a txt file
	    		if (err) {	//longs an error if there is one
	      			return console.log('Error occured: ' + err);
	    		}
	  		});
	    }
	});
};

function songPullAndLog() {	//pulls from spotify using the api keys to get and object with information about the inputted moivie
	
	spotify.search({ type: 'track', query: "'" + (userInputTwo || "Ace of Base The Sign") + "'" }, function(err, song) {

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

function moviePullAndLog() {	//pulls from the omdb database using an api request and passes in a JSON packet

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + (userInputTwo || "Mr. Nobody")+ `&tomatoes=true`, function (err, response, body) {
  		
  		var bodyObj = JSON.parse(body);	//creates a variable from the JSON packet

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

function randomPullAndLog() {	//pulls in user input in the form of a txt file instead of through the command line
	
	fs.readFile("random.txt", "utf8", function (err, data) {	//using fs to read the txt file and pull data

		var contentArray = [];	//an empty array that can hold the data from the txt file
		contentArray = data.split(",");	//splits the data in the tzt file by comma and passes it into the empty array
		
		userInput = contentArray[0];	//reasigns userInput to the first spot in the array
		userInputTwo = contentArray[1];	//reasigns userInputTwo to the second spot in the array

		toggleQuery(userInput);	//envokes the switch case and passes in the new user input

        if (err) {
          return console.log(err);
        }
	});
};