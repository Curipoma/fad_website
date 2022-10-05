import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaModel, MaterialModel } from '@models/core';
import {
  AreasHttpService,
  CoreService,
  MaterialsHttpService,
} from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-materials-form',
  templateUrl: './materials-form.component.html',
  styleUrls: ['./materials-form.component.scss'],
})
export class MaterialsFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  loaded: boolean = false;

  constructor(
    private materialsHttpService: MaterialsHttpService,
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
      this.getMaterial();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      initialExistence: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      annualExistence: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      unitValue: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      totalValue: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      code: [
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
      this.envRoutes.CORE + this.coreRoutes.MATERIALS_LIST,
    ]);
  }

  create(material: MaterialModel): void {
    this.materialsHttpService
      .store<MaterialModel, MaterialModel>(material)
      .subscribe((material: MaterialModel) => {
        this.form.reset(material);
        this.back();
      });
  }

  update(material: MaterialModel): void {
    this.materialsHttpService
      .update<MaterialModel, MaterialModel>(this.id, material)
      .subscribe((material) => {
        this.form.reset(material);
        this.back();
      });
  }

  getMaterial() {
    this.loaded = true;
    this.materialsHttpService
      .show<MaterialModel>(this.id)
      .subscribe((material: MaterialModel) => {
        this.form.reset(material);
        this.loaded = false;
      });
  }

  get descriptionField() {
    return this.form.controls['description'];
  }
  get initialExistenceField() {
    return this.form.controls['initialExistence'];
  }
  get annualExistenceField() {
    return this.form.controls['annualExistence'];
  }
  get unitValueField() {
    return this.form.controls['unitValue'];
  }
  get totalValueField() {
    return this.form.controls['totalValue'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
}
