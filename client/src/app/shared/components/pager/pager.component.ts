import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() pageSize: number;
  @Input() totalCount: number;
  @Output() onPageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChanged(event: any) {
    this.onPageChanged.emit(event.page);
  }
}
