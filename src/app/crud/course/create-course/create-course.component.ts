import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../course.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

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
  disableSubjectField: boolean = false;
  shifts = [
    { value: 0, alias: 'Manhã' },
    { value: 1, alias: 'Tarde' },
    { value: 2, alias: 'Noite' }
  ];
  showErrorCode!: number;


  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CourseService,
    private subjectServices: SubjectService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.coursesForm = this.formBuilder.group({
      name: [null, Validators.required],
      shift: [null, Validators.required],
      subjectsIds: [null]
    });
  }
  ngOnInit(): void {
    this.getSubjects();
    if (this.fieldType == 'edit') {
      this.fillFields();
      this.showCreateButton = false;
      this.courseId = this.coursesValues['id'];
    } else {
      this.showCreateButton = true;
    }
  }

  createCourse() {
    const hasSubjectsIds = this.coursesForm.value['subjectsIds'];
    if (hasSubjectsIds == null || this.disableSubjectField) {
      this.coursesForm.removeControl('subjectsIds');
    }
    if (this.coursesForm.valid) {
      this.ngxService.start('createCourse');
      this.coursesService.postCourse(this.coursesForm.value)
        .then((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 201:
              this.refreshCourses();
              this.coursesForm.reset();
              break;

            default:
              break;
          }
        }).catch((error: any) => {
          const errorCode = error.code;
          this.showErrorCode = errorCode;
          console.log('codigo do erro', this.showErrorCode)
        }).finally(() => {
          this.ngxService.stop('createCourse');
        });
    }
  }

  updateCourse() {
    const hasSubjectsIds = this.coursesForm.value['subjectsIds'];
    if (hasSubjectsIds == null || this.disableSubjectField) {
      this.coursesForm.removeControl('subjectsIds');
    }
    this.coursesForm.value['id'] = this.courseId;
    if (this.coursesForm.valid) {
      Swal.fire({
        title: 'Tem certeza que gostaria de editar o Curso: ' + this.coursesForm.value['name'] + '?',
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
          this.ngxService.start('updateCourse');
          this.coursesService.putCourse(this.coursesForm.value).then((response: any) => {
            const statusCode = response['code'];
            switch (statusCode) {
              case 200:
                this.cancelCreate();
                this.refreshCourses();
                this.coursesForm.reset();
                Swal.fire(
                  'Sucesso!',
                  'Curso atualizado!',
                  'success'
                );
                break;

              default:
                break;
            }
          }).catch((error: any) => {
            const errorCode = error.code;
            this.showErrorCode = errorCode;
          }).finally(() => {
            this.ngxService.stop('updateCourse');
          });
        }
      });
    }
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  getSubjects() {
    this.subjectServices.getSubjects().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listSubjects = response['content'];
          if (this.listSubjects.length == 0) {
            this.disableSubjectField = true;
          } else {
            this.disableSubjectField = false;
          }
          break;

        default: console.log('validação de erro');
          break;
      }
    });
  }


  fillFields() {
    let shiftValue = this.coursesValues.shift.toLowerCase();
    switch (shiftValue) {
      case 'manhã':
        shiftValue = 0;
        break;

      case 'tarde':
        shiftValue = 1;
        break;

      case 'noite':
        shiftValue = 2;
        break;

      default: shiftValue = 0;
        break;
    }
    // VALIDAR OS IDS COM UM LAÇO PARA PASSAR OS SUBJECTS
    this.coursesValues.shift = shiftValue;
    this.coursesForm.patchValue(this.coursesValues);
  }

  refreshCourses() {
    this.hasNewCourse.emit(true);
  }

}
