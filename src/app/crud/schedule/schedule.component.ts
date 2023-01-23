import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})


export class ScheduleComponent implements  OnInit {
  displayedColumns: string[] = ['professor', 'booking', 'class', 'building', 'room', 'schedule', 'status' ];

  ELEMENT_DATA = [
    {professor: 'Larissa Silva', booking: 'Eng. de Software', class: 'AM', building: 'B', room: 'LIP 07', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'Cálculo 3', class: 'BM', building: 'H', room: 'LIP 05', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'Cálculo 3', class: 'CT', building: 'L', room: '05', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'Cálculo 2', class:'AM', building: 'B', room: '08', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'Sinais e Sistemas', class: 'AM', building: 'B', room: '15', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'Poli Júnior', class: 'AM', building: 'C', room: '01', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor:'Larissa Silva', booking: 'Palestra Inovação', class: 'AM', building: 'A', room: 'LIP 03', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'CAEC', class: 'AM', building: 'O', room: '05', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'LPOO', class:'AM', building: 'F', room: '05', schedule: '08:30 - 10:00', status: 'reservado'},
    {professor: 'Larissa Silva', booking: 'TCC', class: 'AM', building: 'N', room: '05', schedule: '08:30 - 10:00', status: 'reservado'},
  ];
  
  dataSource = this.ELEMENT_DATA;
  ngOnInit() {
  }

  
  
}
