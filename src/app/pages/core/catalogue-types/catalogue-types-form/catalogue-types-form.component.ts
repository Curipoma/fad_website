import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueTypeModel } from '@models/core';
import { CatalogueTypesHttpService, CoreService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-catalogue-types-form',
  templateUrl: './catalogue-types-form.component.html',
  styleUrls: ['./catalogue-types-form.component.scss'],
})
export class CatalogueTypesFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  loaded: boolean = false;

  constructor(
    private catalogueTypesHttpService: CatalogueTypesHttpService,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private router: Router
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.getCatalogueType();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      value: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.messagesService.showError('Error', 'Llene todos los campos');
      this.form.markAllAsTouched();
    }
  }
  back(): void {
    this.router.navigate([
      this.envRoutes.CORE + this.coreRoutes.CATALOGUE_TYPES_LIST,
    ]);
  }

  create(catalogueType: CatalogueTypeModel): void {
    this.catalogueTypesHttpService
      .store<CatalogueTypeModel, CatalogueTypeModel>(catalogueType)
      .subscribe((catalogueType: CatalogueTypeModel) => {
        this.form.reset(catalogueType);
        this.back();
      });
  }

  update(catalogueType: CatalogueTypeModel): void {
    this.catalogueTypesHttpService
      .update<CatalogueTypeModel, CatalogueTypeModel>(this.id, catalogueType)
      .subscribe((catalogue) => {
        this.form.reset(catalogue);
        this.back();
      });
  }

  getCatalogueType() {
    this.loaded = true;
    this.catalogueTypesHttpService
      .show<CatalogueTypeModel>(this.id)
      .subscribe((catalogueType: CatalogueTypeModel) => {
        this.form.reset(catalogueType);
        this.loaded = false;
      });
  }

  get nameField() {
    return this.form.controls['name'];
  }

  get valueField() {
    return this.form.controls['value'];
  }
}
