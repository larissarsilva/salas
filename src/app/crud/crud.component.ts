import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CrudService } from './crud.service';
import { AccountService } from '../access/account.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  getRole: any;
  constructor(
    private courses: CrudService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.getAuth();
    // this.courses.getCourses().subscribe(value => console.log('valor',value));
  }

  isExpanded = true;
  isShowing = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  async getAuth() {
    const token: any = window.localStorage.getItem('token');
    this.getRole = await this.accountService.getTokenRole(token);
  }

}
