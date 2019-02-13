var dotenv = require("dotenv").config();

// Call all the packages and APIs needed for this app
var axios = require("axios");
// var moment = require("moment");
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
// var omdb = require("omdb");

// Create global variables to capture user input
var method = process.argv[2];
var userQuery = process.argv[3];


var spotify = new Spotify(keys.spotify);

function spotifySearchFunc() {
    spotify.search({ 
        type: 'track',
        query: userQuery,
        }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n-----------"); 
    });
};

switch(method) {
    case "spotify-this-song":
        spotifySearchFunc();
        break;
};

