import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.form.reset();
      this.itemService.addItem(data);
    }
  }
}
