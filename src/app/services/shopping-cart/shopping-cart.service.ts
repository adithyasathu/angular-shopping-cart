import { Injectable } from '@angular/core';
import { CartModel } from '../../models/cart.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  items: CartModel [] = [];
  cartChanged = new Subject<CartModel[]>();

  constructor() { }

  getCartItems() {
    return this.items.slice();
  }

  deleteCartItem(index) {
    this.items.splice(index, 1);
    this.cartChanged.next(this.items.slice());
  }

  addCartItems(item: CartModel) {
    this.items.push(item);
    this.cartChanged.next(this.items.slice());
  }
}
