//Importing environment variables and api keys
require('dotenv').config();
var keys = require('./keys.js');
var fs = require('fs')

//Importing node modules
var request = require('request')
var twitterModule = require('twitter')
var spotifyModule = require('node-spotify-api')

//Declaring Twitter and Spotify Objects 
var twitter = new twitterModule(keys.twitter)
var spotify = new spotifyModule(keys.spotify)


var commands = {
    spotifyThisSong: function(songName) {
        spotify.search({ type: 'track', query: songName, limit:1 }, function(err, data) {
            if (!err) {
                var resultsList = data.tracks.items
                resultsList.forEach( function(element) {
                    console.log('Artist(s): ', element.album.artists[0].name); 
                    console.log('Song Name: ', element.name);
                    console.log('Preview Link: ', element.external_urls.spotify);                     
                    console.log('Album: ', element.album.name);                                     
                })
            }
        });
    },
    myTweets: function() {
        twitter.get('statuses/user_timeline', {screen_name: 'Leo60747218'}, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(element) {
                    console.log(element.text);
                }) 
            }
        });
    },
    movieThis: function(movieName) {
        //Declare and build query url request to the OMDB API
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        
        // Then create a request to the queryUrl
        request(queryUrl,function(error,response,body) {
            // If the request is successful
            if(!error && response.statusCode=='200') {
                // Then log the Release Year for the movie
                console.log('Title: ', JSON.parse(body).Title)
                console.log('Year: ', JSON.parse(body).Year)
                console.log('IMDB Rating: ', JSON.parse(body).imdbRating)
                console.log('Roten Tomatoes Rating: ', JSON.parse(body).Ratings[1].Value)
                console.log('Country: ', JSON.parse(body).Country)
                console.log('Language: ', JSON.parse(body).Language)
                console.log('Plot: ', JSON.parse(body).Plot)
                console.log('Actors: ', JSON.parse(body).Actors)
            }
        })
    }
}


switch(process.argv[2]) {
    case 'my-tweets':
        commands.myTweets()
        break
    
    case 'spotify-this-song':
        //Take the process.argv array, remove the first three elements and a make a string of the rest to account for spaces in the song name
        var commandArray = process.argv
        var songName = commandArray.slice(3).join(' ');
    
        commands.spotifyThisSong(songName);
        break
    
    case 'movie-this':
        //Take the process.argv array, remove the first three elements and a make a string of the rest to account for spaces in the movie name
        var commandArray = process.argv
        var movieName = commandArray.slice(3).join(' ');

        commands.movieThis(movieName);
        break

    case 'do-what-it-says':
        fs.readFile('random.txt','utf8',function(error,data) {
            var dataArray = data.split(',')
            switch(dataArray[0]) {
                case 'spotify-this-song':
                    commands.spotifyThisSong(dataArray[1]);
                    break
                
                case 'my-tweets':
                    commands.myTweets();
                    break

                case 'movie-this':
                    commands.movieThis([dataArray[1]]);
                    break
            }
        })
        break
}





