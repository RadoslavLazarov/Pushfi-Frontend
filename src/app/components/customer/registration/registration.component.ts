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
import { CustomerAuthenticationService } from '../../../services/customer/customer-authentication.service';
import { CountryState, statesData } from './states';
import CustomerFormValidationMessages from '../../../common/validations/customer-form';
import { ActivatedRoute } from '@angular/router';
import { BrokerService } from 'src/app/services/customer/broker.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @Output() private validationFormChange = new EventEmitter<FormGroup>();
  // @ViewChild('stepper') private processStepper: MatStepper;

  param: string;
  logoImageUrl: string;
  validationMessages = CustomerFormValidationMessages;
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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerAuthenticationService: CustomerAuthenticationService,
    public enumService: EnumService,
    public brokerService: BrokerService,
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
      email: new FormControl('1test@test.test', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl('123456789', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });

    this.registrationForm = this.fb.group({
      email: new FormControl('1test@test.test', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl('123456789', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      fundingAmountRequested: new FormControl(0, [Validators.required]),
      currentCreditScores: new FormControl(null),
      affiliate: new FormControl('', [Validators.maxLength(100)]),
      loanProducts: this.fb.array(
        ['Personal Term Loans', 'SBA/PPP Loans'],
        [Validators.required]
      ),
      detailedUseOfFunds: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(10000),
      ]),
      firstName: new FormControl('Abigail', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      middleName: new FormControl(''),
      lastName: new FormControl('Tester', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phoneNumber: new FormControl('', [Validators.maxLength(30)]),
      mobilePhoneNumber: new FormControl('9999999999', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      SMSphoneCarrier: new FormControl('@text.att.net', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      streetAddress: new FormControl('333 Alison Rd', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      city: new FormControl('Arlington', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      region: new FormControl('CA', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      postalCode: new FormControl('33302', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      housingStatus: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      monthlyHousingPayment: new FormControl(0, [Validators.required]),
      dateMovedInThisAddress: new FormControl(new Date(), [
        Validators.required,
      ]),
      // dateOfBirth: new FormControl('01/01/1956', [Validators.required]),
      dateOfBirth: new FormControl(new Date(), [Validators.required]),
      SSN: new FormControl('000500500', [
        Validators.required,
        Validators.maxLength(9),
      ]),
      maritalStatus: new FormControl('single', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      collegeUniversityName: new FormControl('', [Validators.maxLength(100)]),
      degreeObtained: new FormControl('', [Validators.maxLength(50)]),
      courceOfStudy: new FormControl('', [Validators.maxLength(50)]),
      yearGraduated: new FormControl('', [Validators.maxLength(4)]),
      currentMillitaryAffiliation: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      presentEmployer: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      employerPhoneNumber: new FormControl('', [Validators.maxLength(30)]),
      position: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      startDateWithEmployer: new FormControl(new Date(), [Validators.required]),
      monthlyGrossIncomeAmount: new FormControl(2000, [Validators.required]),
      totalAnnualHouseholdIncome: new FormControl(0, [Validators.required]),
      retirementAccountBalance: new FormControl(0, [Validators.required]),
      companyName: new FormControl('', [Validators.maxLength(100)]),
      DBAname: new FormControl('', [Validators.maxLength(100)]),
      businessAddress: new FormControl('', [Validators.maxLength(100)]),
      businessPhoneNumber: new FormControl('', [Validators.maxLength(30)]),
      businessStartDate: new FormControl(null),
      percentageOfOwnership: new FormControl(null),
      TAXID: new FormControl('', [Validators.maxLength(100)]),
      corpStructure: new FormControl('', [Validators.maxLength(50)]),
      grossAnnualRevenue: new FormControl(null),
      netProfit: new FormControl(null),
      monthlyLeaseOrCommercialLoanPayment: new FormControl(null),
      businessLocationLeaseMortgage: new FormControl('', [
        Validators.maxLength(50),
      ]),
      businessLocationMonthlyPayment: new FormControl(null),
      numberOfEmployees: new FormControl('', Validators.maxLength(20)),
      websiteURL: new FormControl('', [Validators.maxLength(100)]),
      eSignature: new FormControl('test value', [
        Validators.required,
        Validators.maxLength(100),
      ]),
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

  submitLoginForm(): void {
    const formData = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;

    // this.loadingService.loading$.subscribe((data) => (this.loading = data));

    this.customerAuthenticationService
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
        this.customerAuthenticationService.setCreditReportURL(
          data.creditReportUrl
        );
      });
  }

  submitRegistrationForm(): void {
    const formData = this.registrationForm.value;

    if (this.registrationForm.invalid) {
      this.submissionAttempted = true;
      return;
    }
    this.loadingService.loading$.subscribe((data) => (this.loading = data));

    this.customerAuthenticationService
      .registration(formData)
      .subscribe((data) => {
        this.validationForm.get('isRegistrationFormSubmitted')?.setValue(true);

        // Send formgroup object to parent component
        this.validationFormChange.emit(this.validationForm);

        this.creditReportURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          data.creditReportUrl
        );

        this.customerAuthenticationService.setCreditReportURL(
          data.creditReportUrl
        );
      });
  }

  fetchBrokerData(): void {
    this.route.params.subscribe((params) => (this.param = params['broker']));
    this.brokerService.fetchBroker(this.param).subscribe((data) => {
      if (data.externalUrl) {
        window.location.href = data.externalUrl;
      }

      this.logoImageUrl = data.logoImageUrl;
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
    this.fetchBrokerData();

    /*Fix mat-radio-button error: ERROR RuntimeError:
     NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.*/
    this.changeDetectorRef.detectChanges();
    this.loadingService.loading$.subscribe((data) => (this.loading = data));

    // Send formgroup object to parent component
    this.validationFormChange.emit(this.validationForm);
  }
}
