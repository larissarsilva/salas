import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CrudComponent } from './crud.component';
import { ProfessorComponent } from './professor/professor.component';
import { RoomComponent } from './room/room.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { WarningComponent } from './warning/warning.component';

const routes: Routes = [
  {path: '', component: CrudComponent, children: [
    {
      path: '',
      redirectTo: 'horario',
      pathMatch: 'full'
    },
    {path: 'horario', component: ScheduleComponent},
    {path: 'professor', component: ProfessorComponent},
    {path: 'estudante', component: StudentComponent},
    {path: 'curso', component: CourseComponent},
    {path: 'disciplina', component: SubjectComponent},
    {path: 'sala', component: RoomComponent},
    {path: 'aviso', component: WarningComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
