import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetModel, ConsumablesModel } from '@models/core';
import { AssetsHttpService, CoreService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';
import { ConsumablesHttpService } from '@services/core/consumables-http.service';

@Component({
  selector: 'app-consumables-form',
  templateUrl: './consumables-form.component.html',
  styleUrls: ['./consumables-form.component.scss'],
})
export class ConsumablesFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  consumable: ConsumablesModel[] = [];
  assets: AssetModel[] = [];
  loaded: boolean = false;

  constructor(
    private assetsHttpService: AssetsHttpService,
    private consumablesHttpService: ConsumablesHttpService,
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
    this.getAssets();
    if (this.id > 0) {
      this.getConsumable();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      asset: [null, [Validators.required]],
      amount: [
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
      description: [
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
      unitValue: [
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
    console.log(this.envRoutes.CORE + '/' + this.coreRoutes.CONSUMABLES_LIST);
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.CONSUMABLES_LIST,
    ]);
  }

  create(consumable: ConsumablesModel): void {
    this.consumablesHttpService
      .store<ConsumablesModel, ConsumablesModel>(consumable)
      .subscribe(async (newConsumable) => {
        this.form.reset(newConsumable);
        await this.back();
      });
  }

  update(consumable: ConsumablesModel): void {
    this.consumablesHttpService
      .update<ConsumablesModel, ConsumablesModel>(this.id, consumable)
      .subscribe(async (newConsumable) => {
        this.form.reset(newConsumable);
        await this.back();
      });
  }

  getConsumable() {
    this.loaded = true;
    this.consumablesHttpService
      .show<ConsumablesModel>(this.id)
      .subscribe((consumable: ConsumablesModel) => {
        this.form.reset(consumable);
        this.loaded = false;
      });
  }

  getAssets(): void {
    this.assetsHttpService
      .index<AssetModel[]>()
      .subscribe((assets: AssetModel[]) => {
        this.assets = assets;
      });
  }

  get assetField() {
    return this.form.controls['asset'];
  }
  get amountField() {
    return this.form.controls['amount'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
  get descriptionField() {
    return this.form.controls['description'];
  }
  get totalValueField() {
    return this.form.controls['totalValue'];
  }
  get unitValueField() {
    return this.form.controls['unitValue'];
  }
}
