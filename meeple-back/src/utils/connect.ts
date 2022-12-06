import mongoose from 'mongoose';

async function connect(dbUri:string) {

  try {
    await mongoose.connect(dbUri);
    console.log('database connected');
  } catch (err) {
    console.log('could not connect to database');
    process.exit(1);
  }
}

export default connect;
