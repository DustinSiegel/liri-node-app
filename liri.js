var twitterAuthenticate = require("./keys.js");

// console.log("-------------------------------------");
// console.log("API Keys For Twitter");
// console.log("consumer_key: " + twitterAuthenticate.twitterKeys.consumer_key);
// console.log("consumer_secret: " + twitterAuthenticate.twitterKeys.consumer_secret);
// console.log("access_token_key: " + twitterAuthenticate.twitterKeys.access_token_key);
// console.log("access_token_secret: " + twitterAuthenticate.twitterKeys.access_token_secret);
// console.log("-------------------------------------");

var apiAuth =  {
	consumer_key: 'raNfCTqlRU0nOondQz2GkJIlO',
 	consumer_secret: 'Y9OlPdisn9lLdaQvFa65cbDjXdZezSWV6NS2SR7YW5IEBpvjVF',
 	access_token_key: '884964564642791424-iSgdYDR0fg1EXn44qGdjZaTPGGwPTv2',
 	access_token_secret: 'EbqolyjFETwAR0JULRrNIP6zU6uKmfK5C2JIhsD9wlm3J'
}

if (process.argv[2] === "my-tweets") {
	console.log(apiAuth);
}