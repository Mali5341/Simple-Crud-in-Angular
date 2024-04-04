import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url = 'http://localhost:8080/employees'
  imgUrl = 'http://localhost:8080/upload'
  constructor(private http: HttpClient) { }

  hitApiToGetEmployeesDetails(query: string) {
    return this.http.get(this.url + query)
  };

  hitApiToPostEmployeeData(data: any) {
    return this.http.post(this.url, data)
  };

  hitApiToDeleteEmployee(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }
  hitApiToGetSingleEmployeeForUpdate(id: any) {
    return this.http.get(`${this.url}/${id}`)
  };

  hitApiToUpdateSingleEmployeeData(id:string, body: any) {
    return this.http.put(this.url + '/' + id, body);
  };
  hitApiToUploadImages(formData: FormData){
    console.log(formData); // Ensure FormData contains the file
    return this.http.post(this.imgUrl, formData);
}


}