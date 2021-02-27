import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  item: any;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService,
    private shopping_cart: ShoppingCartService) { 
    this.route.queryParams.subscribe(param =>{
      console.log('params', param);
      if(this.router.getCurrentNavigation().extras.state){
        this.item = this.router.getCurrentNavigation().extras.state.item;
      } else{
        //fetch from api
        //http.get param.id
        this.api.getProductById(param.id);
      }
    })
    
    console.log('extras ', this.router.getCurrentNavigation().extras.state.item)
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
  }

  addToCart(p: any){
    this.shopping_cart.addProduct(p);
  }

}
