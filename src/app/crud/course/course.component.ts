import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CourseComponent implements OnInit {
  showCreateCouse: boolean = false;

  // Table
  expandedElement: any;
  dataSource: any;
  columnsToDisplay = ['name', 'shift'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actionsDetails'];

  constructor(
    private courses: CrudService
  ) { }
  
  ngOnInit() { 
    this.getCourses();
  }

  getCourses() {
    this.courses.getCourses().subscribe(responseObject => {
      this.dataSource = responseObject;
      for (let index = 0; index < this.dataSource.length; index++) {
        const element = this.dataSource[index];
        element['index'] = index;
        if(element['shift'] == 0) {
          element['shift'] = 'MANHÃ'
        } else if (element['shift'] == 1) {
          element['shift'] = 'TARDE'
        } else if (element['shift'] == 2) {
          element['shift'] = 'NOITE'
        }
      }
    });
    this.expandedElement = this.dataSource;
  }

  createCourse() {
    this.showCreateCouse = true;
  }

  getEventValue(value: boolean) {
    this.showCreateCouse = value;
  }

  deleteCourse(id: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courses.deleteCourse(id).subscribe(result => {
          this.getCourses();
          console.log('result', result)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
      }
    })
  }

}
