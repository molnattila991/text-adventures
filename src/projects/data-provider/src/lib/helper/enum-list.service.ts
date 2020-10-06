import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  SelectItem,
  PropertyType,
  PropertyValueType,
  EffectDirection,
  ApplicationType,
  ItemUsabilityType,
  ConvertEnumNameToStringService,
  AbilityType,
  ItemType
} from '@text-adventures/shared';

@Injectable({
  providedIn: 'root'
})
export class EnumListService implements OnInit {
  propertyTypeList: Observable<SelectItem[]>;
  impressTypeList: Observable<SelectItem[]>;
  propertyDirectionTypeList: Observable<SelectItem[]>;
  propertyValueTypeList: Observable<SelectItem[]>;
  applicationTypeList: Observable<SelectItem[]>;
  itemUsabilityTypeList: Observable<SelectItem[]>;
  itemTypeList: Observable<SelectItem[]>;
  abilityTypeList: Observable<SelectItem[]>;

  constructor(private convert: ConvertEnumNameToStringService) {
    this.propertyTypeList = of(
      this.convert.convertEnumToStringList(PropertyType)
    );
    this.propertyValueTypeList = of(
      this.convert.convertEnumToStringList(PropertyValueType)
    );
    this.propertyDirectionTypeList = of(
      this.convert.convertEnumToStringList(EffectDirection)
    );
    this.applicationTypeList = of(
      this.convert.convertEnumToStringList(ApplicationType)
    );
    this.itemUsabilityTypeList = of(
      this.convert.convertEnumToStringList(ItemUsabilityType)
    );
    this.abilityTypeList = of(
      this.convert.convertEnumToStringList(AbilityType)
    );
    this.itemTypeList = of(this.convert.convertEnumToStringList(ItemType));
  }

  ngOnInit(): void {}
}
