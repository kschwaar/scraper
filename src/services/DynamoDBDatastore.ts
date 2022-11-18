import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import assert from "assert";
import { v4 as uuid } from "uuid";
import { TitleType } from "./scraperConfig";
import { Datastore } from "./Datastore";

const TABLE_NAME = "news-titles";

export class DDBDatastore implements Datastore {
  private _client;
  private _docClient;
  private _timestamp;

  constructor() {
    assert(process.env.AWS_ACCESS_KEY_ID);
    assert(process.env.AWS_SECRET_ACCESS_KEY);
    this._client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this._docClient = DynamoDBDocumentClient.from(this._client);
    this._timestamp = new Date().toISOString();
  }

  put = async (title: string, type: TitleType) => {
    try {
      await this._docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            id: uuid(),
            timestamp: this._timestamp,
            title,
            type,
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}

const instance = new DDBDatastore();
Object.freeze(instance);
export default instance;
