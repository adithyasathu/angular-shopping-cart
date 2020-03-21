import { Injectable } from '@angular/core';
import { inventory } from '../../../assets/grocery';
import { InventoryModel} from '../../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getInventory(): InventoryModel[] {
    return inventory.slice();
  }
}
