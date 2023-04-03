import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogData } from 'src/app/crud/schedule/pdf-list-create/pdf-list-create.component';
import { FirstAccessService } from './first-access.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SetNewPasswordComponent } from 'src/app/crud/set-new-password/set-new-password.component';


@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.css']
})
export class FirstAccessComponent {

  userForm: FormGroup;
  hide: boolean = true;
  showErrorCode!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firstAccessService: FirstAccessService,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FirstAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      code: [null, Validators.required]
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  validateAccess() {
    if (this.userForm.valid) {
      this.ngxService.start('validateAccess');
      this.firstAccessService.firstAccess(this.userForm.value).then((response: any) => {
        const statusCode = response['code'];
        const token = response['content']['token'];
        const userContent = response['content']['user'];
        switch (statusCode) {
          case 200:
            window.localStorage.setItem('token', token);
            this.router.navigate(['/listagem']);
            this.closeModal();
            console.log('response', response);
            Swal.fire(
              'Email validado com sucesso',
              'Você será redirecionado para criar uma nova senha!',
              'success'
            );
            this.newPasswordModal(userContent);
            break;

          default:
            break;
        }
      }).catch((error: any) => {
        const errorCode = error.code;
        this.showErrorCode = errorCode;
        console.log('codigo do erro',this.showErrorCode)
      }).finally(() => {
        this.ngxService.stop('validateAccess');
      });
    }
  }

  newPasswordModal(userContent: any) {
    window.localStorage.setItem('name', userContent.name);
    window.localStorage.setItem('surname', userContent.surname);
    window.localStorage.setItem('email', userContent.email);
    const dialogRef = this.dialog.open(SetNewPasswordComponent, {
      data: {
        name: userContent.name,
        surname: userContent.surname,
        email: userContent.email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        this.newPasswordModal(userContent);
      }
    });
  }

}
