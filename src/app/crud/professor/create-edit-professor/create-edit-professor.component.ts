import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../course/course.service';
import { SubjectService } from '../../subject/subject.service';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'create-edit-professor',
  templateUrl: './create-edit-professor.component.html',
  styleUrls: ['./create-edit-professor.component.css']
})
export class CreateEditProfessorComponent implements OnInit {
  @Input() fieldType: any;
  @Input() professorValues: any;
  @Output() showCreateField = new EventEmitter();
  @Output() hasNewProfessor = new EventEmitter();

  professorForm: FormGroup;
  listSubjects: any;
  listCourses: any;
  showCreateButton: boolean = true;
  professorId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private subjectsServices: SubjectService,
    private coursesService: CourseService,
    private professorsService: ProfessorService
  ) {
    const uuid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    this.professorForm = this.formBuilder.group({
      name: [null, Validators.required],
      card: [{ 'uuid': uuid }],
      courseId: [],
      subjectsIds: [null]
    });
  }

  ngOnInit(): void {
    this.getSubjects();
    this.getCourses();
    switch (this.fieldType) {
      case 'edit':
        this.showCreateButton = false;
        this.fillFields();
        this.professorId = this.professorValues.id;
        break;

      default:
        this.showCreateButton = true;
        break;
    }
  }

  getCourses() {
    this.coursesService.getCourses().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listCourses = response['content'];
          break;

        default:
          break;
      }
    });
  }

  updateProfessor() {
    if (this.professorForm.valid) {
      this.professorForm.value['id'] = this.professorId;
      this.professorsService.putProfessor(this.professorForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 200:
            this.refreshProfessor();
            this.cancelCreate();
            break;

          default:
            break;
        }
        console.log('response', response)
      });
    }
  }

  createProfessor() {
    if (this.professorForm.valid) {
      this.professorsService.postProfessor(this.professorForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.professorForm.reset();
            this.refreshProfessor();
            break;

          default:
            break;
        }
      });
    }
  }

  getSubjects() {
    this.subjectsServices.getSubjects().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listSubjects = response['content'];
          break;

        default:
          break;
      }
    });
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  fillFields() {
    this.professorForm.patchValue(this.professorValues);
    this.professorForm.get('courseId')?.setValue(this.professorValues.course.id);
    const subjects = this.professorValues.subjects;
    let subjectsIds = [];
    for (let index = 0; index < subjects.length; index++) {
      const subjectId = subjects[index].id;
      subjectsIds.push(subjectId);
    }
    this.professorForm.get('subjectsIds')?.setValue(subjectsIds);
  }

  refreshProfessor() {
    this.hasNewProfessor.emit(true);
  }

}
