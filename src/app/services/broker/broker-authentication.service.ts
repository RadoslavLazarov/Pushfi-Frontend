import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BrokerFormData } from 'src/app/common/interfaces/broker-form-data';

import { environment } from '../../../environments/environment';

const rootUrl = '/Authentication';

@Injectable({
  providedIn: 'root',
})
export class BrokerAuthenticationService {
  constructor(private http: HttpClient) {}

  registration(data: BrokerFormData): Observable<any> {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('urlPath', data.urlPath);
    formData.append('mobilePhoneNumber', data.mobilePhoneNumber);
    formData.append('companyName', data.companyName);
    formData.append('companyPhoneNumber', data.companyPhoneNumber);
    formData.append('TAXID', data.TAXID);
    formData.append('disbursementAccountInfo', data.disbursementAccountInfo);
    formData.append('websiteURL', data.websiteURL);
    formData.append('brandingType', data.brandingType);
    formData.append('logoImageFile', data.logoImageFile);
    formData.append('eSignature', data.eSignature);
    formData.append('businessWebsiteURL', data.businessWebsiteURL);
    formData.append('backEndFee', data.backEndFee.toString());
    formData.append('additionalDocumentFile', data.additionalDocumentFile);

    return this.http
      .post(`${environment.apiUrl + rootUrl}/BrokerRegistration`, formData)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
