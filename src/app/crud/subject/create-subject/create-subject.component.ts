import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../course/course.service';
import { SubjectService } from '../subject.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

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
  listworkload = [15, 30, 45, 60, 75, 90, 180];
  showCreateButton: boolean = true;
  disableCourse!: boolean;
  showErrorCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private coursesService: CourseService,
    private ngxService: NgxUiLoaderService
  ) {
    this.subjectsForm = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      workload: [null, Validators.required],
      group: [null, Validators.required],
      coursesIds: [null],
      // professorsId: [null]
    });
  }

  ngOnInit(): void {
    this.getCourses();
    if (this.fieldType == 'edit') {
      // preencher os campos do edit
      this.showCreateButton = false;
      this.fillFields();
      this.subjectId = this.subjectValues.id
    } else {
      this.showCreateButton = true;
    }
  }

  fillFields() {
    const coursesIds = this.subjectValues.courses.map((value: any) => value.id);
    this.subjectsForm.controls['coursesIds'].setValue(coursesIds);
    this.subjectsForm.patchValue(this.subjectValues)
  }

  editSubject() {
    this.subjectsForm.value['id'] = this.subjectId;
    if (this.subjectsForm.valid) {
      Swal.fire({
        title: 'Tem certeza que gostaria de editar a Disciplina : ' + this.subjectsForm.value['name'] + '?',
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
          this.subjectService.putSubject(this.subjectsForm.value).subscribe((response: any) => {
            const statusCode = response['code'];
            switch (statusCode) {
              case 200:
                this.clearFields();
                this.refreshSubjects();
                this.cancelCreate();
                Swal.fire(
                  'Sucesso!',
                  'Disciplina atualizada!',
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
  }

  createSubject() {
    if (this.subjectsForm.valid) {
      this.ngxService.start('createSubject');
      this.subjectService.postSubject(this.subjectsForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        this.ngxService.stop('createSubject');
        switch (statusCode) {
          case 201:
            this.clearFields();
            this.refreshSubjects();
            break;

          default: console.log('implementar')
            break;
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
    this.coursesService.getCourses().then((response: any) => {
      const statusCode = response['code'];
      if (statusCode == 200) {
        this.listCourses = response['content'];
        if (this.listCourses == 0) {
          this.disableCourse = true;
        } else {
          this.disableCourse = false;
        }
      } else {
        //validar erro
      }
    }).catch((error: any) => {
      const errorCode = error.code;
      this.showErrorCode = errorCode;
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
