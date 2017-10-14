const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const personDetails = require('../models/person');

const db = "mongodb://root:root@ds117935.mlab.com:17935/person"
mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err);
    }
})
router.get('/person', function (req, res) {
    console.log('Get request of Person')
    personDetails.find({})
        .exec(function (err, persons) {
            if (err) {
                console.log("Error retrieving video");
            } else {
                res.json(persons);
            }
        })
});
router.post('/person', function (req, res) {
    console.log('insert a person');
    var person = new personDetails();
    console.log("req.body.Name" + req.body.Name);
    person.Name = req.body.Name;
    console.log("person.Name" + person.Name);
    person.save(function (err, insertedPerson) {
        if (err) {
            console.log('Error saving video');
        } else {
            res.json(insertedPerson)
        }
    });
});

router.put('/person/:id', function (req, res) {
    console.log('update a video',req.params);
    personDetails.findByIdAndUpdate(req.params.id,
        {
            $set: { Name: req.body.Name }
        },
        {
            new: true
        },
        function (err, updatePerson) {
            if (err) {
                res.send("Error updated updatePerson");
            } else {
                res.json(updatePerson);
            }
        })
})
router.delete('/person/:id',function(req,res){
    console.log('Deleting a video');
    personDetails.findByIdAndRemove(req.params.id,function(err,deletedPerson){
        if(err){
            res.send("Error deleting Person");
        }else{
            res.json(deletedPerson);
        }
    })
})
module.exports = router;