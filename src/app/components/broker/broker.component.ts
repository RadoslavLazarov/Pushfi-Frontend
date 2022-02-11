import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../../components/shared/modal-error/modal-error.component';
import { BrokerAuthenticationService } from 'src/app/services/broker/broker-authentication.service';
import BrokerFormValidationMessages from '../../common/validations/broker-form';

enum FileType {
  Logo,
  Document,
}

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss'],
})
export class BrokerComponent implements OnInit {
  submissionAttempted: boolean;
  validationMessages = BrokerFormValidationMessages;
  fileType = FileType;
  selectedLogoFileName: string;
  selectedDocumentFileName: string;
  registrationForm: FormGroup;
  passwordHide = true;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private brokerAuthenticationService: BrokerAuthenticationService
  ) {
    this.registrationForm = this.fb.group({
      email: new FormControl('alien.lazarov@gmail.com', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl('123', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      firstName: new FormControl('rado', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      lastName: new FormControl('lazarov', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      urlPath: new FormControl('url-path', [
        Validators.required,
        Validators.pattern(/^[0-9A-Za-z\s\-]+$/),
        Validators.maxLength(50),
      ]),
      mobilePhoneNumber: new FormControl('', [Validators.required]),
      companyName: new FormControl('companyName', [Validators.maxLength(100)]),
      companyPhoneNumber: new FormControl(''),
      TAXID: new FormControl('', [Validators.maxLength(100)]),
      disbursementAccountInfo: new FormControl('disbursementAccountInfo', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      websiteURL: new FormControl('websiteURL', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      brandingType: new FormControl('brandingType', [Validators.maxLength(50)]),
      logoImageFile: new FormControl(null),
      eSignature: new FormControl('eSignature', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      businessWebsiteURL: new FormControl('businessWebsiteURL', [
        Validators.maxLength(100),
      ]),
      backEndFee: new FormControl(null, [
        Validators.required,
        Validators.min(7.9),
        Validators.max(14.9),
      ]),
      additionalDocumentFile: new FormControl(null),
    });
  }

  test() {
    console.log(this.registrationForm.get('email')?.hasError('maxlength'));
  }

  switchPassword(e: any): void {
    e.preventDefault();
    this.passwordHide = !this.passwordHide;
  }

  emailErrorMessage(): string {
    if (this.registrationForm.get('email')?.hasError('required')) {
      return 'This field is required';
    }

    return this.registrationForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  handleFileButtonClick(e: Event) {
    e.preventDefault();
  }

  uploadFile(e: any, type: FileType) {
    const file = e.target?.files[0];
    const fileSizeInMb = file.size / 1024 / 1024;
    const fileExtention = file.name.split('.').pop();

    if (type === this.fileType.Logo) {
      this.selectedLogoFileName = file.name;

      const allowedImageExtentions = ['png', 'jpeg', 'jpg'];
      if (allowedImageExtentions.indexOf(fileExtention) === -1) {
        this.selectedLogoFileName = '';
        this.dialog.open(ModalErrorComponent, {
          data: {
            message: `Invalid file extention!`,
          },
        });
        return;
      }

      const logoSizeLimit = 2;

      if (fileSizeInMb > logoSizeLimit) {
        this.dialog.open(ModalErrorComponent, {
          data: {
            message: `Maximum allowed file size is ${logoSizeLimit}mb`,
          },
        });
        return;
      }

      this.registrationForm.patchValue({
        logoImageFile: file,
      });
    } else if (type === this.fileType.Document) {
      this.selectedDocumentFileName = file.name;
      const allowedDocumentExtentions = [
        'doc',
        'docx',
        'ppt',
        'ppsx',
        'pptx',
        'xlsx',
        'pdf',
      ];
      if (allowedDocumentExtentions.indexOf(fileExtention) === -1) {
        this.selectedDocumentFileName = '';
        this.dialog.open(ModalErrorComponent, {
          data: {
            message: `Invalid file extention!`,
          },
        });
        return;
      }

      const documentSizeLimit = 5;

      if (fileSizeInMb > documentSizeLimit) {
        this.dialog.open(ModalErrorComponent, {
          data: {
            message: `Maximum allowed file size is ${documentSizeLimit}mb`,
          },
        });
        return;
      }

      this.registrationForm.patchValue({
        additionalDocumentFile: file,
      });
    }
    e.target.value = null;
  }

  handleDeleteSelectedFile(e: any, type: FileType): void {
    e.preventDefault();

    if (type === this.fileType.Logo) {
      this.selectedLogoFileName = '';
      this.registrationForm.get('logoImageFile')?.setValue(null);
    } else if (type === this.fileType.Document) {
      this.selectedDocumentFileName = '';
      this.registrationForm.get('additionalDocumentFile')?.setValue(null);
    }
  }

  submitRegistrationForm(): void {
    const formData = this.registrationForm.value;

    if (this.registrationForm.invalid) {
      this.submissionAttempted = true;
      return;
    }

    this.brokerAuthenticationService.registration(formData).subscribe();
  }

  ngOnInit(): void {}
}
