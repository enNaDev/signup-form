import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { Endpoints } from '../common/endpoints';
import { EmailCheckResponse } from '../models/email-check-response';

@Injectable()
export class EmailCheckValidators {
  emailCheckResponse: EmailCheckResponse;
  campaignUuid: string;
  validationUrl: string;

  constructor(private httpService: HttpService) {
    this.campaignUuid = Endpoints.CAMPAIGN_UUID;
    this.validationUrl = Endpoints.VALIDATION_URL;
    this.emailCheckResponse = new EmailCheckResponse(null, null);

    this.emailCheckResponse = {
      campaignUuid: this.campaignUuid,
      data: {
        "email": null
      }
    };
  }

  shouldBeUnique = (control: AbstractControl) : Promise<ValidationErrors | null> => {
    if (!control.value) return null;

    this.emailCheckResponse.data.email = control.value;
    let emailExists: boolean;

    return new Promise((resolve) => {
      this.httpService.post(this.validationUrl, this.emailCheckResponse).subscribe(res => {
        emailExists = (res.data.status === "EXISTS") ? true : false;
        if (emailExists)
          resolve({ shouldBeUnique: true });
        else
          resolve(null);
      });
    });
  }
}
