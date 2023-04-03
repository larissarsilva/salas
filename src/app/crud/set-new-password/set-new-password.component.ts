import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetNewPasswordService } from './set-new-password.service';

export interface DialogData {
  name: string;
  surname: string;
  email: string;
}

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {

  setNewPasswordForm: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/);
  showErrorCode!: number;
  getName: string;
  getSurname: string;
  getEmail: string;

  constructor(
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private newPasswordService: SetNewPasswordService,
    public dialogRef: MatDialogRef<SetNewPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.setNewPasswordForm = this.formBuilder.group({
      name: [null],
      surname: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
    this.getName = this.data.name;
    this.getEmail = this.data.email;
    this.getSurname = this.data.surname;
  }

  ngOnInit() {
    const userObject = {
      name: this.getName,
      surname: this.getSurname,
      email: this.getEmail
    }
    this.fillFields(userObject)
  }

  closeModal(value: boolean) {
    this.dialogRef.close(value);
  }

  checkPasswords() {
    const password = this.setNewPasswordForm.controls['password'].value;
    const confirmPassword = this.setNewPasswordForm.controls['confirmPassword'].value;
    //validar o regex
    const validatePasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (password == confirmPassword) {
      if (!validatePasswordRegex.exec(password)) {
        this.showErrorCode = 2;
      } else {
        this.newPasswordService.setNewPassword(this.setNewPasswordForm.value).then((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.closeModal(true);
              // localStorage.clear(); limpar o localstorage?
              break;

            default:
              break;
          }
          console.log('response', response);
        }).catch((error: any) => {
          const errorCode = error.code;
          this.showErrorCode = errorCode;
          console.log('codigo do erro', this.showErrorCode)
        }).finally(() => {
          this.ngxService.stop('validateAccess');
          this.setNewPasswordForm.controls['password'].reset();
          this.setNewPasswordForm.controls['confirmPassword'].reset();
        });
      }
    } else {
      this.showErrorCode = 1;
    }
  }

  fillFields(userValues: any) {
    this.setNewPasswordForm.patchValue(userValues)
  }

}
