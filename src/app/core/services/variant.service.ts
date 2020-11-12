import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class VariantService extends BaseService {

    constructor(http: HttpClient) {
      super(environment.apiProductVariant, http);
    }

    findAllByProduct(id: any){
      return this.http.get(this.endpoint + '/findAllByProduct/' + id).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

    updateSelected(id: any){
      return this.http.get(this.endpoint + '/updateSelected/' + id).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

  }
