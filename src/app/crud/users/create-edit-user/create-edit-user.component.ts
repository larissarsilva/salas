import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';
import { Users } from '../../crud.interface';


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  userId!: number;
  userForm: FormGroup;
  showCreateButton: boolean = true;
  showErrorCode!: number;
  listOfRoles = [
    {id: 1, name: 'Funcionário'},
    {id: 2, name: 'Administrador'}
  ];

  //Comunicação com o componente de users
  @Output() hasNewUser = new EventEmitter();
  @Output() showCreateField = new EventEmitter();
  @Input() fieldType: any;
  @Input() userValues: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private usersService: UsersService
  ) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(15)]],
      surname: [null, [Validators.required, Validators.maxLength(15)]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.fieldType == 'edit') {
      // preencher os campos do edit
      this.showCreateButton = false;
      this.fillFields();
      this.userId = this.userValues.id
    } else {
      this.showCreateButton = true;
    }
  }

  async createUser() {
    if (this.userForm.valid) {
      this.ngxService.start('createUser');
      await this.usersService.postUser(this.userForm.value).then((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.clearFields();
            this.refreshUsers();
            break;

          default:
            this.showErrorCode = statusCode;
            break;
        }
      }).catch((error: any) => {
        const errorCode = error.code;
        this.showErrorCode = errorCode;
      }).finally(() => {
        this.ngxService.stop('createUser');
      });
    }
  }

  updateUser() {
    const name = this.userForm.controls['name'].value
    if (this.userForm.valid) {
      this.userForm.value['id'] = this.userId;
      Swal.fire({
        title: 'Tem certeza que gostaria de editar o usuário ' + name + ' ?',
        text: "Essa ação não poderá ser desfeita",
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ngxService.start('updateUser');
          this.usersService.putUser(this.userForm.valid).then((response: any) => {
            const statusCode = response['code'];
            switch (statusCode) {
              case 200:
                this.userForm.reset();
                this.cancelCreate();
                this.refreshUsers();
                Swal.fire(
                  'Sucesso!',
                  'Usuário atualizado!',
                  'success'
                );
                break;
            
              default:
                this.showErrorCode = statusCode;
                break;
            }
          }).catch((error: any) => {
            const errorCode = error.code;
            this.showErrorCode = errorCode;
          }).finally(() => {
            this.ngxService.stop('updateUser');
          });
        }
      });
    }
  }

  fillFields() {
    this.userForm.patchValue(this.userValues)
    console.log('form', this.userForm)

  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  clearFields() {
    this.userForm.reset();
  }

  refreshUsers() {
    this.hasNewUser.emit(true);
  }

}
