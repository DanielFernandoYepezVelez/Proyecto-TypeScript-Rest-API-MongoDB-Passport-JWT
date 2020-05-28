import { connect } from "mongoose";

class Connection {
  public async connected(): Promise<void> {
    try {
      const mongo = await connect("mongodb://localhost/passport_jwt", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      if (mongo) {
        console.log(">>> Database Is Connected");
      }
    } catch {
      console.log("<<< Connected Not Is Database");
    }
  }
}

const connection = new Connection();
export default connection.connected();
