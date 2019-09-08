import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnChanges {

  @Input() options: any = {show: false, type: 'success'};
  @Output() alertClosed: EventEmitter<any> = new EventEmitter();

  alerts: any[] = [];

  constructor() { }

  ngOnInit() {
  }
 
  add(): void {
    let message = (this.options.type === 'success') ? 'Done!' : 'Error...';

    this.alerts.push({
      type: this.options.type,
      msg: message,
      timeout: 1500
    });
  }

  ngOnChanges() {
    if (this.options.show) {
      this.add();
    }
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    this.alertClosed.emit(false);
  }

}
