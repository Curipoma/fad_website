import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogueModel, CatalogueTypeModel } from '@models/core';
import {CataloguesHttpService, CatalogueTypesHttpService, CoreService} from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-catalogues-form',
  templateUrl: './catalogues-form.component.html',
  styleUrls: ['./catalogues-form.component.scss'],
})
export class CataloguesFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  catalogueTypes: CatalogueTypeModel[] = [];
  loaded: boolean = false;

  constructor(
    private cataloguesHttpService: CataloguesHttpService,
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
    this.getCatalogueTypes();
    if (this.id > 0) {
      this.getCatalogue();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      type: [null, [Validators.required]],
      name: [
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
      this.envRoutes.CORE + this.coreRoutes.CATALOGUES_LIST,
    ]);
  }

  create(catalogue: CatalogueModel): void {
    this.cataloguesHttpService
      .store<CatalogueModel, CatalogueModel>(catalogue)
      .subscribe((catalogue: CatalogueModel) => {
        this.form.reset(catalogue);
        this.back();
      });
  }

  update(catalogue: CatalogueModel): void {
    this.cataloguesHttpService
      .update(this.id, catalogue)
      .subscribe((catalogue) => {
        this.form.reset(catalogue);
        this.back();
      });
  }

  getCatalogue() {
    this.loaded = true;
    this.cataloguesHttpService
      .show<CatalogueModel>(this.id)
      .subscribe((catalogue: CatalogueModel) => {
        this.form.reset(catalogue);
        this.loaded = false;
      });
  }

  getCatalogueTypes() {
    this.catalogueTypesHttpService
      .index<CatalogueTypeModel[]>()
      .subscribe((catalogueTypes) => {
        this.catalogueTypes = catalogueTypes;
      });
  }

  get typeField() {
    return this.form.controls['type'];
  }
  get nameField() {
    return this.form.controls['name'];
  }
}
