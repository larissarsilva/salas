import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professors, Room, SubjectClass } from '../../crud.interface';
import { ProfessorService } from '../../professor/professor.service';
import { RoomService } from '../../room/room.service';
import { SubjectService } from '../../subject/subject.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-create-edit-schedule',
  templateUrl: './create-edit-schedule.component.html',
  styleUrls: ['./create-edit-schedule.component.css']
})
export class CreateEditScheduleComponent implements OnInit {
  @Input() fieldType!: string;
  @Input() classValues: any;
  @Output() showCreateField = new EventEmitter();
  @Output() hasNewClass = new EventEmitter();
  classForm: FormGroup;
  showCreateButton: boolean = true;
  classId!: number;

  listProfessors: Professors[] = [];
  listSubjects: SubjectClass[] = [];
  listRooms: Room[] = [];
  showClassButton!: boolean;
  showErrorCode!: number;

  listDays = [
    { id: 0, alias: 'Segunda' },
    { id: 1, alias: 'Terça' },
    { id: 2, alias: 'Quarta' },
    { id: 3, alias: 'Quinta' },
    { id: 4, alias: 'Sexta' },
    { id: 5, alias: 'Sábado' }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private classesService: ScheduleService,
    private subjectService: SubjectService,
    private professorService: ProfessorService
  ) {
    this.classForm = this.formBuilder.group({
      roomId: [null, Validators.required],
      professorsIds: [null, Validators.required],
      subjectId: [null, Validators.required],
      day: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getProfessor();
    this.getSubjects();
    this.getRoom();
    switch (this.fieldType) {
      case 'edit':
        this.showCreateButton = false;
        this.fillFields();
        this.classId = this.classValues.id;
        break;

      default:
        this.showCreateButton = true;
        break;
    }
  }

  getProfessor() {
    this.professorService.getProfessors().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listProfessors = response['content'];
          break;

        default:
          break;
      }
    })
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listSubjects = response.content;
          break;

        default: console.log('erro');
          break;
      }
    });
  }

  getRoom() {
    this.roomService.getRoom().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listRooms = response.content;
          break;
        case 204:
          console.log('NO CONTENT');
          break
        default: console.log('erro');
          break;
      }
    });
  }

  createClass() {
    if (this.classForm.valid) {
      console.log('criado classe')
      this.classesService.createClass(this.classForm.value).then((response: any) => {
        console.log('o response', response);
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.classForm.reset();
            this.refreshClass();
            this.showErrorCode = statusCode;
            break;

          default:
            break;
        }
      }).catch((error: any) => {
        const errorCode = error.code;
        this.showErrorCode = errorCode;
      });
    }
  }

  updateClass() {
    this.classForm.value['id'] = this.classId;
    if (this.classForm.valid) {
      this.classesService.editClass(this.classForm.value).then((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 200:
            this.classForm.reset();
            this.refreshClass();
            this.cancelCreate();
            this.showErrorCode = statusCode;
            break;

          default: console.log('validar');
            break;
        }
      }).catch((error: any) => {
        const errorCode = error.code;
        this.showErrorCode = errorCode;
      });
    }
  }

  fillFields() {
    const professorsIds = this.classValues.professors.map((value: any) => value.id);
    const roomId =  this.classValues.room.id;
    const subjectId = this.classValues.subject.id;
    this.classForm.controls['subjectId'].setValue(subjectId);
    this.classForm.controls['roomId'].setValue(roomId);
    this.classForm.controls['professorsIds'].setValue(professorsIds);
    this.classForm.patchValue(this.classValues);
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  refreshClass() {
    this.hasNewClass.emit(true);
  }
}
