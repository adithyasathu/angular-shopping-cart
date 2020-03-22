import { Subscription } from 'rxjs';
import { CartModel } from '../../models/cart.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-cart-items',
  templateUrl: './list-cart-items.component.html',
  styleUrls: ['./list-cart-items.component.css']
})
export class ListCartItemsComponent implements OnInit, OnDestroy {

  cartItems: CartModel[];
  total: number;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'action'];
  dataSource: MatTableDataSource<CartModel>;

  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getCartItems();
    this.calcTotalCost(this.cartItems);
    this.subscription = this.shoppingCartService.cartChanged
      .subscribe(
        (cartItems: CartModel[]) => {
          this.cartItems = cartItems;
          this.dataSource = new MatTableDataSource(cartItems);
          this.dataSource.sort = this.sort;
          this.calcTotalCost(this.cartItems);
        }
      );
    this.dataSource = new MatTableDataSource(this.cartItems);
    this.dataSource.sort = this.sort;
  }

  deleteItemCart(index) {
    this.shoppingCartService.deleteCartItem(index);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  calcTotalCost(items) {
    let total = 0;
    items.forEach((item) => {
        total += (item.price * item.quantity);
    });
   this.total = total;
  }


}
