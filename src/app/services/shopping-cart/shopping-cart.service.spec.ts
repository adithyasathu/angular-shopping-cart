import { TestBed, inject } from '@angular/core/testing';
import * as chai from 'chai';
const expect = chai.expect;
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService]
    });
  });

  it('should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).to.not.be.null;
  }));

  it('Can add items to cart', inject([ShoppingCartService], (service: ShoppingCartService) => {
   const item = {
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    };
    service.addCartItems(item);
    expect(service.getCartItems()).to.be.deep.equals([item]);
  }));

  it('Can add items to cart', inject([ShoppingCartService], (service: ShoppingCartService) => {
    const item = {
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    };
    const itemMilk = {
      'name': 'Milk',
      'price': 1.60,
      quantity: 6
    };
    service.addCartItems(item);
    service.addCartItems(itemMilk);
    service.deleteCartItem(0);
    expect(service.getCartItems()).to.be.deep.equals([itemMilk]);
  }));

});
