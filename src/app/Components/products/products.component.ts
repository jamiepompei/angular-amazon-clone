import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { Router, NavigationExtras }from '@angular/router';
import { ApiService, ProductResponse } from 'src/app/Services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];

  constructor(private shopping_cart: ShoppingCartService,
    private api: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(p: any){
    this.shopping_cart.addProduct(p);
  }
  selectProduct(product: any){
    console.log("product selected");
    // this.router.navigate(['product-detail', product.id]);

    let navigationExtras: NavigationExtras ={
      queryParams:{
        'id': product.id
      },
      state:{
        item: product
      }
    }
    this.router.navigate(['product-detail'], navigationExtras)
  }

}
