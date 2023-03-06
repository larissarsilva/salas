import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pdfClass } from '../../crud.interface';

export interface DialogData {
  pdfData: any;
}

@Component({
  selector: 'app-pdf-list-create',
  templateUrl: './pdf-list-create.component.html',
  styleUrls: ['./pdf-list-create.component.css']
})

export class PdfListCreateComponent implements OnInit {
  allClasses: pdfClass[] = [];
  classesForm!: FormGroup;


  listDays = [
    { id: 0, alias: 'Segunda' },
    { id: 1, alias: 'Terça' },
    { id: 2, alias: 'Quarta' },
    { id: 3, alias: 'Quinta' },
    { id: 4, alias: 'Sexta' },
    { id: 5, alias: 'Sábado' }
  ];
  formSize: any;
  // multipleForm: FormGroup[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PdfListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      this.allClasses = this.data.pdfData;
      this.classesForm = this.formBuilder.group({
        classes: this.formBuilder.array([])
    });
    }

    ngOnInit() {
      this.fillFields();
      this.addClasses();
    }

    closeModal() {
      this.dialogRef.close();
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
        const classForm = this.formBuilder.group({
          roomName: [roomName, Validators.required],
          subjectCode: [subjectCode, Validators.required],
          subjectGroup: [subjectGroup, Validators.required],
          day: [day, Validators.required],
          startTime: [startTime, Validators.required],
          endTime: [endTime, Validators.required],
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

}
