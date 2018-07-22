//Importing environment variables and api keys
require('dotenv').config();
var keys = require('./keys.js');

//Importing node modules
var requestModule = require('request')
var twitterModule = require('twitter')
var spotifyModule = require('node-spotify-api')

//Declaring Twitter and Spotify Objects 
var twitter = new twitterModule(keys.twitter)
var spotify = new spotifyModule(keys.spotify)


switch(process.argv[2]) {
    case 'my-tweets':
        twitter.get('statuses/user_timeline', {screen_name: 'Leo60747218'}, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(element) {
                    console.log(element.text);
                }) 
            }
        });
        break
    
    case 'spotify-this-song':
        //Take the process.argv array, remove the first three elements and a make a string of the rest to account for spaces in the song name
        var commandArray = process.argv
        var songName = commandArray.slice(3).join(' ');
    
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
        break
}

