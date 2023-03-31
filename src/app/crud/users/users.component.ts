import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Users } from '../crud.interface';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'email', 'hasValidEmail', 'role', 'actionsDetails'];
  showErrorCode!: number;
  listUsers: Users[] = [];
  filterUser: string = '';
  p = 1;

  // Comunicação com o componente create-edit-user
  fieldType!: string;
  sendUser!:string;
  disableButtons: boolean = false;
  showCreateUser: boolean = false;



  constructor(
    private ngxService: NgxUiLoaderService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.ngxService.start('getUsers');
    this.usersService.getUsers().then((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listUsers = response.content;
          console.log('lista de users', this.listUsers);
          break;

        default: console.log('erro', statusCode);
          break;
      }
    }).catch((error: any) => {
      const errorCode = error.code;
      this.showErrorCode = errorCode;
    }).finally(() => {
      this.ngxService.stop('getUsers');
    });
  }

  editUser(userValue: string) {
    this.disableButtons = true;
    this.showCreateUser = true;
    this.fieldType = 'edit';
    this.sendUser = userValue;
  }

  createUser() {
    this.disableButtons = true;
    this.showCreateUser = true;
    this.fieldType = 'create';
  }

  refreshGetUsers(value: any) {
    if (value) {
      this.getUsers();
    }
  }

  cancelCreate(value: boolean) {
    this.showCreateUser = value;
    this.disableButtons = value;
  }

  deleteUser(userId: number, name: string, surname: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar o usuário: ' + name + ' ' + surname + '?',
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
        this.ngxService.start('deleteUser');
        this.usersService.deleteUser(userId).then((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getUsers();
              Swal.fire(
              'Sucesso!',
              'Usuário excluído!',
              'success'
            );
              break;
          
            default:
              break;
          }
        }).catch((error: any) => {
          const errorCode = error.code;
          this.showErrorCode = errorCode;
        }).finally(() => {
          this.ngxService.stop('deleteUser');
        });
      }
    });
  }

}
