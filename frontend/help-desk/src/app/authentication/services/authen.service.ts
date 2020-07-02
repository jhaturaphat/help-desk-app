import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from 'src/app/app.url';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class AuthenService {
  constructor(private router: Router) {}

  private accessKey = "AUTH_TOKEN";
  //กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: string) {
    localStorage.setItem(this.accessKey, accessToken);
  }

  //ดึงค่า access token ในความจำ browser ออกมา
  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey);
  }

  //ล้างค่า access token ในความจำ browser
  clearAuthenticated(): void {
    localStorage.removeItem(this.accessKey);
  }

  // ปรับแต่ง Error ใหม่
  public handelError(errResponse: HttpErrorResponse): Observable<any> {
    if (errResponse.status == 401) {
      this.clearAuthenticated();
      this.router.navigate(["/", AppURL.Login]);
    }
    errResponse["Message"] = errResponse.message;
    if (errResponse.error && errResponse.error.message)
      errResponse["Message"] = errResponse.error.message;
    throw errResponse;
  }

  // เพิ่ม header
  public appendHeaders(accessToken) {
    const headers = {};
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
    return new HttpHeaders(headers);
  }
}
