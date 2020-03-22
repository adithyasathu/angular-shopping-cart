import { Component, OnInit } from '@angular/core';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService} from '../../services/inventory/inventory.service';
import { ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cart-item',
  templateUrl: './add-cart-item.component.html',
  styleUrls: ['./add-cart-item.component.css']
})

export class AddCartItemComponent implements OnInit {

  selectedItem: InventoryModel;
  items: InventoryModel[];
  cartItem: FormGroup;

  public ngOnInit() {
    this.cartItem =  new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  constructor(private inventoryService: InventoryService,
              private shoppingCartService: ShoppingCartService) {
    this.items = this.inventoryService.getInventory();
  }

  changeSelection(item) {
    this.selectedItem = item;
  }

  addCartItem() {
    const cartItem = this.cartItem.value;
    cartItem.price = this.selectedItem.price;
    this.shoppingCartService.addCartItems(cartItem);
    this.cartItem.reset();
    this.selectedItem = null;
  }
}

