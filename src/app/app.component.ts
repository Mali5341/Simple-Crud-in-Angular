import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Simple-Crud';

  showHeader = true;

  constructor (
    private activeRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.activeRoute.data.subscribe((res:any) => {
    //   console.log(res);      
    // })

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        const obj: any = data.state.root.firstChild?.data;
        if (obj.showHeader !== undefined) {
          this.showHeader = obj.showHeader;
        } else {
          this.showHeader = true;
        }
        console.log(obj.showHeader, "showHeader", this.showHeader);
      }
    })    
  }
  
}


// CAMEL CASE - add-user
// KABAB CASE - add-user-details
// SNAKE CASE - add_user_details
// ----- CASE - AddUser