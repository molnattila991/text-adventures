import { Component, Inject } from '@angular/core';
import { IGenericCrudDataProvider, ItemModel } from '@text-adventures/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject("ItemsDataProviderService") service: IGenericCrudDataProvider<ItemModel>) {
    service.getHashMap().subscribe(h => {
      console.log(h);
    })

  }
  title = 'text-adventures';
}
