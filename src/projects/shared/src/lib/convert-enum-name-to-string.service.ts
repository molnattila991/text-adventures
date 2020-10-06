import { Injectable } from '@angular/core';
import { LanguageDictionary } from './convert-language.dictionary';
import { SelectItem } from './interfaces/select-item.interface';

@Injectable()
export class ConvertEnumNameToStringService {
  constructor() {}

  convertEnumToStringList(enumObject: any): SelectItem[] {
    const values = [];
    const languageDictionary: LanguageDictionary = new LanguageDictionary();
    // tslint:disable-next-line:forin
    for (const i in enumObject) {
      const isValueProperty = parseInt(i, 10) >= 0;
      if (isValueProperty) {
        const text = languageDictionary[enumObject[i]];
        values.push({ id: i, text: text ? text : enumObject[i] });
      }
    }
    return values;
  }

  convertEnumToStringListOriginal(enumObject: any): SelectItem[] {
    const values = [];
    const languageDictionary: LanguageDictionary = new LanguageDictionary();
    // tslint:disable-next-line:forin
    for (const i in enumObject) {
      const isValueProperty = parseInt(i, 10) >= 0;
      if (isValueProperty) {
        const text = enumObject[i];
        values.push({ id: i, text: text ? text : enumObject[i] });
      }
    }
    return values;
  }
}
