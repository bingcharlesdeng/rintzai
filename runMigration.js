// runMigration.js
import { migrateMessagesToSubcollection } from "./src/firebase/migrationScript.js";
import { db } from "./src/firebase/firebase.js";

async function runMigration() {
  try {
    console.log('Starting migration...');
    await migrateMessagesToSubcollection(db);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

runMigration();