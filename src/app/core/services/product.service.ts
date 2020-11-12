import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(http: HttpClient) {
    super(environment.apiProductProduct, http);
  }
}
