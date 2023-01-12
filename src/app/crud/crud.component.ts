import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  constructor(
    private courses: CrudService
  ) { }

  ngOnInit() {
    this.courses.getCourses().subscribe(value => console.log('valor',value));
  }

}
