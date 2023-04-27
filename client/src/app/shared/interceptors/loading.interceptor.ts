import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { BusyService } from "src/app/core/services/busy.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            request.url.includes('emailExists')
            || request.method === 'POST' && request.url.includes('orders')
        ) {
            return next.handle(request);
        }
        
        this.busyService.busy();
        return next.handle(request).pipe(
            finalize(() => {
                this.busyService.idle();
            })
        )
    }
}