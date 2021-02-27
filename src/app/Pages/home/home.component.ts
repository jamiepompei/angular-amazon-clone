import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailComponent } from 'src/app/Components/product-detail/product-detail.component';
import { ApiService, ProductResponse } from 'src/app/Services/api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any = [];
  product: ProductResponse;
  id: number;

  constructor(private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.api.getJson().subscribe(response => {
      this.items = response;
    })
  }
 
  getProductsById(){
    this.api.getProductById(this.id).subscribe(response => {
      const obj= response;
      this.product =  new ProductResponse(
        obj.id,
        obj.title,
        obj.desc,
        obj.price,
        obj.image,
        obj.ratings
      );
      console.log(this.product);
     
    })
  }

}
