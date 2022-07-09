import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-code-management',
  templateUrl: './status-code-management.component.html',
  styleUrls: ['./status-code-management.component.scss']
})
export class StatusCodeManagementComponent {

  dataSource=[
    {
      id: 1,
      pageName: 'Page -01',
      statusName:"Status -01",
      description:"Description -none "
    }
  ]  

  pages = ['Page -01', 'Page -02', 'Page -03']

  constructor() { }

  ngOnInit(): void {
  }

}
