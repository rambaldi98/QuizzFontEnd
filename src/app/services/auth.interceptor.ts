import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService){ }
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
            
            // add jwt token local storeragte
            const token = this.loginService.getToken();
         
            let authReq = req;
            console.log('inside');
            if(token != null){
                authReq = authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`}
             });
         
        }
        return next.handle(authReq);
    }

    
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true,
    },
];