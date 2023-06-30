import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortLink',
})
export class ShortLinkPipe implements PipeTransform {
  transform(value: string): string {
    try {
      let link = value;

      const afterProtocol = link.split('//')[1];

      if (afterProtocol) {
        link = afterProtocol;
      }

      const beforeBaseUrl = link.split('/')[0];

      if (beforeBaseUrl) {
        link = beforeBaseUrl;
      }

      return link;
    } catch (e) {
      console.error(e);
      return value;
    }
  }
}
