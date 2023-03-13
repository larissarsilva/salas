import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { classInProgress } from '../crud.interface';
import { ClassesInProgressService } from './classes-in-progress.service';

@Component({
  selector: 'app-classes-in-progress',
  templateUrl: './classes-in-progress.component.html',
  styleUrls: ['./classes-in-progress.component.css']
})
export class ClassesInProgressComponent implements OnInit {

  // Exibição na tabela
  displayedColumns: string[] = ['responsibleProfessorName','subjectName', 'subjectCode', 'roomName', 'roomBlock', 
  'subjectGroup','note', 'actions'];
  listClassesInProgress: classInProgress[] = [];
  
  // Filtro e paginação
  filterClass = '';
  p: number = 1;

  //Comunicação com o componente de criação
  showCreateClass: boolean = false;
  fieldType!: string;
  sendClassInProgressValues!: any;


  constructor(
    private classesServices: ClassesInProgressService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.getClassesInProgress();
  }

  getClassesInProgress() {
    this.ngxService.start('getClass');
    this.classesServices.getClassesInProgress().subscribe((response: any) => {
    this.ngxService.stop('getClass');
    const statusCode = response['code'];
    switch (statusCode) {
      case 200:
        this.listClassesInProgress = response['content'];
        console.log('response', response);
        break;
    
      default:
        break;
    }
    });
  }

  createClassInProgress() {
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClassInProgress(data: any) {
    this.showCreateClass = true;
    this.fieldType = 'edit';
    this.sendClassInProgressValues = data;
  }

  deleteClassInProgress(classId: number) {
    
  }

  refreshClassInProgress(value: any) {
    if(value) {
      this.getClassesInProgress();
    }
  }

  getShowCreateFieldValue(value: any) {
    this.showCreateClass = value;
  }
}
