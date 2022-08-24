const {MongoClient } = require("mongodb");
const db = process.env.MONGO_CLUSTER_URL;

const client = new MongoClient(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connect: function(callback) {
        client.connect(function(err, db) {
            if(db) {
                _db = db.db("eshop");
                console.log("We are successfully connected to MongoDB.");
            }
        })
    },
    getDb: function() {
        return _db;
    }
}