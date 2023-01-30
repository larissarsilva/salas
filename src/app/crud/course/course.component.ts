import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

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
  expandedElement: any;
  dataSource: any;
  columnsToDisplay = ['name', 'shift'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(
    private courses: CrudService
  ) { }
  
  ngOnInit() { 
    this.courses.getCourses().subscribe(responseObject => {
      this.dataSource = responseObject;
    });
    this.expandedElement = this.dataSource;
  }

}
