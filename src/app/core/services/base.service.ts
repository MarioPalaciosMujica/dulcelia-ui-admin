import { AppError } from './../../shared/models/error-handlers/app-error.model';
import { NotFoundError } from './../../shared/models/error-handlers/not-found-error.model';
import { BadInputError } from './../../shared/models/error-handlers/bad-input-error.model';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

export class BaseService {

    constructor(
      protected endpoint: string,
      protected http: HttpClient
    ) { }
  
    save(resource: any){
      return this.http.post(this.endpoint + '/save', resource).pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    findAll(){
      return this.http.get(this.endpoint + '/findAll').pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    findById(id: any){
      return this.http.get(this.endpoint + '/findById/' + id).pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    update(resource: any){
      return this.http.patch(this.endpoint + '/update', resource).pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    updateActive(id: any){
      return this.http.get(this.endpoint + '/updateActive/' + id).pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    deleteById(id: any){
      return this.http.delete(this.endpoint + '/deleteById/' + id).pipe(
        map((data: any) => {
            return data;
        })
      );
    }
  
    protected handleError(error: Response){
      if(error.status === 400){
          return throwError(new BadInputError(error));
      }
      else if(error.status === 404){
          return throwError(new NotFoundError(error));
      }
      else{
          return throwError(new AppError(error));
      }
    }
  
  }
  