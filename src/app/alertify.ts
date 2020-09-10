declare let alertify: any;

export function alertifyAlert(message: any): void {
  alertify
    .dialog('alert')
    .set({
      transition: 'fade',
      message: message,
    }).show();
}
