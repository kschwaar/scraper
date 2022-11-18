import { TitleType } from "./scraperConfig";
import { DDBDatastore } from "./DynamoDBDatastore";
import { MongoDBDatastore } from "./MongoDBDatastore";

export interface Datastore {
  put(title: string, type: TitleType): Promise<void>;
}

let instance: Datastore;
switch (process.env.ENV) {
  case "AWS":
    instance = new DDBDatastore();
    Object.freeze(instance);
    break;
  default:
    instance = new MongoDBDatastore();
    Object.freeze(instance);
    break;
}

export default instance;
