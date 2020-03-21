import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddCartItemComponent } from './components/add-cart-item/add-cart-item.component';
import { ListCartItemsComponent } from './components/list-cart-items/list-cart-items.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddCartItemComponent,
        ListCartItemsComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ]}).compileComponents();
  }));

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have add to cart and cart list components', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const addCartElement  = fixture.debugElement.query(By.css('.add-cart'));
    const listCartElement  = fixture.debugElement.query(By.css('.list-cart'));
    expect(addCartElement).toBeTruthy();
    expect(listCartElement).toBeTruthy();
  }));
});
