import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Router } from '@angular/router'
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from './Services/auth.service';
import { UserSessionStoreService as StoreService } from "./Services/user-session-store.service";

@Injectable()

export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private readonly store: StoreService,
    ) { }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        if (req.url.endsWith("/token") || req.url.endsWith("/login")) {
            return next.handle(this.updateTokenHeader(req)).pipe(
                catchError((error, caught) => {
                    return throwError(() => new Error(error));
                })
            )
        } else {
            return next.handle(this.updateHeader(req)).pipe(
                catchError((error, caught) => {
                    if (error.status === 401) {
                        this.store.saveAccessToken("");
                    }
                    return throwError(() => new Error(error));
                })
            ) as any;
        }
    }


    updateHeader(req: any) {
        console.log("Sending request with new header now ...");
        const authToken = this.store.getAccessToken();
        if (authToken === undefined || authToken === '') {
            this.router.navigateByUrl('/auth');
        }
        req = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${authToken}`).set('Content-Type', 'application/json')
        });
        // console.log(req);

        return req;
    }
    updateTokenHeader(req: any) {
        console.log("Getting Token ...");
        // const authToken = this.store.getAccessToken();
        req = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
        });
        return req;
    }
}