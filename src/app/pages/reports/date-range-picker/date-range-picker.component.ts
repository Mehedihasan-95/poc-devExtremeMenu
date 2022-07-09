import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  @Input() fromDate: any;
  @Input() toDate: any;


  @Output() fromDateChange = new EventEmitter();
  @Output() toDateChange = new EventEmitter();

  pipe = new DatePipe('en-US');


  constructor() { }

  ngOnInit(): void {
  }

  onValueChanged(isFromDate: boolean = false) {
    if (isFromDate) {
      this.fromDateChange.emit(this.pipe.transform(this.fromDate, 'dd/MM/yyyy'));
    } else {
      this.toDateChange.emit(this.pipe.transform(this.toDate, 'dd/MM/yyyy'))
    }
  }

 }
