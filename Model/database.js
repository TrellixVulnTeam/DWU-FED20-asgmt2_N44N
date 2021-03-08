const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
    basicMemberships: {type: Number},
    permiumMemberships: {type: Number},
    canceledMemberships: {type: Number},
    canceledReasons: [{
        
    }]
  
  });

  const Database = mongoose.model(
    "Database",
    databaseSchema
  );

  module.exports = Database;