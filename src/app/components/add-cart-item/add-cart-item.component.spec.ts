import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import { AddCartItemComponent } from './add-cart-item.component';
import {BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
const expect = chai.expect;


describe('AddCartItemComponent', () => {
  let component: AddCartItemComponent;
  let fixture: ComponentFixture<AddCartItemComponent>;
  let groceryElement: DebugElement;
  let quantityElement: DebugElement;
  let priceElement: DebugElement;
  let addButtonElement: DebugElement;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCartItemComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [ ShoppingCartService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartItemComponent);
    shoppingCartService = TestBed.get(ShoppingCartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    groceryElement  = fixture.debugElement.query(By.css('.grocery'));
    quantityElement = fixture.debugElement.query(By.css('.quantity'));
    priceElement = fixture.debugElement.query(By.css('.price'));
    addButtonElement = fixture.debugElement.query(By.css('.add-button'));
  });

  it('should create - add cart item', () => {
    expect(component).to.not.be.null;
  });

  it('should have all components', () => {
    expect(component).to.not.be.null;
    expect(groceryElement).to.not.be.null;
    expect(priceElement).to.not.be.null;
    expect(quantityElement).to.not.be.null;
    expect(addButtonElement).to.not.be.null;
  });

  it('Add Button to be disable - when quantity is empty', () => {
    expect(component).to.not.be.null;
    expect(quantityElement.nativeElement.value).to.be.empty;
    expect(addButtonElement.nativeElement.disabled).to.be.true;
  });

  it('Price should match with the item selected', () => {
    expect(component).to.not.be.null;
    fixture.debugElement.query(By.css('.grocery')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('.grocery-option'))[2].nativeElement.click();
    fixture.detectChanges();
    expect(priceElement.nativeElement.textContent).to.be.eq(`Price ${component.items[2].price} $`);
  });

  it('Quantity not filled - required message shown', () => {
    expect(component).to.not.be.null;
    quantityElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.quantity-required').textContent)
      .to.be.eq('Quantity is required.');
  });

  it('Quantity filled as zero - minimum quantity message shown', () => {
    expect(component).to.not.be.null;
    quantityElement.nativeElement.value = 0;
    quantityElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.quantity-min').textContent)
      .to.be.eq('Minimum quantity required, at least one.');
  });


  it('Quantity filled as negative number - minimum quantity message shown', () => {
    expect(component).to.not.be.null;
    quantityElement.nativeElement.value = -7;
    quantityElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.quantity-min').textContent)
      .to.be.eq('Minimum quantity required, at least one.');
  });

  it('grocery and quantity filled  - should enable Add button', () => {
    expect(component).to.not.be.null;
    fixture.debugElement.query(By.css('.grocery')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('.grocery-option'))[2].nativeElement.click();
    fixture.detectChanges();
    groceryElement.nativeElement.dispatchEvent(new Event('selectionChange'));
    quantityElement.nativeElement.value = 4;
    quantityElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(addButtonElement.nativeElement.disabled).to.be.false;
    addButtonElement.nativeElement.dispatchEvent(new Event('click'));
    expect(shoppingCartService.getCartItems()).to.be.deep.eq([{'name': 'Milk', 'price': 1, 'quantity': 4}]);
  });

});
