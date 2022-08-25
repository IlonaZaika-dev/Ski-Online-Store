import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  message;

  constructor(private activatedRout: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.message = this.getErrorMessage(+this.activatedRout.snapshot.paramMap.get('code'));
  }

  getErrorMessage(statusCode: number) {
    let response;
    switch (statusCode) {
      case 404:
        response = '404. The requested resource is not found';
        break;
      case 401:
        response = '401. The user is not authorized';
        break;
      case 500:
        response = '500. The internal server error occurred.';
        break;
    }

    return response;
  }

}
