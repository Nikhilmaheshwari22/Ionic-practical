import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  productsArray:any;
  searchTerm!: '';

  constructor(public apiService : ApiService, public commonService : CommonService) {

  }

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.commonService.showLoader();
    this.apiService.products().subscribe(response => {
      console.log('response is: ', response);
      if (response) {
        this.commonService.hideLoader();
        this.productsArray = response.products
        this.commonService.showToastMessage('products')
      }
    }, (error) => {
      this.commonService.hideLoader();
      this.commonService.showToastMessage(error)
    });
  }

  searchProducts(){
    if(this.searchTerm !=''){
      this.commonService.showLoader();
      this.apiService.searchProducts(this.searchTerm).subscribe(response => {
        console.log('response is: ', response);
        if (response) {
          this.commonService.hideLoader();
          this.productsArray = response.products
          this.commonService.showToastMessage('products')
        }
      }, (error) => {
        this.commonService.hideLoader();
        this.commonService.showToastMessage(error)
      });
    }

  }

}
