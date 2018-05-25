import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-core',
  templateUrl: './block-core.component.html',
  styleUrls: ['./block-core.component.scss']
})
export class BlockCoreComponent implements OnInit {

  @Input() blockedDocument = false;

  constructor() { }

  ngOnInit() {
  }

}
