import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetailComponent } from '../Components/product-detail/product-detail.component';
import { catchError, map, tap } from 'rxjs/operators';

export class ProductResponse{
  
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    ratings: number;
  
    constructor(id: number, title: string, desc: string, price: number, image: string, ratings: number){
      this.id = id;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.image = image;
      this.ratings = ratings;
    }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jsonUrl = 'assets/Data/products.json'
  constructor(private Http: HttpClient) { }

  getJson(): Observable<any>{
    return this.Http.get(this.jsonUrl);
  }

  getProductById(id: number): Observable<any>{
    const url = `${this.jsonUrl}/${id}`;
    return this.Http.get(url).pipe(
      tap(_ => console.log(`fetched product id =${id}`)));
    
  }
}
