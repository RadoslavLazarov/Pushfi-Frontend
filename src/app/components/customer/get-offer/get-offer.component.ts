import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../../components/shared/dialog/dialog.component';

import { EnumService } from '../../../services/enum.service';
import { CustomerAuthenticationService } from '../../../services/customer/customer-authentication.service';
import { OfferService } from '../../../services/customer/offer.service';

@Component({
  selector: 'app-get-offer',
  templateUrl: './get-offer.component.html',
  styleUrls: ['./get-offer.component.scss'],
})
export class GetOfferComponent implements OnInit {
  @Input() isAuthenticationValid: boolean;
  enums: any;
  processStatus: number;
  isOfferSent = false;
  latestOffer: any;

  constructor(
    public enumService: EnumService,
    private authenticationService: CustomerAuthenticationService,
    private offerService: OfferService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  getOffer(): void {
    if (this.isOfferSent) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: 'Send new offer',
          content: 'Are you sure you want to send new offer to email?',
          cancel: 'Cancel',
          confirm: 'Send',
          confirmButtonColor: 'primary',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getOfferRequest();
        }
      });

      return;
    }

    this.getOfferRequest();
  }

  getOfferRequest(): void {
    this.offerService.getOffer().subscribe((data) => {
      this.isOfferSent = true;

      this.snackBar.open('Offer is sent successfully!', '', {
        duration: 4000,
        panelClass: 'snackbar-success',
      });

      this.getLatestOffer();
    });
  }

  getLatestOffer(): void {
    this.offerService.getLatestOffer().subscribe((data) => {
      this.latestOffer = data;
    });
  }

  ngOnChanges() {
    this.authenticationService.processStatus$.subscribe((data: number) => {
      // let processStatusEnum;

      // if (this.enums.length) {
      //   processStatusEnum = this.enums.find(
      //     (el: any) => el.name === 'ProcessStatus'
      //   );
      // }

      // if (data === processStatusEnum?.values.GetOffer) {
      if (data < 3) {
        this.isOfferSent = false;
        this.latestOffer = null;
      }

      if (data === 3) {
        this.isOfferSent = true;

        this.getLatestOffer();
      }
    });
  }

  ngOnInit(): void {
    // this.enumService.enum$.subscribe((data) => {
    //   this.enums = data;
    // });
    // console.log('ngOnInit()');
    // this.isOfferSent = false;
    // this.latestOffer = null;
    // this.authenticationService.processStatus$.subscribe((data: number) => {
    //   // let processStatusEnum;
    //   // if (this.enums.length) {
    //   //   processStatusEnum = this.enums.find(
    //   //     (el: any) => el.name === 'ProcessStatus'
    //   //   );
    //   // }
    //   // if (data === processStatusEnum?.values.GetOffer) {
    //   if (data === 3) {
    //     this.isOfferSent = true;
    //     this.getLatestOffer();
    //   }
    // });
  }
}
