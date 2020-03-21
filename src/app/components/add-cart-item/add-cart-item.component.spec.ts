import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import { AddCartItemComponent } from './add-cart-item.component';
import {BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
const expect = chai.expect;


describe('AddCartItemComponent', () => {
  let component: AddCartItemComponent;
  let fixture: ComponentFixture<AddCartItemComponent>;
  let groceryElement: DebugElement;
  let quantityElement: DebugElement;
  let priceElement: DebugElement;
  let addButtonElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCartItemComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartItemComponent);
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
    expect(priceElement.nativeElement.textContent).to.be.eq(`Price ${component.items[2].price}`);
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
  });

});
