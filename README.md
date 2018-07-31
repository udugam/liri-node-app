# Language Interpretation and Recognition Interface (LIRI) 
This node application allows a user to view recent tweets from a user and get information about a song or movie. Results are logged in a log.txt file

# Getting Started
You'll need Spotify, Twitter API Keys. They should be stored in a .env file like so:

SPOTIFY_ID=XXXXXXXXXXXXX
SPOTIFY_SECRET=XXXXXXXXXXXXX
TWITTER_CONSUMER_KEY=XXXXXXXXXXXXX
TWITTER_CONSUMER_SECRET=XXXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_KEY=XXXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_SECRET=XXXXXXXXXXXXX

# Command Examples
Movie Information: node liri.js movie-this your movie name
Recent Tweets: node liri.js my-tweets
Song Information: node liri.js spotify-this-song your song name


