function getCollectionStats(dbName) {
  const collections = db.getSiblingDB(dbName).getCollectionNames();
  
  collections.forEach(collectionName => {
    try {
      const stats = db.getSiblingDB(dbName).runCommand({ collStats: collectionName });
      if (stats.ok === 1) {
        const { count, avgObjSize, size, storageSize, totalIndexSize, nindexes, totalSize } = stats;

        // CSV Data
        print(`${dbName},${collectionName},${count},${avgObjSize || 0},${size / 1024},${storageSize / 1024},${nindexes},${totalIndexSize / 1024}, ${totalSize / 1024}`);
      }
    } catch (err) {
      // If not authorized or any other error, skip this collection
      print(`Error fetching stats for ${dbName}.${collectionName}: ${err.message}`);
    }
  });
}

// CSV Headers
print('Database,Collection,DocumentCount,AvgObjSize (bytes),UncompressedKBSize,CompressedKBSize,Indexes,IndexSizeKB, TotalSize');

const databases = db.adminCommand({ listDatabases: 1 }).databases;

databases.forEach(database => {
  const dbName = database.name;
  // Skipping system databases
  if (!['admin', 'config', 'local'].includes(dbName)) {
    try {
      getCollectionStats(dbName);
    } catch (err) {
      print(`Error accessing database ${dbName}: ${err.message}`);
    }
  }
});
