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
                    var songDetails =   'Artist(s): '+ element.album.artists[0].name + "\n" +  
                                        'Song Name: '+ element.name + "\n" +
                                        'Preview Link: ' + element.external_urls.spotify + "\n" +                 
                                        'Album: ' + element.album.name + "\n\r"                                          
                    console.log(songDetails)
                    commands.addToLog(songDetails)                                     
                })
            }
        });
    },
    myTweets: function() {
        twitter.get('statuses/user_timeline', {screen_name: 'Leo60747218'}, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(element) {
                    console.log(element.text + ' (' + element.created_at +')');
                    commands.addToLog(element.text + ' (' + element.created_at + ')')
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
                var movieDetails =  'Title: ' + JSON.parse(body).Title + "\n" +
                                    'Year: ' + JSON.parse(body).Year + "\n" +
                                    'IMDB Rating: ' + JSON.parse(body).imdbRating + "\n" +
                                    'Roten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + "\n" +
                                    'Country: ' + JSON.parse(body).Country + "\n" +
                                    'Language: ' + JSON.parse(body).Language + "\n" +
                                    'Plot: ' + JSON.parse(body).Plot + "\n" +
                                    'Actors: ' + JSON.parse(body).Actors + "\n\r"
                console.log(movieDetails)
                commands.addToLog(movieDetails)
            }
        })
    },
    addToLog: function(data) {
        fs.appendFile('log.txt', data + "\n",function(err) {
            err ? console.log(err) : null
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





