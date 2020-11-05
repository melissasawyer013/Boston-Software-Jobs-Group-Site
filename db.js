const MongoClient = require('mongodb').MongoClient;
let client = null;

// create a connection to url and call callback()
function connect(url, callback) {
  if (client == null) {
      // create a mongodb client
      client = new MongoClient(url, { useUnifiedTopology: true });
      // establish a new connection
      client.connect((err) => {
          if (err) {
              // error occurred during connection
              client = null;
              callback(err);
          } else {
              // all done
              callback();
          }
      });
  } else {
      // connection was established earlier. just call callback()
      callback();
  }
}

// get database using pre-established connection
function db(dbName) {
    return client.db(dbName);
}

// close open connection
function close() {
    if (client) {
        client.close();
        client = null;
    }
}

// export connect(), db() and close() from the module
module.exports = {
    connect,
    db,
    close
};