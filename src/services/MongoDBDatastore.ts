import { createConnection, Schema } from "mongoose";
import assert from "assert";
import { v4 as uuid } from "uuid";
import { TitleType } from "./scraperConfig";
import { Datastore } from "./Datastore";

const NewsTitle = new Schema({
  id: String,
  timestamp: String,
  title: String,
  type: String,
});

export class MongoDBDatastore implements Datastore {
  private _connection;
  private _model;
  private _timestamp;

  constructor() {
    assert(process.env.MONGODB_CONNECTION_STRING);
    this._connection = createConnection(process.env.MONGODB_CONNECTION_STRING);
    this._model = this._connection.model("NewsTitle", NewsTitle);
    this._timestamp = new Date().toISOString();
  }

  put = async (title: string, type: TitleType) => {
    try {
      const obj = new this._model({
        id: uuid(),
        timestamp: this._timestamp,
        title,
        type,
      });
      obj.save();
    } catch (error) {
      console.error(error);
    }
  };
}

const instance = new MongoDBDatastore();
Object.freeze(instance);
export default instance;
