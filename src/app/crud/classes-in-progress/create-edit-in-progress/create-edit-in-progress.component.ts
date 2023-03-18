import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { Class, classInProgress, Professors, Room } from '../../crud.interface';
import { ProfessorService } from '../../professor/professor.service';
import { RoomService } from '../../room/room.service';
import { ScheduleService } from '../../schedule/schedule.service';
import { ClassesInProgressService } from '../classes-in-progress.service';

@Component({
  selector: 'app-create-edit-in-progress',
  templateUrl: './create-edit-in-progress.component.html',
  styleUrls: ['./create-edit-in-progress.component.css']
})
export class CreateEditInProgressComponent implements OnInit, AfterViewInit, OnDestroy {
  classInProgressForm: FormGroup;
  showCreateButton: boolean = true;
  classId!: number;
  listRooms: Room[] = [];
  listProfessors: Professors[] = [];
  listAllClasses: any;
  // Comunicação com o componente 'class in progress'
  @Input() fieldType!: string;
  @Input() classInProgressValues: any;
  @Output() showCreateField = new EventEmitter();
  @Output() hasNewClassInProgress = new EventEmitter();
  showExtraFields: boolean = false;

  // Filtrar seleção
    // protected banks: classInProgress[] = [];

    public bankCtrl: FormControl = new FormControl();
  
    public bankFilterCtrl: FormControl  = new FormControl();
  
    public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  
    @ViewChild('singleSelect') singleSelect!: MatSelect;
  
    protected _onDestroy = new Subject<void>();


  constructor(
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private professorService: ProfessorService,
    private classesService: ScheduleService,
    private classesInProgressServices: ClassesInProgressService,
    ) {
      this.classInProgressForm = this.formBuilder.group({
        classId: [null, Validators.required],
        responsibleProfessorId: [null, Validators.required],
        roomId: [null, Validators.required],
        roomName: [{value: '', disabled: true}],
        subjectName: [{value: '', disabled: true}],
        subjectCode: [{value: '', disabled: true}],
        subjectGroup: [{value: '', disabled: true}],
        note: [null]
      });
    }

  ngOnInit() {
    // this.getProfessor();
    // this.getRoom();
    this.getClass();
    switch (this.fieldType) {
      case 'edit':
        this.showCreateButton = false;
        this.fillFields();
        this.classId = this.classInProgressValues.id;
        break;

      default:
        this.showCreateButton = true;
        break;
    }
  }  

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  createClassInProgress() {
    if (this.classInProgressForm.valid) { 
      this.classesInProgressServices.createClassInProgress(this.classInProgressForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.classInProgressForm.reset();
            this.refreshClass();
            break;

          default: console.log('validar');
            break;
        }
      });
    }
  }

  updateClassInProgress() {

  }

  getSelectedClass(classValue: any) {
    console.log('pegou', classValue)
    // this.showExtraFields = true;
    // console.log('clicou', classValue)
    // this.classInProgressForm.controls['roomId'].setValue(classValue.room.id);
    // this.classInProgressForm.controls['roomName'].setValue(classValue.room.name);
    // this.classInProgressForm.controls['subjectName'].setValue(classValue.subject.name);
    // this.classInProgressForm.controls['subjectCode'].setValue(classValue.subject.code);
    // this.classInProgressForm.controls['subjectGroup'].setValue(classValue.subject.group);
    // this.listProfessors = classValue.professors;
  }

  getClass() {
    this.ngxService.start('getClasses');
    this.classesService.getClasses().subscribe((response: any) => {
      const statusCode = response['code'];
      this.ngxService.stop('getClasses');
      switch (statusCode) {
        case 200:
          this.listAllClasses = response['content'];
          
          this.filteredBanks.next(this.listAllClasses.slice());

          this.bankFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterBanks();
            });

          break;

        default:
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
        default: console.log('erro')
          break;
      }
    });
  }

  fillFields() {
    this.classInProgressForm.patchValue(this.classInProgressValues);
  }

  cancelCreate() {
    this.showExtraFields = false;
    this.classInProgressForm.reset();
    this.showCreateField.emit(false);
  }

  refreshClass() {
    this.hasNewClassInProgress.emit(true);
  }

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe((value: any) => {
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.listAllClasses) {
      return;
    }
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.listAllClasses.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanks.next(
      this.listAllClasses.filter((value:any) => {
        value.subject.name.toLowerCase().indexOf(search) > -1
      })
    );
  }

}
