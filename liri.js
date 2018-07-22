//Importing environment variables and api keys
require('dotenv').config();
var keys = require('./keys.js');

//Importing node modules
var requestModule = require('request')
var twitterModule = require('twitter')
var spotifyModule = require('node-spotify-api')

//Declaring Twitter and Spotify Objects 
var twitter = new twitterModule(keys.twitter)
// var spotify = new spotifyModule(keys.spotify)

var params = {screen_name: 'Leo60747218'};
twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});