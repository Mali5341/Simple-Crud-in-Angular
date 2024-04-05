import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
// @Output() testVariable = new EventEmitter();
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {
  EmployeesData: any = [];
  itemPerPage: any;
  pageSize: number=10;
  page: any;
  total: any;
  isExpanded: boolean = false;
  constructor(private service: UserDataService, private router: Router) {

  };
  ngOnInit(): void {
    this.getAllEmployeesRecordFromBackend()
  }

  getAllEmployeesRecordFromBackend() {
    this.service.hitApiToGetEmployeesDetails('?pageSize=100').subscribe((data: any) => {
      this.EmployeesData = data.employees;
      console.log(data);
      
    });
  };
  DeleteEmployeeFromEmployeesRecord(id: any, $event: any) {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {

      this.service.hitApiToDeleteEmployee(id).subscribe((result) => {
        console.log(result);
        this.getAllEmployeesRecordFromBackend();
      })
      $event.target.innerText = "Deleting..."
    }
  }
  selectEmployeeToUpdateData(id: any) {
    this.router.navigate(['/edit-user', id]);
  }
  handlePageChange(event: number): void {
    this.page = event;  
  }
  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

}
