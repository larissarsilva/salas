import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  @Output() showCreateField = new EventEmitter()
  @Output() hasNewCourse = new EventEmitter();
  @Input() fieldType: any;
  @Input() coursesValues: any;

  
  listSubjects: any;
  showCreateButton!: boolean;
  coursesForm: FormGroup;
  courseId!: number;
  shifts = [
   { value: 0, alias: 'Manhã'},
   { value: 1, alias: 'Tarde'},
   { value: 2, alias: 'Noite'}
  ];


  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CourseService,
    private subjectServices: SubjectService
  ) {
    this.coursesForm = this.formBuilder.group({
      name: [null, Validators.required],
      shift: [null, Validators.required],
      subjectsIds: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.getSubjects();
    if(this.fieldType == 'edit') {
      this.fillFields();
      this.showCreateButton = false;
      this.courseId = this.coursesValues['id'];
    } else {
      this.showCreateButton = true;
    }
  }

  createCourse() {
    if(this.coursesForm.valid) {
      this.coursesService.postCourse(this.coursesForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        if(statusCode == 201) {
          this.refreshCourses();
          this.coursesForm.reset();
          console.log('response', response);
        } else {
        }
      })
    }
  }

  updateCourse() {
    this.coursesForm.value['id'] = this.courseId;
    this.coursesService.putCourse(this.coursesForm.value).subscribe((response: any) => {
      const statusCode = response['code'];
      //implementar as alterações do statusCode
    });
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  getSubjects() {
    this.subjectServices.getSubjects().subscribe((response:any) => {
      const statusCode = response['code'];
      if(statusCode == 200) {
        this.listSubjects = response['content'];
      } else {
        // validação
      }
    });
  }


  fillFields() {
    this.coursesForm.patchValue(this.coursesValues);
  }

  refreshCourses() {
    this.hasNewCourse.emit(true);
  }

}
