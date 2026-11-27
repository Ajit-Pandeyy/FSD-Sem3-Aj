import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://ajitpandey4572_db_user:<db_password>@cluster0.6i6bjvt.mongodb.net/");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}