/**
 * Database Migration Script
 * 
 * Applies the schema.sql to create all required tables.
 * Run: npm run db:migrate
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Or use individual vars:
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
});

async function migrate() {
  console.log('Starting database migration...');
  
  const schemaPath = path.join(__dirname, 'schema.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error('schema.sql not found!');
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  const client = await pool.connect();
  
  try {
    console.log('Applying schema...');
    await client.query(schema);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    
    // Show which statement failed
    if (error.position) {
      const position = parseInt(error.position);
      const context = schema.substring(Math.max(0, position - 100), position + 100);
      console.error('Near:', context);
    }
    
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
