import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogComponent } from '../../components/shared/dialog/dialog.component';

import { EnumService } from '../../services/enum.service';
import { AuthenticationService } from '../../services/authentication.service';

import { User } from 'src/app/models';

@Component({
  selector: 'app-api-apply',
  templateUrl: './api-apply.component.html',
  styleUrls: ['./api-apply.component.scss'],
})
export class ApiApplyComponent implements OnInit {
  @ViewChild('stepper') public processStepper: MatStepper;

  enums: any;
  currentUser: User;
  loginForm: FormGroup;
  validationForm: FormGroup;
  authenticationValidationForm: FormGroup;
  isBrowser: boolean;
  loading: boolean;
  isAuthenticationValid: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public enumService: EnumService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.authenticationService.currentUser$.subscribe(
      (data) => (this.currentUser = data)
    );

    this.authenticationValidationForm = this.fb.group({
      isAuthenticationCompleted: new FormControl(null, [Validators.required]),
    });
  }

  validationFormEvent(form: FormGroup): void {
    this.validationForm = form;

    if (this.validationForm.valid) {
      this.processStepper.next();
    }
  }

  isEnfortraIframeLoadEvent(isEnfortraIframeLoad: boolean): void {
    if (isEnfortraIframeLoad) {
      // this.apiApply.setLoading(false);
    }
  }

  isAuthenticationCompletedEvent(isAuthenticationCompleted: boolean): void {
    if (isAuthenticationCompleted) {
      this.authenticationValidationForm
        .get('isAuthenticationCompleted')
        ?.setValue(true);
      this.processStepper.next();
    }
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete your account',
        content: 'Are you sure you want to delete your account?',
        cancel: 'Cancel',
        confirm: 'Delete',
        confirmButtonColor: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

        this.authenticationService
          .deleteCurrentUser()
          .subscribe((isDeleted) => {
            if (isDeleted) {
              this.processStepper.reset();
              this.snackBar.open('User deleted successfully!', '', {
                duration: 4000,
                panelClass: 'snackbar-success',
              });
            }
          });
      }
    });
  }

  logOut(): void {
    this.authenticationService.logout();
    this.processStepper.reset();
  }

  ngOnInit(): void {
    // this.enumService.enum$.subscribe((data) => {
    //   this.enums = data;
    // });

    /*Fix ERROR RuntimeError:
    NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*/
    this.changeDetectorRef.detectChanges();

    if (this.currentUser) {
      this.authenticationService.processStatus().subscribe((data) => {
        // const processStatusEnum = this.enums.find(
        //   (el: any) => el.name === 'ProcessStatus'
        // );

        // if (data.processStatus !== processStatusEnum.values.None) {
        if (data.processStatus !== 0) {
          this.validationForm
            .get('isRegistrationFormSubmitted')
            ?.setValue(true);
          this.authenticationService.setCreditReportURL(data.creditReportUrl);
          this.processStepper.next();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Reset process stepper if server returns 401
      this.authenticationService.currentUser$.subscribe((data) => {
        if (!data) {
          this.processStepper.reset();
        }
      });
    }, 0);
  }
}
