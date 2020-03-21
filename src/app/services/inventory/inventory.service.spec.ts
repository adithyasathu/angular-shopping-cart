import { TestBed, inject } from '@angular/core/testing';
import { InventoryService } from './inventory.service';
import * as chai from 'chai';
const expect = chai.expect;
import { inventory } from '../../../assets/grocery';

describe('InventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should be created', inject([InventoryService], (service: InventoryService) => {
    expect(service).to.not.be.null;
  }));

  it('should be supplied from assets', inject([InventoryService], (service: InventoryService) => {
    expect(service.getInventory()).to.deep.equals(inventory);
  }));

});
