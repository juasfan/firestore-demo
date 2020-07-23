import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items', (ref) =>
      ref.orderBy('name', 'asc')
    );

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((item) => {
          const data = item.payload.doc.data() as Item;
          data.id = item.payload.doc.id;
          return data;
        });
      })
    );
  }

  getItems(): Observable<Item[]> {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}

export interface Item {
  id?: string;
  name: string;
  price: number;
}
