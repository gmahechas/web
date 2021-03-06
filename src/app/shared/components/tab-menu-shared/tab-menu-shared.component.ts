import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-menu-shared',
  templateUrl: './tab-menu-shared.component.html',
  styles: []
})
export class TabMenuSharedComponent implements OnInit {

  @Input() active: any;
  @Input() items: any;
  @Output() navigate = new EventEmitter<any>();
  @Output() handleClose = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick(item) {
    this.navigate.emit(item);
  }

  onClose(event, index) {
    this.handleClose.emit(index);
    event.preventDefault();
  }
}
