import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CouponService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiOrderCoupon, http);
  }

}
