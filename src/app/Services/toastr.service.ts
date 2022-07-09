import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }


  showToaster(message: string, type: 'custom' | 'error' | 'info' | 'success' | 'warning') {

    notify(
      {
        message: message,
        shading: false,
        width: "350",
        collision: "flip fit",
        animation: {
          hide: { type: 'slide', duration: 400, to: { position: { my: 'bottom', at: 'bottom', of: window } } },
          show: { type: 'slide', duration: 400, from: { position: { my: 'bottom', at: 'bottom', of: window } } },
        }

      }, type, 3000
    )
  }
}
