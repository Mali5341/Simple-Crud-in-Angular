import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  formTitle!: string;
  selectedFile: File | null = null;
  employee: any;
  empId!: string;
  editMode: boolean = false;


  postEmployeeData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    salary: new FormControl('', Validators.required),
    file: new FormControl(''),
    profilePic: new FormControl('')
   
  });
  constructor(
    private DataFromService: UserDataService,
    private activeRoute: ActivatedRoute,
    private route: Router
    ) { 
    }
  
    
    ngOnInit(): void {
      this.getEmployeeToUpdateRecord()
      this.activeRoute.data.subscribe((res: any)=>{
        this.formTitle = res.pageHeading; 
         
      })
    }
    // @import() updateEmployee;
    
  get name() {
    return this.postEmployeeData.get('name');
  }

  get position() {
    return this.postEmployeeData.get('position');
  }

  get salary() {
    return this.postEmployeeData.get('salary');
  }
  get profilePic() {
    return this.postEmployeeData.get('profilePic');
  }
  
  onFileSelected(event: any) {
    const selectedFile: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    this.DataFromService.hitApiToUploadImages(formData).subscribe(
      (result: any) => {
        // console.log('Upload success. Filename:', result.filename); 
        // console.log('Form Data:', this.postEmployeeData); 
        // console.log('Profile Pic Control:', this.postEmployeeData.get('profilePic')); 
        if (this.postEmployeeData && this.postEmployeeData.get('profilePic')) {
          this.postEmployeeData.patchValue({ profilePic: result.filename });
          console.log('Profile Pic Value Set Successfully'); 
        }
        
      },
     
    );
}


  postEmployeeDataToBackendFromAddUserForm(data: any) {
    this.DataFromService.hitApiToPostEmployeeData(data).subscribe((result) => {
      console.log(result);
      this.route.navigate(['/user-details']);
    });
  }

  getEmployeeToUpdateRecord() {
    this.empId = this.activeRoute.snapshot.params['id'];
    if (this.empId) {
      this.editMode = true;
      this.DataFromService.hitApiToGetSingleEmployeeForUpdate(this.empId).subscribe((data) => {
        // i will try to remove this line and i will check the output
        this.employee = data;
        console.log(this.employee);
        console.log(data);

        this.UpdateEmployeeForm();
      });
    }

  }

  UpdateEmployeeForm() {
    this.postEmployeeData.patchValue({
      name: this.employee.name,
      position: this.employee.position,
      salary: this.employee.salary,
       profilePic: this.employee.profilePic,
    
    });
  }

  updateEmployee() {
    this.DataFromService.hitApiToUpdateSingleEmployeeData(this.empId, this.postEmployeeData.value).subscribe((res: any) => {
      console.log(res);
      this.route.navigate(['/user-details'])
    })
  }
}
