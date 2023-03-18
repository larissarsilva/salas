import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Professors } from '../crud.interface';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProfessorComponent implements OnInit {
  filterProfessor = '';
  p: number = 1;
  showCreateProfessor: boolean = false;
  fieldType!: string;
  sendProfessorValues: any;
  // Table
  expandedElement: any;
  // dataSource: any;
  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actionsDetails'];
  listProfessors: Professors[] = [];

  constructor(
    private professorService: ProfessorService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getProfessor();
  }

  getProfessor() {
    this.ngxService.start('getProfessors');
    this.professorService.getProfessors().subscribe((response: any) => {
      this.ngxService.stop('getProfessors');
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listProfessors = response['content'];
          break;

        default:
          break;
      }
    })
  }

  createProfessor() {
    this.showCreateProfessor = true;
    this.fieldType = 'create';
  }

  editProfessor(data: any) {
    this.fieldType = 'edit';
    this.sendProfessorValues = data;
    this.showCreateProfessor = true;
  }

  deleteProfessor(professorId: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar o/a Professor(a): ' + name + '?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start('deleteProfessors');
        this.professorService.deleteProfessor(professorId).subscribe((response: any) => {
          const statusCode = response['code'];
          this.ngxService.stop('deleteProfessors');
          switch (statusCode) {
            case 200:
              this.getProfessor();
              Swal.fire(
                'Sucesso!',
                'Professor(a) excluído(a)',
                'success'
              );
              break;
    
            default:
              break;
          }
        });
      }
    });
  }

  getCreateFieldValue(value: any) {
    this.showCreateProfessor = value;
  }

  refreshProfessor(value: boolean) {
    if (value) {
      this.getProfessor();
    }
  }

}
