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
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss'],
})
export class AreasFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  materials: MaterialModel[] = [];
  loaded: boolean = false;

  constructor(
    private areasHttpService: AreasHttpService,
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
    this.getMaterials();
    if (this.id > 0) {
      this.getArea();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      materials: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      unitMonetaryValue: [
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
    this.router.navigate([this.envRoutes.CORE + this.coreRoutes.AREAS_LIST]);
  }

  create(area: AreaModel): void {
    this.areasHttpService
      .store<AreaModel, AreaModel>(area)
      .subscribe((area: AreaModel) => {
        this.form.reset(area);
        this.back();
      });
  }

  update(area: AreaModel): void {
    this.areasHttpService
      .update<AreaModel, AreaModel>(this.id, area)
      .subscribe((area) => {
        this.form.reset(area);
        this.back();
      });
  }

  getArea() {
    this.loaded = true;
    this.areasHttpService
      .show<AreaModel>(this.id)
      .subscribe((area: AreaModel) => {
        this.form.reset(area);
        this.loaded = false;
      });
  }

  getMaterials() {
    this.materialsHttpService
      .index<MaterialModel[]>()
      .subscribe((materials: MaterialModel[]) => {
        this.materials = materials;
      });
  }

  get materialsField() {
    return this.form.controls['materials'];
  }
  get nameField() {
    return this.form.controls['name'];
  }
  get unitMonetaryValueField() {
    return this.form.controls['unitMonetaryValue'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
}
