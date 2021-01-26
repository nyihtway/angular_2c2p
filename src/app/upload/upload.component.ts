import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponseBase } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  public error: string;
  
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  
  onFileChange(event){
    
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('http://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.error = '';
          this.onUploadFinished.emit(event.body);
        }
      },
      error => {
        this.error = error.error;
        this.message ='';
        //this.onUploadFinished.emit(error.body);
      });
  }

}
