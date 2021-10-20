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


exports.inviteUser = function(req, res) {
    var invitationBody = req.body;
    var shopId = req.params.shopId;
    var authUrl = "https://url.to.auth.system.com/invitation";
  
    superagent
      .post(authUrl)
      .send(invitationBody)
      .end(async function(errResponse, invitationResponse) {

        if (invitationResponse.status == 201) {

          await User.findOneAndUpdate({
            authId: invitationResponse.body.authId
          }, {
            authId: invitationResponse.body.authId,
            email: invitationBody.email
          }, {
            upsert: true,
            new: true
          }, function(err, createdUser) {
            Shop.findById(shopId).exec(function(err, shop) {
              if (err ||!shop) {
                return res.status(500).send(err || { message: 'No shop found' });
              }
              if (shop.invitations.indexOf(invitationResponse.body.invitationId) == -1 ) {
                shop.invitations.push(invitationResponse.body.invitationId);
              }
              if (shop.users.indexOf(createdUser._id) == -1) {
                shop.users.push(createdUser);
              }
              shop.save();
            });
          });
          return res.json(invitationResponse);
          

        } else if (invitationResponse.status == 200) {
          return res.status(400).json({
            error: true,
            message: 'User already invited to this shop'
          });
          
        } else if (errResponse || !invitationResponse.ok) {
          return res.status(500).send(errResponse || { message: 'Service Unavaliable' });
        }
       
      });
  };
  