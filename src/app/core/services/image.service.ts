import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiProductImage, http);
  }

  uploadImage(resource: any){
    return this.http.post(this.endpoint + '/uploadImage', resource).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
