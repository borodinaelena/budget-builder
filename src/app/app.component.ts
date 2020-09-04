import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from './data.service';

const DEFAULT_YEAR = '2020';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  selectedItem = DEFAULT_YEAR;
  worker;
  data: FormGroup;

  constructor(public dataService: DataService) {

    this.getData();

    if (typeof Worker !== 'undefined') {

      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        localStorage.setItem(data[0], JSON.stringify(data[1]));
      };
    } else {
      console.log('no worker');
    }
  }

  getData() {
    this.data = this.dataService.initData(this.selectedItem);
  }

  saveData($event) {
    this.worker.postMessage([this.selectedItem, $event.value]);
  }


}


