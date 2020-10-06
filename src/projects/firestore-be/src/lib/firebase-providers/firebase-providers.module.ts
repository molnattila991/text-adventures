import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreBaseService } from '../firestore-base.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AngularFirestore,
    { provide: 'FirestoreBaseService', useClass: FirestoreBaseService }
  ]
})
export class FirebaseProvidersModule { }
