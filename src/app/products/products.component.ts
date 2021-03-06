import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Entry<any>[];

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getProducts()
    .then(products => this.products = products);
  }

}
