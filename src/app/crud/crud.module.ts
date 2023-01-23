import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from './crud.service';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleComponent } from './schedule/schedule.component';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SubjectComponent } from './subject/subject.component';
import { CourseComponent } from './course/course.component';
import { RoomComponent } from './room/room.component';
import { WarningComponent } from './warning/warning.component';


@NgModule({
  declarations: [CrudComponent, ProfessorComponent, StudentComponent, ScheduleComponent, SubjectComponent, CourseComponent, RoomComponent, WarningComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [CrudService],
})
export class CrudModule { }
