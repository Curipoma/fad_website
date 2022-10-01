import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AssetDetailsHttpService,
  AssetsHttpService,
  CoreService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import { AssetDetailsModel, AssetModel } from '@models/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';

@Component({
  selector: 'app-asset-details-form',
  templateUrl: './asset-details-form.component.html',
  styleUrls: ['./asset-details-form.component.scss'],
})
export class AssetDetailsFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  assets: AssetModel[] = [];
  loaded: boolean = false;

  constructor(
    private assetsHttpService: AssetsHttpService,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private router: Router,
    private assetDetailsHttpService: AssetDetailsHttpService
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.getAssets();
    if (this.id > 0) {
      this.getAssetDetail();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      asset: [
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
      code: [
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
      unitValue: [
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
      this.envRoutes.CORE + this.coreRoutes.ASSET_DETAILS_LIST,
    ]);
  }

  create(assetDetail: AssetDetailsModel): void {
    this.assetDetailsHttpService
      .store<AssetDetailsModel, AssetDetailsModel>(assetDetail)
      .subscribe((assetDetail) => {
        this.form.reset(assetDetail);
        this.back();
      });
  }

  update(assetDetail: AssetDetailsModel): void {
    this.assetDetailsHttpService
      .update(this.id, assetDetail)
      .subscribe((informationTeacher) => {
        this.form.reset(informationTeacher);
        this.back();
      });
  }

  getAssetDetail() {
    this.loaded = true;
    this.assetDetailsHttpService
      .show<AssetDetailsModel>(this.id)
      .subscribe((assetDetail: AssetDetailsModel) => {
        this.form.reset(assetDetail);
        this.loaded = false;
      });
  }

  getAssets() {
    this.assetsHttpService.index<AssetModel[]>().subscribe((assets) => {
      this.assets = assets;
    });
  }

  get assetField() {
    return this.form.controls['asset'];
  }
  get annualExistenceField() {
    return this.form.controls['annualExistence'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
  get initialExistenceField() {
    return this.form.controls['initialExistence'];
  }
  get unitValueField() {
    return this.form.controls['unitValue'];
  }
  get valueField() {
    return this.form.controls['value'];
  }
}
