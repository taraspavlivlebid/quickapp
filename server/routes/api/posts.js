const express = require('express');
const mongodb = require('mongodb');

var request = require('request');
var myJSON = require("JSON");


const router = express.Router();



//Get Posts

router.get('/:artist', (req, res) => {
    res.set('Content-Type', 'text/html');
    var resultsHTML = searchAlbum(req.params.artist)
    .then(data => res.json(data));
});

/*
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    //('mongodb://http://localhost:27017')
}
*/

function searchAlbum(artist) {
    
    return new Promise((resolve, reject) => {

        const options = {
            url: 'https://itunes.apple.com/search',
            json: true,
            form: {
                term: artist,
                entity: 'album',
                media: 'music',
                limit: 200
            }
        };

        request.post(options, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(`Status: ${res.statusCode}`);

                var albums = [];
                //Loop is backwards because splice rearanges the indexes
                for (var i = body['results'].length - 1; i >= 0; i--) {
                    if ( albums.includes(body['results'][i].collectionName) ) {
                        body['results'].splice(i,1);
                    }else{

                        albums.push(body['results'][i].collectionName);

                    }
                } 
                


                resolve(body);
            }else{
                reject(err);
            }

        });
        
    }) ;

   }

   

module.exports = router;


  