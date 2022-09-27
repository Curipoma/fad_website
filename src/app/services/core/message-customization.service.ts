import { Inject, Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { PaginatorModel } from '@models/core';
import { ServerResponse } from '@models/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageCustomizationService {
  constructor(private toastrService: ToastrService) {}

  error(error: ServerResponse<any>) {
    return this.toastrService.error(error.message, error.title);
  }

  success(serverResponse: ServerResponse<any>) {
    return this.toastrService.success(
      serverResponse.message,
      serverResponse.title
    );
  }

  get errorsFields() {
    return alert(
      'Revise los campos.' +
        'Revise que los campos estén llenos de forma correcta'
    );
  }

  questionDelete(
    title = '¿Está seguro de eliminar?',
    text = 'No podrá recuperar esta información!'
  ) {
    return alert(title + '' + text);
  }

  questionOnExit(
    title = '¿Está seguro de salir?',
    text = 'Se perderá la información que no haya guardado!'
  ) {
    return alert(title + '' + text);
  }

  get requiredFields(): string {
    return `Todos los campos <b class="p-error">(*)</b> son obligatorios.`;
  }

  get fieldRequired(): string {
    return 'El campo es obligatorio.';
  }

  get fieldEmail(): string {
    return 'Correo electrónico no válido.';
  }

  get fieldWeb(): string {
    return 'Página web no válida.';
  }

  get fieldNumber(): string {
    return 'El campo solo debe contener numeros.';
  }

  fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo de caracteres ${errors['minlength']['requiredLength']}.`;
  }

  fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo de caracteres ${errors['maxlength']['requiredLength']}.`;
  }

  fieldMin(errors: ValidationErrors) {
    return `Numero mínimo permitido es ${errors['min']['requiredMin']}.`;
  }

  fieldMax(errors: ValidationErrors): string {
    return `Numero maximo permitido es ${errors['max']['requiredMax']}.`;
  }

  get fieldPattern() {
    return `No cumple con el formato.`;
  }

  get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  get fieldUserAvailable(): string {
    return 'Usuario está disponible.';
  }

  get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }

  get fieldDateValid(): string {
    return 'No es una fecha válida.';
  }

  fieldDateMax(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMax']['actualDate']} no puede ser mayor a ${errors['dateMax']['requiredDate']}.`;
  }

  fieldDateMin(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMin']['actualDate']} no puede ser menor a ${errors['dateMin']['requiredDate']}.`;
  }

  paginatorTotalRegisters(paginator: PaginatorModel): string {
    return (
      'En total hay ' +
      (paginator?.totalItems ? paginator.totalItems : 0) +
      ' registros.'
    );
  }

  get paginatorNoRecordsFound(): string {
    return 'No se encontraron registros.';
  }

  get buttonFormSaveOrUpdate(): string {
    return `Guardar`;
  }

  get buttonFormClose(): string {
    return `Cerrar`;
  }

  get progressBarProcess(): string {
    return `Procesando...`;
  }

  get progressBarSaveOrUpdate(): string {
    return `Guardando...`;
  }

  get progressBarDownload(): string {
    return `Descargando...`;
  }

  get progressBarUpload(): string {
    return `Cargando...`;
  }

  get progressBarLogin(): string {
    return `Ingresando...`;
  }

  get progressBarRequestPasswordReset(): string {
    return `Enviando correo...`;
  }

  get progressBarDelete(): string {
    return `Eliminando...`;
  }

  get messageSuccessDelete(): string {
    return `Se eliminó correctamente`;
  }
}
