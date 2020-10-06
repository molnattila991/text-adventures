import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const config = {
  apiKey: 'AIzaSyD6E9OYBX72KCRcnwPAzDjVy8MmDbbEgfw',
  authDomain: 'https://textadventures-cb5e4.firebaseapp.com',
  databaseURL: 'https://textadventures-cb5e4.firebaseio.com/',
  projectId: 'textadventures-cb5e4',
  storageBucket: 'stackblitzfire.appspot.com',
  messagingSenderId: '42917465053'
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ]
})
export class FirestoreBeModule {}
