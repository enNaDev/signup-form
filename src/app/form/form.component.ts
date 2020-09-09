import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { Request } from '../models/request';
import { EmailCheckValidators } from '../common/email-check.validators';
import { Endpoints } from '../common/endpoints';

declare let alertify: any;

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
        let firstName = data.data.firstName;
        alertify.dialog('alert').set({
            transition: 'fade',
            message: `${firstName}, your request submitted successfully!`
          }).show();

        this.resetForm(this.f);
      },
      (err) => {
        if (err.status == 400) {
          alertify.dialog('alert').set({
            transition: 'fade',
            message: err.error.errors[0].message
          }).show()
        } else {
          alertify.dialog('alert').set({
            transition: 'fade',
            message: 'Something went wrong! Your request has not been submitted. Please try again.'
          }).show()
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
