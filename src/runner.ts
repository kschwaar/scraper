import * as dotenv from "dotenv";
dotenv.config();
import { APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import assert from "assert";
import Datastore from "./services/Datastore";
import { matchCategories } from "./services/scraperConfig";

export const runner = async (): Promise<APIGatewayProxyResult> => {
  assert(process.env.SOURCE_URL);
  const response = await axios.get(process.env.SOURCE_URL);
  const txt = response.data;

  let successfulMatches = 0;
  // await Promise.all(
  await Promise.all(
    matchCategories.map(async ({ type, regex }) => {
      const matches: string[] = txt.match(regex);
      successfulMatches += matches.length;
      await Promise.all(matches.map((title) => Datastore.put(title, type)));
    })
  );

  return {
    body: `${successfulMatches} titles saved.`,
    statusCode: 200,
  };
};
