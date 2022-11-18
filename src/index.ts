import { APIGatewayProxyResult } from "aws-lambda";
import { runner } from "./runner";

export const handler = async function (): // event: APIGatewayEvent,
// context: APIGatewayEventRequestContext
Promise<APIGatewayProxyResult> {
  return runner();
};

exports.handler = handler;
