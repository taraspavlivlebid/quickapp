const express = require('express');
const mongodb = require('mongodb');

var request = require('request');
var myJSON = require("JSON");


const router = express.Router();



//Get Posts

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    var resultsHTML = searchAlbum('beyonce')
    .then(data => res.json(data));
    //const responseJson =  JSON.parse(resultsHTML);
    //resultsHTML.toString()
    //
    //console.log(resultsHTML.toString());
    //res.send(resultsHTML.toString());



});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    //('mongodb://http://localhost:27017')
}


function searchAlbum(artist) {
    
    return new Promise((resolve, reject) => {

        const options = {
            url: 'https://itunes.apple.com/search',
            json: true,
            form: {
                term: artist,
                media: 'music',
                limit: 200
            }
        };

        request.post(options, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(`Status: ${res.statusCode}`);
                //console.log(body['results']);
                var albums = [];
                body['results'].forEach( (item,  index) =>  {
                    console.log(index);
                    if ( albums.includes(item.collectionName) ) {
                        delete body['results'][index];

                    }else{
                        albums.push(item.collectionName);
                    }
                });
                //const responseJson = JSON.parse(body);

                resolve(body['results']);
            }else{
                reject(err);
            }

        });
        
    }) ;

   }

   

module.exports = router;