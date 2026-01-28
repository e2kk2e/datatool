require('dotenv').config();
const db = require('../src/config/database');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  console.log('Seeding test data...');
  try {
    // 1. Create a test user
    const userId = uuidv4();
    await db.query(
      `INSERT INTO users (id, email, password_hash, company_name, subscription_tier, api_key, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`,
      [userId, 'test@example.com', 'hashed_password', 'Test Corp', 'pro', 'test-api-key', true]
    );
    console.log('User created.');

    // 2. Create some tenders
    const cpvCodes = ['72000000-5', '72200000-7', '48000000-8'];
    const regions = ['NRW', 'BY', 'BW', 'BE'];
    
    for (let i = 0; i < 20; i++) {
      const tenderId = uuidv4();
      const sourceId = `tender-${i}`;
      const region = regions[i % regions.length];
      const cpv = [cpvCodes[i % cpvCodes.length]];
      
      await db.query(
        `INSERT INTO tenders (
          id, source_id, source, title, description, cpv_codes, 
          authority_name, region, city, estimated_value, status, publication_date, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW() - INTERVAL '1 day' * $12, NOW())`,
        [
          tenderId, sourceId, 'nrw', `Test Tender ${i}`, `Description for tender ${i}`, cpv,
          'Stadt Köln', region, 'Köln', 50000 + (i * 10000), 'open', i
        ]
      );

      // 3. Create some awards for half of the tenders
      if (i % 2 === 0) {
        const awardId = uuidv4();
        await db.query(
          `INSERT INTO awards (
            id, tender_id, source_id, source, winner_name, award_value, award_date
          ) VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '1 day' * $7)`,
          [
            awardId, tenderId, `award-${i}`, 'nrw', i % 4 === 0 ? 'BigCorp' : 'SmallSoft', 
            45000 + (i * 10000), i
          ]
        );
      }
    }
    console.log('Tenders and awards created.');

    // 4. Create a profile and subscription for the user
    const profileId = uuidv4();
    await db.query(
      `INSERT INTO customer_profiles (id, user_id, name, cpv_codes, regions, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [profileId, userId, 'IT Services NRW', ['72000000-5'], ['NRW'], true]
    );
    
    await db.query(
      `INSERT INTO alert_subscriptions (user_id, profile_id, frequency, email_enabled)
       VALUES ($1, $2, $3, $4)`,
      [userId, profileId, 'daily', true]
    );
    console.log('Profile and subscription created.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
