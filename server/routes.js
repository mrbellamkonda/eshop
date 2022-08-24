const express = require("express");

const app = express.Router();

const dbo = require("./conn");
const cart = {

};

const ObjectId = require("mongodb").ObjectId;

app.get('/products', (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("products").find({}).toArray(function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/cart/products', (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("cart").find({}).toArray(function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.post('/cart/add', (req, res) => {
    const {id} = req.body;

    let db_connect = dbo.getDb();
    let myQuery = {uniq_id: id};
    db_connect.collection("cart").findOne(myQuery, function(err, result) {
        if(err) throw err;
        let cartItem = result;
        if(cartItem) {
            let updateQuery = {_id: ObjectId(cartItem._id)};
            let newValues = {
                $set: {
                    quantity: cartItem.quantity + 1,
                },
            };
            db_connect.collection("cart"). updateOne(updateQuery, newValues, function(err, updateResult) {
                if(err) console.log("Error while updating the document");
                console.log("1 document updated");
                res.json(result);
            })
        } else {
            let productQuery = {uniq_id: id};
            db_connect
                .collection("products")
                .findOne(productQuery, function(err, product) {
                    if(err) throw err;
                    db_connect.collection("cart").insertOne({
                        ...product,
                        quantity: 1,
                    }, function(err, insertResult) {
                        if(err) throw err;
                        console.log("1 document created");
                        res.json(insertResult);
                    })
                });
        }
    });

});

module.exports = app;