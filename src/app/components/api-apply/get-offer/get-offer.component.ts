import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../../components/shared/dialog/dialog.component';

import { EnumService } from '../../../services/enum.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { OfferService } from '../../../services/offer.service';

@Component({
  selector: 'app-get-offer',
  templateUrl: './get-offer.component.html',
  styleUrls: ['./get-offer.component.scss'],
})
export class GetOfferComponent implements OnInit {
  enums: any;
  processStatus: number;
  isOfferSent = false;

  constructor(
    public enumService: EnumService,
    private authenticationService: AuthenticationService,
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
    });
  }

  ngOnInit(): void {
    this.enumService.enum$.subscribe((data) => {
      this.enums = data;
    });

    this.authenticationService.processStatus$.subscribe((data: number) => {
      console.log('this.enums: ', this.enums);
      let processStatusEnum;

      if (this.enums.length) {
        processStatusEnum = this.enums.find(
          (el: any) => el.name === 'ProcessStatus'
        );
      }

      if (data === processStatusEnum?.values.GetOffer) {
        this.isOfferSent = true;
      }
    });
  }
}
