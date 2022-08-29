import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Breadcrumb } from 'xng-breadcrumb/lib/breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.bcService.breadcrumbs$;
  }

}
