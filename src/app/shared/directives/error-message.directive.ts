import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MessageCustomizationService } from '@services/core';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective {
  @Input() set touched(value: boolean) {
    this._touched = value;
    this.setMessage();
  }

  @Input() set dirty(value: boolean) {
    this._dirty = value;
    this.setMessage();
  }

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.setMessage();
  }

  private _errors: ValidationErrors | null = null;
  private _dirty: boolean = false;
  private _touched: boolean = false;
  nativeElement: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private messageService: MessageCustomizationService
  ) {
    this.nativeElement = elementRef.nativeElement;
  }

  setMessage() {
    if (this._touched || this._dirty) {
      if (this._errors) {
        if (this._errors['required']) {
          this.nativeElement.innerText = this.messageService.fieldRequired;
        }
        if (this._errors['requiredTrue']) {
          this.nativeElement.innerText = this.messageService.fieldRequired;
        }
        if (this._errors['email']) {
          this.nativeElement.innerText = this.messageService.fieldEmail;
        }
        if (this._errors['minlength']) {
          this.nativeElement.innerText = this.messageService.fieldMinLength(
            this._errors
          );
        }
        if (this._errors['maxlength']) {
          this.nativeElement.innerText = this.messageService.fieldMaxLength(
            this._errors
          );
        }
        if (this._errors['min']) {
          this.nativeElement.innerText = this.messageService.fieldMin(
            this._errors
          );
        }
        if (this._errors['max']) {
          this.nativeElement.innerText = this.messageService.fieldMax(
            this._errors
          );
        }
        if (this._errors['pattern']) {
          this.nativeElement.innerText = this.messageService.fieldPattern;
        }
        if (this._errors['identification']) {
          this.nativeElement.innerText =
            this.messageService.fieldIdentification;
        }
        if (this._errors['NoPasswordMatch']) {
          this.nativeElement.innerText =
            this.messageService.fieldNoPasswordMatch;
        }
        if (this._errors['UserNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldUserNotAvailable;
        }
        if (this._errors['UserAvailable']) {
          this.nativeElement.innerText = this.messageService.fieldUserAvailable;
        }
        if (this._errors['EmailNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldEmailNotAvailable;
        }
        if (this._errors['PhoneNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldPhoneNotAvailable;
        }
        if (this._errors['dateInvalid']) {
          this.nativeElement.innerText = this.messageService.fieldDateValid;
        }
        if (this._errors['dateMax']) {
          this.nativeElement.innerText = this.messageService.fieldDateMax(
            this._errors
          );
        }
        if (this._errors['dateMin']) {
          this.nativeElement.innerText = this.messageService.fieldDateMin(
            this._errors
          );
        }
        this.renderer.addClass(this.nativeElement, 'p-error');
        this.renderer.removeClass(this.nativeElement, 'hidden');
      } else {
        this.renderer.addClass(this.nativeElement, 'hidden');
      }
    }
  }
}
