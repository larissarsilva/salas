import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../course/course.service';
import { SubjectService } from '../../subject/subject.service';
import { ProfessorService } from '../professor.service';
import Swal from 'sweetalert2';

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
  disableSubjectField: boolean = false;

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
      classes: [null]
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
    this.professorForm.value['id'] = this.professorId;
    if (this.professorForm.valid) {
      const professorName = this.professorForm.controls['name'].value;
      Swal.fire({
        title: 'Tem certeza que gostaria de editar o/a Professor(a): ' +  professorName + '?',
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
        this.professorsService.putProfessor(this.professorForm.value).subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.refreshProfessor();
              this.cancelCreate();
              Swal.fire(
                'Sucesso!',
                'Professor(a) atualizado(a)',
                'success'
              );
              break;

            default:
              break;
          }
          });
        }
      });
    } else {
      console.log('validar mensagem de erro');
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
    const coursesId =  this.professorValues.course.id;
    this.professorForm.controls['courseId'].setValue(coursesId)
    this.professorForm.removeControl('classes');
    this.professorForm.patchValue(this.professorValues);
  }

  refreshProfessor() {
    this.hasNewProfessor.emit(true);
  }

}
