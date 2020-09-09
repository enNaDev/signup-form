import { Payload } from './Payload';

export class Request {
  constructor(
    public campaignUuid: string,
    public data: Payload
  ) {}
}
