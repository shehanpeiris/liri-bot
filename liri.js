var dotenv = require("dotenv").config();

// Call all the packages and APIs needed for this app
var axios = require("axios");
// var moment = require("moment");
var keys = require("./keys.js");

// Create global variable to capture user input
// The 2nd index of the process.argv array will be the method (spotify/concert/movie).
// The following indices will be the user's search term (i.e. movie name, band name, etc.)
// The search term will be captured in different methods for each API depending on the specific
// requirements of the API call.

var method = process.argv[2];

// BandsInTown Code
var artistQuery = process.argv.slice(3).join("");
var concertURL = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";

function concertSearch() {
    axios
        .get(concertURL)
        .then(function(response) {
            console.log("\n-----------------\nYOUR ARTIST TOUR RESULTS\n-----------------\n");
            // For-loop to log the first 5 results.
            for (var i=0; i<5; i++){
                console.log("Venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[0].venue.region + "\nDate: " + response.data[0].datetime + "\n-----------"); 
            }
        }
)};

// Spotify Code
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// User search term joined by spaces to conform to needs of Spotify API
var songQuery = process.argv.slice(3).join(" ");


// Function to query the Spotify API & return desired data
function spotifySearchFunc() {
    spotify.search({ 
        type: 'track',
        query: songQuery,
        }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            };
            console.log("\n-----------------\nYOUR SONG RESULTS\n");
            // For-loop to log the first 5 results.
            for (var i=0; i<5; i++){
                console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name + "\nSong Name: " + data.tracks.items[i].name + "\nPreview URL: " + data.tracks.items[i].preview_url + "\nAlbum: " + data.tracks.items[i].album.name + "\n-----------"); 
            };
        }
    )
};


// OMDB Code
// Build queryURL to run axios request to the OMDB API
var movieName = "";
var userInput = process.argv;
// For loop builds the query in the format we need for the API
// If user search is one word, we just extract that word
// If user search is multiple words, concatenate with + signs
for (var j=3; j<userInput.length; j++){
    if ((j>3) && (j<userInput.length)) {
        movieName = movieName + "+" + userInput[j];
    } else {
        movieName += userInput[j];
    }
};

// If user doesn't type in anything after movie-this command, app will
// pull up movie results for "Mr. Nobody" by default.
if (movieName === "") {
    movieName = "Mr. Nobody";
};

// Constructing query URL for axios call to OMDB API
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

function omdbSearch() {
    axios
        .get(queryUrl)
        .then(function(response) {
          console.log("\n-----------------\nYOUR MOVIE RESULTS\n");
          console.log("Title: " + response.data.Title + "\nYear of Release: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
        }
)};

// Do What It Says Code
//Research fs node package


// Use the switch method to build the core functionality of the app.
// Based on the user's command (e.g. "spotify-this-song", "concert-this", etc.),
// the switch calls the relevant functions to retrieve data from relevant APIs.
switch(method) {
    case "concert-this":
        concertSearch();
        break;
    case "spotify-this-song":
        spotifySearchFunc();
        break;
    case "movie-this":
        omdbSearch();
        break;
};