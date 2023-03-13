import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { RoomService } from '../room/room.service';
import { PdfListCreateComponent } from './pdf-list-create/pdf-list-create.component';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})


export class ScheduleComponent implements OnInit {
  filterClass = '';
  p: number = 1;
  showCreateClass: boolean = false;
  fieldType!: string;
  sendClassValues!: any;

  displayedColumns: string[] = ['professors', 'subject', 'room', 'day', 'startTime', 'endTime', 'action'];
  ELEMENT_DATA = [];
  listClasses: any;
  selectedFile: any;
  listPDFContent: any;

  constructor(
    private roomService: RoomService,
    private ngxService: NgxUiLoaderService,
    private classesService: ScheduleService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getClass();
  }

  getClass() {
    this.ngxService.start('getClasses');
    this.classesService.getClasses().subscribe((response: any) => {
      const statusCode = response['code'];
      this.ngxService.stop('getClasses');
      switch (statusCode) {
        case 200:
          this.listClasses = response['content'];
          break;

        default:
          break;
      }
    });
  }

  createClass() {
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClass(data: any) {
    this.showCreateClass = true;
    this.fieldType = 'edit';
    this.sendClassValues = data;
  }

  deleteClass(classId: number) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar ?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start('deleteClass');
        this.classesService.deleteClass(classId).subscribe((response: any) => {
          this.ngxService.stop('deleteClass');
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getClass();
              break;

            default:
              break;
          }
        });
      }
    });
  }
  
  deleteAllClasses() {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar todos os registros ?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start('deleteAlClasses');
        this.classesService.deleteAllClasses().subscribe((response: any) => {
          this.ngxService.stop('deleteAlClasses');
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getClass();
              break;

            default:
              break;
          }
        });
      }
    });
  }

  refreshClass(value: any) {
    if (value) {
      this.getClass();
    }
  }

  getShowCreateFieldValue(value: any) {
    this.showCreateClass = value;
  }

  onFileSelect(event: any) {
    this.ngxService.start('openModal');
    this.selectedFile = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', this.selectedFile);
    this.classesService.uploadPDF(formdata).subscribe(async (response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listPDFContent = await response['content'];
          this.openModal(this.listPDFContent)
          this.ngxService.stop('openModal');
          break;
      
        default:
          break;
      }
    });
  }

  openModal(pdfContent: any) {
      const dialogRef = this.dialog.open(PdfListCreateComponent, {
        data: {pdfData: pdfContent},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('resultado', result)
        if(result) {
          this.getClass();
        }
      });
  }
}
