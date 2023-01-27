import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CourseComponent implements OnInit {
response = [
    {
      "name": "Engenharia da Computação",
      "shift": 1,
      "subjects": [
        {
          "name": "calculo numerico",
          "code": "GHBP9765",
          "hours": 15,
          "group": "st",
          "courses": null,
          "professors": [],
          "id": 1
        },
        {
          "name": "LPI",
          "code": "GHBP9765",
          "hours": 30,
          "group": "st",
          "courses": null,
          "professors": [],
          "id": 1
        }
      ],
      "id": 1
    },
    {
      "name": "Engenharia Civil",
      "shift": 0,
      "subjects": [],
      "id": 3
    }
  ];

  columnsToDisplay = ['name', 'shift'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement = this.response;


 dataSource = this.response;

  ngOnInit() { 
  }

}
