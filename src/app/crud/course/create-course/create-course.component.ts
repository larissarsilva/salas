import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  coursesForm: FormGroup;
  shifts = [
   { value: 0, alias: 'Manhã'},
   { value: 1, alias: 'Tarde'},
   { value: 2, alias: 'Noite'}
  ];

  @Output() showCreateField = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CourseService
  ) {
    this.coursesForm = this.formBuilder.group({
      name: [null, Validators.required],
      shift: [null, Validators.required],
      subjects: [null, Validators.required]
    });
  }

  createCurse() {
    const name = this.coursesForm.controls['name'].value;
    let shift = this.coursesForm.controls['shift'].value;
    const subjects = this.coursesForm.controls['subjects'].value;

    this.coursesService.postCourse(name, shift, subjects).subscribe(response => {
      console.log('response', response);
    })
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  getSubjects() {
    
  }
}
