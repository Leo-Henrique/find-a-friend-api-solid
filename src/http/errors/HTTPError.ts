import { FastifyReply } from "fastify";

export interface HTTPErrorPattern {
  statusCode: number;
  message: string;
  detail?: string | object;
}

export class HTTPError extends Error implements HTTPErrorPattern {
  constructor(
    public statusCode: number,
    public message: string,
    public detail?: string | object,
  ) {
    super(message);
  }
}

export class HTTPErrorHandler {
  constructor(public response: FastifyReply) {}

  send(statusCode: number, message: string, detail?: string | object) {
    const handleDetail = () => {
      if (typeof detail === "string") return { issue: detail };

      return detail;
    };

    this.response
      .status(statusCode)
      .send({ statusCode, message, ...handleDetail() });

    return true;
  }
}
