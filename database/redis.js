const redis = require("redis");
const client = redis.createClient({
  host: '172.31.2.35'
});

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports.getCache = (token, cb) => {
  client.get(token, cb);
}

module.exports.setCache = (token) => {
  client.set(token, true, 'EX', 3600);
}