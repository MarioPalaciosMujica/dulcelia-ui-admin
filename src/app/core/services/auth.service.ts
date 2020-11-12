import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
  })
  export class AuthService extends BaseService {
    constructor(http: HttpClient) {
      super(environment.apiUserAccountUserAccount, http);
    }
  
    login(resource: any) {
      return this.http.post(this.endpoint + '/login', resource).pipe(
          map((data: any) => {
            return data;
          })
      );
    }
  
    isUniqueEmail(resource: any) {
      return this.http.post(this.endpoint + '/isUniqueEmail', resource).pipe(
          map((data: any) => {
            return data;
          })
      );
    }
  
  }
  