# MongoDB Sizing Script
The purpose of this script is to collect the data required by a MongoDB Solutions Architect to perform a cluster sizing analysis.

## Prerequisites
1. Download and install [Mongo Shell](https://www.mongodb.com/docs/mongodb-shell/)
2. Download the sizing script to a terminal that will be used to access the cluster
3. DB User with Sufficient Permissions. Admin/Root acceptable, Minimum noted below.

Example command for creating a database user with the minimum required permissions:
```javascript
db.getSiblingDB("admin").createUser({
    user: "ADMIN_USER",
    pwd: "ADMIN_PASSWORD",
    roles: [ "readAnyDatabase", "clusterMonitor" ]
})
```


## Instructions
* Execute the command: `mongosh <<CONNECTION_STRING>> -f getAllMongoSizingData.js --norc --quiet > allDatabasesCollectionsOutput.csv`
* Send the output file to the MongoDB Solutions Architect for analysis.