import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetModel } from '@models/core';
import { AssetsHttpService, CoreService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrls: ['./assets-form.component.scss'],
})
export class AssetsFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  catalogues: object[] = [];
  loaded: boolean = false;

  constructor(
    private assetsHttpService: AssetsHttpService,
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
    this.getCatalogues();
    if (this.id > 0) {
      this.getAsset();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      type: [null, [Validators.required]],
      code: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      monetaryValue: [
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

  async back() {
    await this.router.navigate([
      this.envRoutes.CORE + this.coreRoutes.ASSETS_LIST,
    ]);
  }

  create(asset: AssetModel): void {
    this.assetsHttpService
      .store<AssetModel, AssetModel>(asset)
      .subscribe(async (newAsset) => {
        this.form.reset(newAsset);
        await this.back();
      });
  }

  update(asset: AssetModel): void {
    this.assetsHttpService
      .update<AssetModel, AssetModel>(this.id, asset)
      .subscribe(async (asset) => {
        this.form.reset(asset);
        await this.back();
      });
  }

  getAsset() {
    this.loaded = true;
    this.assetsHttpService
      .show<AssetModel>(this.id)
      .subscribe((asset: AssetModel) => {
        this.form.reset(asset);
        this.loaded = false;
      });
  }

  get typeField() {
    return this.form.controls['type'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
  get monetaryValueField() {
    return this.form.controls['monetaryValue'];
  }

  getCatalogues() {
    this.catalogues = [];
  }
}
