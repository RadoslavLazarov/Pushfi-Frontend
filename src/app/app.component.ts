import { Component } from '@angular/core';
import { EnumService } from './services/enum.service';
import { LoadingService } from './services/loading.service';
import { ErrorService } from './services/error.service';
import { AuthenticationService } from './services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pushfi';
  loading: boolean;
  errorMessage: string;

  constructor(
    public enumService: EnumService,
    public loadingService: LoadingService,
    public errorService: ErrorService,
    public authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  openModal() {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: {
        message: this.errorMessage,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.errorService.setErrorMessage('');
    });
  }

  /*Fix ERROR RuntimeError:
    NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*/
  ngAfterViewInit(): void {
    // this.enumService.getEnums().subscribe();
    setTimeout(() => {
      this.loadingService.loading$.subscribe((data) => (this.loading = data));

      this.errorService.errorMessage$.subscribe((data) => {
        this.errorMessage = data;
        if (this.errorMessage) {
          this.openModal();
        }
      });

      // this.authenticationService.currentUser$.subscribe((data) => {
      //   this.currentUser = data;
      //   console.log(data);
      // });
    }, 0);
  }

  ngOnInit(): void {
    // this.enumService.getEnums().subscribe();
  }
}
