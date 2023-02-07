import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../course/course.service';
import { ProfessorService } from '../../professor/professor.service';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  @Output() hasNewSubject = new EventEmitter();
  @Output() showCreateField = new EventEmitter();
  @Input() fieldType: any;
  @Input() subjectValues: any;


  subjectsForm: FormGroup;
  subjectId!: number;
  listCourses: any;
  listProfessors: any;
  listHours = [15, 30, 45, 60, 75, 90, 180];
  showCreateButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private coursesService: CourseService,
    private professorsService: ProfessorService
  ) {
    this.subjectsForm = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      hours: [null, Validators.required],
      group: [null, Validators.required],
      coursesIds: [null],
      professorsId: [null]
    });
  }
  
  ngOnInit(): void {
    this.getCourses();
    this.getProfessors();
    if(this.fieldType == 'edit') {
      // preencher os campos do edit
      this.showCreateButton = false;
      this.fillFields();
      this.subjectId = this.subjectValues.id
    } else {
      this.showCreateButton = true;
    }
  }

  fillFields() {
    this.subjectsForm.patchValue(this.subjectValues)
  }

  editSubject() {
    this.subjectsForm.value['id'] = this.subjectId;
    this.subjectService.putSubject(this.subjectsForm.value).subscribe((response: any) => {
      // const statusCode = response['code'];
      this.clearFields();
      this.refreshSubjects();
      this.cancelCreate();
      // if(statusCode == 200) {
      //   //top
      // } else {
      //   // implementar
      // }
    });
  }

  createSubject(){
    if(this.subjectsForm.valid) {
      this.subjectService.postSubject(this.subjectsForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        if (statusCode == 200) {
          this.clearFields();
          this.refreshSubjects();
        } else {
          // implementar
        }
      });
    } else {
      console.log('formulario', this.subjectsForm.controls['name'].errors);
    }
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  getCourses() {
    this.coursesService.getCourses().subscribe((response:any) => {
      const statusCode = response['code'];
      if(statusCode == 200) {
        this.listCourses = response['content'];
      } else {
        //validar erro
      }
    });
  }

  getProfessors() {
    this.professorsService.getProfessor().subscribe(response => {
      this.listProfessors = response;
    });
  }

  clearFields() {
    this.subjectsForm.reset();
    this.subjectsForm.markAsPristine();
  }

  refreshSubjects() {
    this.hasNewSubject.emit(true);
  }

}
