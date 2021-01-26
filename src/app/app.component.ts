
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCreate: boolean;
  public response: {dbPath: ''};

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.isCreate = true;
  }

  public returnToCreate = () => {
    this.isCreate = true;

  }

  public uploadFinished = (event) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:5001/${serverPath}`;
  }
}
