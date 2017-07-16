var twitterAuthenticate = require("./keys.js");
var fs = require('file-system');
var Twitter = require('twitter');
var userInput = process.argv[2];
var client = new Twitter({
	consumer_key: 'raNfCTqlRU0nOondQz2GkJIlO',
 	consumer_secret: 'Y9OlPdisn9lLdaQvFa65cbDjXdZezSWV6NS2SR7YW5IEBpvjVF',
 	access_token_key: '884964564642791424-iSgdYDR0fg1EXn44qGdjZaTPGGwPTv2',
 	access_token_secret: 'EbqolyjFETwAR0JULRrNIP6zU6uKmfK5C2JIhsD9wlm3J'
});

var params = {screen_name: 'MntGoatsDilemma'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
  	if (userInput === "my-tweets") {

  		// console.log(tweets);
  	
  		for(i = 0; i < tweets.length; i++) {

  			console.log("------------------------------------------------------------");
    		console.log("Mountain Goat Says: " + tweets[i].text);
    		console.log("-")
    		console.log("This is when he said it: " + tweets[i].created_at);
    		console.log("------------------------------------------------------------");
    		
    		fs.appendFile("log.txt", "Mountain Goat Says: " + tweets[i].text + "This is when he said it: " + tweets[i].created_at, function(err) {
    			if (err) {
      				return console.log(err);
    			}
  			});
    	}
    }
});


// if (process.argv[2] === "my-tweets") {
// 	console.log(tweets);
// }