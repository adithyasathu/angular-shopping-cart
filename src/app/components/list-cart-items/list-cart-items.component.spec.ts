import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const expect = chai.expect;

import { ListCartItemsComponent } from './list-cart-items.component';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { MaterialModule } from '../../material.module';

describe('ListCartItemsComponent', () => {
  let component: ListCartItemsComponent;
  let fixture: ComponentFixture<ListCartItemsComponent>;
  let totalElement: DebugElement;
  let shoppingCartService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCartItemsComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartItemsComponent);
    component = fixture.componentInstance;
    shoppingCartService = TestBed.get(ShoppingCartService);
    fixture.detectChanges();
    totalElement  = fixture.debugElement.query(By.css('.total'));
  });

  it('should create - list cart item', () => {
    expect(component).to.not.be.null;
  });

  it('NO cart items -  total should be calculated to zero', () => {
    expect(totalElement.componentInstance.cartItems).to.be.deep.equals([]);
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $0.00');
  });

  it('Add cart items -  total should be calculated', () => {
    shoppingCartService.addCartItems({
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    });
    fixture.detectChanges();
    expect(totalElement.componentInstance.cartItems).to.be.deep.equals([{
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    }]);
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $14.40');
  });

  it('Delete cart items -  total should be calculated', () => {
    shoppingCartService.addCartItems({
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    });
    fixture.detectChanges();
    fixture.componentInstance.deleteItemCart(0);
    fixture.detectChanges();
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $0.00');
  });

  it('Add more cart items -  total should be  calculated', () => {
    shoppingCartService.addCartItems({
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    });
    shoppingCartService.addCartItems({
      'name': 'Egg',
      'price': 4.50,
      quantity: 6
    });
    fixture.detectChanges();
    expect(totalElement.nativeElement.textContent).to.be.eq('Total - $41.40');

  });

  it('Sort cart items ', () => {
    shoppingCartService.addCartItems({
      'name': 'Egg',
      'price': 4.50,
      quantity: 6
    });
    shoppingCartService.addCartItems({
      'name': 'Bread',
      'price': 3.60,
      quantity: 4
    });
    fixture.detectChanges();
    const name = fixture.debugElement.nativeElement.querySelector('tbody tr .mat-column-name').textContent;
    expect(name.trim()).to.be.eq('Egg');
    fixture.debugElement.nativeElement.querySelector('.mat-sort-header-button').click();
    fixture.detectChanges();
    const sortedName = fixture.debugElement.nativeElement.querySelector('tbody tr .mat-column-name').textContent;
    expect(sortedName.trim()).to.be.eq('Bread');

  });


});
