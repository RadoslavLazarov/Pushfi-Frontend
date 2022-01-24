import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
// import {CookieService} from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { first, tap } from 'rxjs/operators';
import { EnumService } from '../../../services/enum.service';
import { LoadingService } from '../../../services/loading.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CountryState, statesData } from './states';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @Output() private validationFormChange = new EventEmitter<FormGroup>();
  // @ViewChild('stepper') private processStepper: MatStepper;

  loanProducts: any = [
    'Personal Term Loans',
    'Business Term Loans',
    'SBA/PPP Loans',
    'Personal Lines of Credit',
    'Business Lines of Credit',
    'Commercial Asset Backed Loan',
    'Personal Asset Backed Loan',
    'Equipment Loans',
    'Business Credit Cards',
    'Personal Credit Cards',
  ];
  isBrowser: boolean;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  validationForm: FormGroup;
  submissionAttempted: boolean;
  passwordHide = true;
  creditReportURL: any;
  serverErrorMessage: string;
  states: CountryState[] = statesData;
  isLoginFormActive = false;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public enumService: EnumService,
    public loadingService: LoadingService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    /*  Prevent click on second step when main form is not submitted. On form submit validate second form with
     input hidden then use validation form for stepper check (stepControl)
     By default if the form is valid but not submitted you can click on next step. */
    this.validationForm = this.fb.group({
      isRegistrationFormSubmitted: new FormControl(null, [Validators.required]),
    });

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.registrationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fundingAmountRequested: new FormControl(0, [Validators.required]),
      currentCreditScores: new FormControl(null),
      affiliate: new FormControl(''),
      loanProducts: this.fb.array([], [Validators.required]),
      detailedUseOfFunds: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(''),
      mobilePhoneNumber: new FormControl('', [Validators.required]),
      SMSphoneCarrier: new FormControl('', [Validators.required]),
      streetAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      housingStatus: new FormControl('', [Validators.required]),
      monthlyHousingPayment: new FormControl(0, [Validators.required]),
      dateMovedInThisAddress: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      SSN: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      collegeUniversityName: new FormControl(''),
      degreeObrained: new FormControl(''),
      courceOfStudy: new FormControl(''),
      yearGraduated: new FormControl(''),
      currentMillitaryAffiliation: new FormControl('', [Validators.required]),
      presentEmployer: new FormControl('', [Validators.required]),
      employerPhoneNumber: new FormControl(''),
      position: new FormControl('', [Validators.required]),
      startDateWithEmployer: new FormControl(null, [Validators.required]),
      monthlyGrossIncomeAmount: new FormControl(0, [Validators.required]),
      totalAnnualHouseholdIncome: new FormControl(0, [Validators.required]),
      retirementAccountBalance: new FormControl(0, [Validators.required]),
      companyName: new FormControl(''),
      DBAname: new FormControl(''),
      businessAddress: new FormControl(''),
      businessPhoneNumber: new FormControl(''),
      businessStartDate: new FormControl(null),
      percentageOfOwnership: new FormControl(null),
      TAXID: new FormControl(''),
      corpStructure: new FormControl(''),
      grossAnnualRevenue: new FormControl(null),
      netProfit: new FormControl(null),
      monthlyLeaseOrCommercialLoanPayment: new FormControl(null),
      businessLocationLeaseMortgage: new FormControl(''),
      businessLocationMonthlyPayment: new FormControl(null),
      numberOfEmployees: new FormControl(''),
      websiteURL: new FormControl(''),
      eSignature: new FormControl('', [Validators.required]),
      agreement: new FormControl(false),
    });
  }

  switchPassword(e: any): void {
    e.preventDefault();
    this.passwordHide = !this.passwordHide;
  }

  onLoanProductsChange(e: any): void {
    const checkArray: FormArray = this.registrationForm.get(
      'loanProducts'
    ) as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  emailErrorMessage(): string {
    if (this.registrationForm.get('email')?.hasError('required')) {
      return 'This field is required';
    }

    return this.registrationForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submitLoginForm(): void {
    const formData = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;

    // this.loadingService.loading$.subscribe((data) => (this.loading = data));

    this.authenticationService
      .login(formData)
      .pipe(
        first(),
        tap((evt) => {
          this.loadingService.loading$.subscribe(
            (data) => (this.loading = data)
          );
          console.log('this.loading: ', this.loading);
        })
      )
      // .subscribe({
      //   next: (data) => {
      //     // this.loadingService.loading$.subscribe(
      //     //   (data) => (this.loading = data)
      //     // );
      //     // console.log('this.loading: ', this.loading);
      //     this.validationForm
      //       .get('isRegistrationFormSubmitted')
      //       ?.setValue(true);

      //     // Send formgroup object to parent component
      //     this.validationFormChange.emit(this.validationForm);

      //     this.creditReportURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      //       data.creditReportUrl
      //     );
      //     this.authenticationService.setCreditReportURL(data.creditReportUrl);

      //     this.loadingService.loading$.subscribe(
      //       (data) => (this.loading = data)
      //     );
      //   },
      //   error: (error) => {
      //     this.loading = false;
      //   },
      // });
      .subscribe((data) => {
        this.validationForm.get('isRegistrationFormSubmitted')?.setValue(true);

        // Send formgroup object to parent component
        this.validationFormChange.emit(this.validationForm);

        this.creditReportURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          data.creditReportUrl
        );
        this.authenticationService.setCreditReportURL(data.creditReportUrl);
      });
  }

  submitRegistrationForm(): void {
    const formData = this.registrationForm.value;

    if (this.registrationForm.invalid) {
      this.submissionAttempted = true;
      return;
    }
    this.loadingService.loading$.subscribe((data) => (this.loading = data));

    this.authenticationService.registration(formData).subscribe((data) => {
      if (data.error) {
        this.serverErrorMessage = data.error;
        return;
      }

      this.validationForm.get('isRegistrationFormSubmitted')?.setValue(true);

      // Send formgroup object to parent component
      this.validationFormChange.emit(this.validationForm);

      this.creditReportURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        data.creditReportUrl
      );

      this.authenticationService.setCreditReportURL(data.creditReportUrl);
    });
  }

  // isEnfortraIframeLoad(isEnfortraIframeLoad: boolean): void {
  //   if (isEnfortraIframeLoad) {
  //     this.isLoading = false;
  //   }
  // }

  toggleLoginForm($event: any): void {
    $event.preventDefault();
    this.isLoginFormActive = !this.isLoginFormActive;
  }

  ngOnInit(): void {
    /*Fix mat-radio-button error: ERROR RuntimeError:
     NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*/
    this.changeDetectorRef.detectChanges();
    this.loadingService.loading$.subscribe((data) => (this.loading = data));

    // Send formgroup object to parent component
    this.validationFormChange.emit(this.validationForm);
  }
}
