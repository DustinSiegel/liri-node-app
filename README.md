Liri Node App

This is a back end terminal bash application that Takes in user input commands to do a series of ajax pulls from Twitter, Spotify and IMDB. It also takes in commands from a text file as well as writes each pull to another text file, effectively creating a record of each transaction. 

Instructions:
1. Navigate to the lire-node-app file in the terminal
2. Type: “node liri.js” and one of the following: 
3. A. “my-tweets”
4. B. “spotify-this-song” + “some song name”
5. C. “movie-this” + “some movie name”
6. D. “do-what-it-says”

The tweets command will pull the last 20 tweets from a specific twitter account with links, display the info in the terminal and write it to a text page.

The Spotify command will pull information about the user inputed song along with a link to the song, display the info in the terminal and write it to a text page.

The Movie command will pull information about the user inputed movie along with a link to the imdb webpage, display the info in the terminal and writ it to a text page.

If you leave the song name blank, it will default to the song “the sign” by Ace of Base, and if you leave the movie name blank, it will default to the movie “Mr. Nobody”.
