const axios = require('axios');

async function test() {
  const baseURL = 'http://localhost:3000';
  const apiKey = 'test-api-key';
  
  console.log('Testing API...');
  
  try {
    // 1. Test Tenders List
    console.log('\n1. Testing GET /api/tenders');
    const tendersRes = await axios.get(`${baseURL}/api/tenders`, {
      headers: { 'x-api-key': apiKey }
    });
    console.log(`Status: ${tendersRes.status}`);
    console.log(`Found ${tendersRes.data.data.length} tenders`);
    
    // 2. Test Search
    console.log('\n2. Testing Search GET /api/tenders?search=Test');
    const searchRes = await axios.get(`${baseURL}/api/tenders?search=Test`, {
      headers: { 'x-api-key': apiKey }
    });
    console.log(`Status: ${searchRes.status}`);
    console.log(`Search found ${searchRes.data.data.length} results`);

    // 3. Test Analytics (Pro Tier)
    console.log('\n3. Testing Analytics GET /api/analytics/market-share?cpv=72000000-5');
    const analyticsRes = await axios.get(`${baseURL}/api/analytics/market-share?cpv=72000000-5`, {
      headers: { 'x-api-key': apiKey }
    });
    console.log(`Status: ${analyticsRes.status}`);
    console.log('Market Share Data:', JSON.stringify(analyticsRes.data.data, null, 2));

  } catch (err) {
    console.error('Test failed:', err.response ? err.response.data : err.message);
  }
}

test();
