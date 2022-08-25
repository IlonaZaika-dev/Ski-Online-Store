import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastrService: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        this.toastrService.error(error.error.message, error.status);
                    }

                    if (error.status === 404 || error.status === 401 || error.status === 500) {
                        this.router.navigateByUrl('error-page/' + error.status);
                    }
                }

                return throwError(error);
            })
        );
    }
}