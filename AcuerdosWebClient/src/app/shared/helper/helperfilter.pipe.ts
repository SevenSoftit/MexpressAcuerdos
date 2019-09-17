import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], value): any {
        return value 
            ? items.filter(item => item.full_Name.toUpperCase().indexOf(value.toUpperCase()) !== -1)
            : items;
    }
}


@Pipe({
    name: "sort"
  })
  export class ArraySortPipe  implements PipeTransform {
    transform(array: any, field: string): any[] {
      if (!Array.isArray(array)) {
        return;
      }
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }