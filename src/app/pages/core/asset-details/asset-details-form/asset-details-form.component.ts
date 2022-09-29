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

@Component({
  selector: 'app-asset-details-form',
  templateUrl: './asset-details-form.component.html',
  styleUrls: ['./asset-details-form.component.scss'],
})
export class AssetDetailsFormComponent implements OnInit {
  id: number = 0;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  assets: AssetModel[] = [];

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
      console.log(this.id);
    }
  }

  async onExit(): Promise<boolean> {
    const onConfirm = () => {};
    const onReject = () => {};
    if (this.form.touched || this.form.dirty) {
      this.messagesService.questionOnExit(
        'Seguro quieres salir',
        'Seguro quieres salir, se perderán tus datos',
        'questionAction',
        onConfirm,
        onReject
      );
    }
    return true;
  }

  ngOnInit(): void {
    this.getAssets();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      asset: [null, [Validators.required]],
      annualExistence: [null, [Validators.required]],
      code: [null, [Validators.required]],
      initialExistence: [null, [Validators.required]],
      unitValue: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.form.errors);
    if (this.form.valid) {
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
  back(): void {
    this.router.navigate(['/core/information-teachers']);
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

  getAssets() {
    this.assetsHttpService.index<AssetModel[]>().subscribe((assets) => {
      this.assets = assets;
      console.log(assets)
    });
  }
}
