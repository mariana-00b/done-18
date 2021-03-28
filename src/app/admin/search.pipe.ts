import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../shared/interfaces/categories/categories.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(categories: ICategory[], field: string): ICategory[] {
    if (!categories) return [];
    if (!field) return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(field.toLowerCase())
    );
  }
}
