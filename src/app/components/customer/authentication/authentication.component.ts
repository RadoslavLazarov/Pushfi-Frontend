import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { CustomerAuthenticationService } from '../../../services/customer/customer-authentication.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  @Output() isEnfortraIframeLoad = new EventEmitter<boolean>();
  @Output() isAuthenticationCompleted = new EventEmitter<boolean>();

  authenticationValidationForm: FormGroup;
  loading: boolean;
  creditReportURL: SafeResourceUrl;

  constructor(
    public customerAuthenticationService: CustomerAuthenticationService,
    public loadingService: LoadingService,
    private sanitizer: DomSanitizer
  ) {
    if (window.addEventListener) {
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent('onmessage', this.receiveMessage.bind(this));
    }
  }

  receiveMessage: any = (event: any) => {
    if (event.origin === 'https://api.idandcredit.com') {
      // When user authenticate in Enfortra event.data returns HTML
      if (event.data.indexOf('<div') !== -1) {
        this.isAuthenticationCompleted.emit(true);
        this.customerAuthenticationService.processStatus().subscribe();
      }
    }
  };

  enfortraIframeLoad(e: any): void {
    /* This function is executed twice. First time when iFrame element append in DOM and second time when iFrame loads.
      By default iFrame src attribute is base url. If it's Enfortra url (xml.idcreditservices.com) then execute. */
    if (e.target.src.indexOf('xml.idcreditservices.com') !== -1) {
      this.isEnfortraIframeLoad.emit(true);
    }
  }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((data) => (this.loading = data));

    this.customerAuthenticationService.creditReportURL$.subscribe((url) => {
      this.creditReportURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
