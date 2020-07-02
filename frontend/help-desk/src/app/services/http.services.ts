import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BackendURL } from '../app.url';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    private address: string = BackendURL;
    
    // ส่งข้อมูลแบบ Get method
    requestGet(url: string, accessToken?: string) {
        return this.http
            .get(`${this.address}${url}`, {
                headers: this.appendHeaders(accessToken)
            })
            .pipe(catchError(err => this.handelError(err)));
    }

    // ส่งข้อมูลแบบ Post method
    requestPost(url: string, body: any, accessToken?: string) {
        return this.http
            .post(`${this.address}${url}`, body, {
                headers: this.appendHeaders(accessToken)
            })
            .pipe(catchError(err => this.handelError(err)));
    }

    // ส่งข้อมูลแบบ Delete method
    requestDelete(url: string,id?:string, accessToken?: string) {
        return this.http
            .delete(`${this.address}${url}`, {
                params:{id},
                headers: this.appendHeaders(accessToken)
            })
            .pipe(catchError(err => this.handelError(err)));
    }

    // ส่งข้อมูลแบบ Put method
    requestPut(url: string, body: any, accessToken?: string) {
        return this.http
            .put(`${this.address}${url}`, body, {
                headers: this.appendHeaders(accessToken)
            })
            .pipe(catchError(err => this.handelError(err)));
    }

    // ปรับแต่ง Error ใหม่
    private handelError(errResponse: HttpErrorResponse): Observable<any> {
        errResponse['Message'] = errResponse.message;
        if (errResponse.error && errResponse.error.message)
            errResponse['Message'] = errResponse.error.message;
        throw errResponse;
    }

    // เพิ่ม header
    private appendHeaders(accessToken) {
        const headers = {};
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
        return new HttpHeaders(headers);
    }
}