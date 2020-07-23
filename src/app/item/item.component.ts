import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Item, ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  subscription: Subscription;
  form: FormGroup;
  selectedItem: Item;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.subscription = this.itemService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  edit(item: Item) {
    this.selectedItem = item;
    this.form.patchValue({ ...item });
  }

  close() {
    this.selectedItem = undefined;
  }

  delete(item: Item) {
    this.itemService.deleteItem(item);
  }

  onSubmit(item: Item) {
    if (this.form.valid) {
      const data = { ...this.form.value, id: this.selectedItem.id };
      console.log(data);

      this.itemService.updateItem(data);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
