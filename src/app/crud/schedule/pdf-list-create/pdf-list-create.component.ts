import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { pdfClass, Professors } from '../../crud.interface';
import { ProfessorService } from '../../professor/professor.service';
import { ScheduleService } from '../schedule.service';

export interface DialogData {
  pdfData: any;
  pdfName: string;
}

@Component({
  selector: 'app-pdf-list-create',
  templateUrl: './pdf-list-create.component.html',
  styleUrls: ['./pdf-list-create.component.css']
})

export class PdfListCreateComponent implements OnInit {
  allClasses: pdfClass[] = [];
  listProfessors: Professors[] = [];
  classesForm!: FormGroup;
  enableSave: boolean = false;
  showEdit: boolean = true;
  pdfName: string;

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
    private classesService: ScheduleService,
    private professorService: ProfessorService,
    private ngxService: NgxUiLoaderService,
    public dialogRef: MatDialogRef<PdfListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.allClasses = this.data.pdfData;
    this.pdfName = this.data.pdfName;
    this.classesForm = this.formBuilder.group({
      classes: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.fillFields();
    this.addClasses();
    this.getProfessor();
  }

  closeModal(refreshClass: boolean) {
    this.dialogRef.close(refreshClass);
  }

  async addClasses() {
    const formSize = await this.allClasses.length;
    for (let index = 0; index < formSize; index++) {
      const getClass = this.allClasses[index];
      const roomName = getClass['roomName'];
      const subjectGroup = getClass['subjectGroup'];
      const subjectCode = getClass['subjectCode'];
      const day = getClass['day'];
      const startTime = getClass['startTime'];
      const endTime = getClass['endTime'];
      const professors = getClass['professors'];
      const classForm = this.formBuilder.group({
        roomName: [{ value: roomName, disabled: true }, Validators.required],
        professors: [{ value: professors, disabled: true }, Validators.required],
        subjectCode: [{ value: subjectCode, disabled: true }, Validators.required],
        subjectGroup: [{ value: subjectGroup, disabled: true }, Validators.required],
        day: [{ value: day, disabled: true }, Validators.required],
        startTime: [{ value: startTime, disabled: true }, Validators.required],
        endTime: [{ value: endTime, disabled: true }, Validators.required],
      });
      this.classes.push(classForm);
      this.allClasses[index].isSelected = false;
    }
  }

  get classes() {
    return this.classesForm.controls['classes'] as FormArray;
  }

  selectAll() {
    const checkBoxSize = this.allClasses.length;
    for (let index = 0; index < checkBoxSize; index++) {
      this.allClasses[index].isSelected = true;
    }
  }

  fillFields() {
    // console.log('antes de preencher', this.classesForm)
    // this.classesForm.patchValue(this.allClasses);
    // console.log('depois de preencher', this.classesForm)
    // this.multipleForm.patchValue(this.allClasses);
  }

  onChange(event: boolean, row: any) {
    this.allClasses[row].isSelected = event;
    this.countSelectedClass();
  }

  // Verifica se tem pelo menos um checkbox selecionado para liberar a opção de salvar
  countSelectedClass() {
    const hasSelectedClass = this.allClasses.findIndex(value => value.isSelected === true);
    console.log('hasSelectedClass', hasSelectedClass)
    if (hasSelectedClass != -1) {
      this.enableSave = true;
    } else {
      this.enableSave = false;
    }
  }

  createSelectedClasses() {
    this.ngxService.start('createClass');
    let classList = [];
    for (let index = 0; index < this.classes.controls.length; index++) {
      const element = this.classes.controls[index].value
      classList.push(element)
    }
    this.classesService.multipleClasses(classList).subscribe((response: any) => {
      this.ngxService.stop('createClass');
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.closeModal(true)
          break;

        default:
          break;
      }
    });
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

  confirmEdit(row: number, classForm: any) {
    this.classes.controls[row] = classForm;
    this.classes.controls[row].disable();
    this.showEdit = true;
  }

  enableEdit(row: number) {
    this.classes.controls[row].enable();
    this.showEdit = false;
  }

  cancelEdit(row: number) {
    this.classes.controls[row].disable();
    this.showEdit = true;
    // ajustar o cancelar
  }

}
