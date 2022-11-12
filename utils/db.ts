import { connect } from 'mongoose';

type connectionType = {
  isConnected?: number
}

const connection: connectionType = {} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }
  
  /* connecting to our database */
  const db = await connect(process.env.MONGODB_URI as string)
  
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect;
