## Signup Form with async validation

#### Live demo: https://ennadev.github.io/signup-form/

This is a demonstration of a signup form with validations. The project is built with Angular 10 using Angular Material. 
Key concepts:
- Built-in required validator for all fields.
- Custom asynchronous validation for checking if the email already exists. For activating the email validator, try to input `test@test.com` which already exists.
- Built-in minimum length of 3 characters validation for the password.
- In the case any field is invalid, the submission button is disabled and the user cannot submit the form.
- Error messages notify the user for each error accordingly.
- Notify the user whether the submission was successful or failed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
