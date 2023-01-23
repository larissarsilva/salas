import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { ProfessorComponent } from './professor/professor.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: '', component: CrudComponent, children: [
    {
      path: '',
      redirectTo: 'horario',
      pathMatch: 'full'
    },
    {path: 'horario', component: ScheduleComponent},
    {path: 'professor', component: ProfessorComponent},
    {path: 'estudante', component: StudentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
