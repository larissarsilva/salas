import { NgxPaginationModule } from 'ngx-pagination';
import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from './crud.service';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatSelectModule } from '@angular/material/select';
import { SubjectComponent } from './subject/subject.component';
import { CourseComponent } from './course/course.component';
import { RoomComponent } from './room/room.component';
import { WarningComponent } from './warning/warning.component';
import { CreateStudentComponent } from './modals/create-student/create-student.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './course/course.service';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { SubjectService } from './subject/subject.service';
import { ProfessorService } from './professor/professor.service';
import { RoomService } from './room/room.service';
import { CreateEditProfessorComponent } from './professor/create-edit-professor/create-edit-professor.component';
import { CreateEditRoomComponent } from './room/create-edit-room/create-edit-room.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ScheduleService } from './schedule/schedule.service';
import { CreateEditScheduleComponent } from './schedule/create-edit-schedule/create-edit-schedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PdfListCreateComponent } from './schedule/pdf-list-create/pdf-list-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ClassesInProgressComponent } from './classes-in-progress/classes-in-progress.component';
import { CreateEditInProgressComponent } from './classes-in-progress/create-edit-in-progress/create-edit-in-progress.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CardTitleComponent } from '../components/card-title/card-title.component';
import { UsersComponent } from './users/users.component';
import { CreateEditUserComponent } from './users/create-edit-user/create-edit-user.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';


@NgModule({
  declarations: [
    CrudComponent,
    ProfessorComponent,
    StudentComponent,
    ScheduleComponent,
    SubjectComponent,
    CourseComponent,
    RoomComponent,
    WarningComponent,
    CreateStudentComponent,
    CreateCourseComponent,
    CreateSubjectComponent,
    CreateEditProfessorComponent,
    CreateEditScheduleComponent,
    CreateEditRoomComponent,
    FilterPipe,
    PdfListCreateComponent,
    ClassesInProgressComponent,
    CreateEditInProgressComponent,
    CardTitleComponent,
    UsersComponent,
    CreateEditUserComponent,
    SetNewPasswordComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    NgxUiLoaderModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    ClassesInProgressComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateEditInProgressComponent),
      multi: true,
    },
    CrudService,
    CourseService,
    SubjectService,
    ProfessorService,
    RoomService,
    ScheduleService
  ],
})
export class CrudModule { }
