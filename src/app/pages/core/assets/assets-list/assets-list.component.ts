import { Component, OnInit } from '@angular/core';
import { AssetModel, ColumnModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import {
  AssetsHttpService,
  CoreService,
  MessageCustomizationService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss'],
})
export class AssetsListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.assetsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedAssets: AssetModel[] = [];
  assets: AssetModel[] = [];
  loaded: boolean = false;

  constructor(
    private assetsHttpService: AssetsHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getAssets());
  }

  ngOnInit(): void {
    this.getAssets();
  }

  getAssets(page: number = 0) {
    this.loaded = true;
    this.assetsHttpService
      .index<AssetModel[]>(page, this.search.value)
      .subscribe((assetDetails) => {
        this.assets = assetDetails;
        this.loaded = false;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'type', header: 'Type' },
      { field: 'code', header: 'Code' },
      { field: 'monetaryValue', header: 'Monetary Value' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getAssets(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.ASSETS_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.ASSETS_FORM,
      id,
    ]);
  }

  remove(id: number) {
    const onConfirm = () => {
      this.assetsHttpService.delete<AssetModel>(id).subscribe((assetDetail) => {
        this.getAssets();
      });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar este activo ' + id,
      'questionAction',
      onConfirm,
      onReject
    );
  }

  removeAll() {
    let assetDetailIds: number[] = [];
    this.selectedAssets.forEach((selectedAsset) => {
      assetDetailIds.push(selectedAsset.id);
    });
    const onConfirm = () => {
      this.assetsHttpService
        .removeAll<number[]>(assetDetailIds)
        .subscribe((assetDetail) => {
          this.getAssets();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar detalles de activo',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
