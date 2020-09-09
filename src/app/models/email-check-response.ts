export class EmailCheckResponse {
  constructor(
    public campaignUuid: string,
    public data: {
      "email": string
    }
  ) {}
}
