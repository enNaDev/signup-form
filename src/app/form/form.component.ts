import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { Request } from '../models/request';
import { EmailCheckValidators } from '../common/email-check.validators';
import { Endpoints } from '../common/endpoints';

import { alertifyAlert } from '../alertify';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  submissionUrl = Endpoints.SUBMISSION_URL;
  campaignUuid = Endpoints.CAMPAIGN_UUID;
  dataToSend: Request;

  f: FormGroup;

  constructor(
    private emailCheckValidators: EmailCheckValidators,
    private httpService: HttpService
  ) {
    this.dataToSend = new Request(null, null);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.f = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        this.emailCheckValidators.shouldBeUnique
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    this.dataToSend.campaignUuid = this.campaignUuid;
    this.dataToSend.data = Object.assign({}, this.f.value);

    this.httpService.post(this.submissionUrl, this.dataToSend).subscribe(
      (data) => {
        alertifyAlert(`${data.data.firstName}, your request submitted successfully!`);
        this.resetForm(this.f);
      },
      (err) => {
        if (err.status == 400) {
          alertifyAlert(err.error.errors[0].message);
        } else {
          alertifyAlert('Something went wrong! Your request has not been submitted. Please try again.')
        }
      }
    );
  }

  resetForm(form: FormGroup) {
    form.reset();

    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
  }

  get firstName() {
    return this.f.get('firstName');
  }
  get lastName() {
    return this.f.get('lastName');
  }
  get email() {
    return this.f.get('email');
  }
  get password() {
    return this.f.get('password');
  }
}
