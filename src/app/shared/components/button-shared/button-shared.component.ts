import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss']
})
export class ButtonSharedComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }
}
