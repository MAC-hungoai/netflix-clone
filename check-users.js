const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb+srv://khoa030577_db_user:Dangkhoa3525@cluster.yc1srse.mongodb.net/netflix?retryWrites=true&w=majority';

async function checkAdmin() {
  const client = new MongoClient(MONGODB_URL);
  try {
    await client.connect();
    const db = client.db('netflix');
    const adminCollection = db.collection('AdminUser');
    const admins = await adminCollection.find().toArray();
    
    console.log('--- Admin Users ---');
    if (admins.length === 0) {
      console.log('No admin users found.');
    } else {
      admins.forEach(a => console.log(`Email: ${a.email}, Name: ${a.name}`));
    }
    
    const usersCollection = db.collection('User');
    const users = await usersCollection.find().limit(5).toArray();
    console.log('\n--- Regular Users (First 5) ---');
    if (users.length === 0) {
      console.log('No regular users found.');
    } else {
      users.forEach(u => console.log(`Email: ${u.email}, Name: ${u.name}`));
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

checkAdmin();
