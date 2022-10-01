import { Component, OnInit } from '@angular/core';
import {
  AssetDetailsHttpService,
  CoreService,
  MessageCustomizationService,
} from '@services/core';
import { AssetDetailsModel, ColumnModel, PaginatorModel } from '@models/core';
import { FormControl } from '@angular/forms';
import { MessagesService } from '@services/shared';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-details-list',
  templateUrl: './asset-details-list.component.html',
  styleUrls: ['./asset-details-list.component.scss'],
})
export class AssetDetailsListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.assetDetailsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedAssetDetails: AssetDetailsModel[] = [];
  assetDetails: AssetDetailsModel[] = [];
  loaded: boolean = false;

  constructor(
    private assetDetailsHttpService: AssetDetailsHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getAssetDetails());
  }

  ngOnInit(): void {
    this.getAssetDetails();
  }

  getAssetDetails(page: number = 0) {
    this.loaded = true;
    this.assetDetailsHttpService
      .index<AssetDetailsModel[]>(page, this.search.value)
      .subscribe((assetDetails) => {
        this.loaded = false;
        this.assetDetails = assetDetails;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'asset', header: 'Asset' },
      { field: 'annualExistence', header: 'Annual Existence' },
      { field: 'code', header: 'Code' },
      { field: 'initialExistence', header: 'Initial Existence' },
      { field: 'unitValue', header: 'Unit Value' },
      { field: 'value', header: 'Value' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getAssetDetails(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.ASSET_DETAILS_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.ASSET_DETAILS_FORM,
      id,
    ]);
  }

  remove(id: number) {
    const onConfirm = () => {
      this.assetDetailsHttpService
        .delete<AssetDetailsModel>(id)
        .subscribe((assetDetail) => {
          this.getAssetDetails();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar detalle de activo ' + id,
      'questionAction',
      onConfirm,
      onReject
    );
  }
  removeAll() {
    let assetDetailIds: number[] = [];
    this.selectedAssetDetails.forEach((selectedAssetDetail) => {
      assetDetailIds.push(selectedAssetDetail.id);
    });
    const onConfirm = () => {
      this.assetDetailsHttpService
        .removeAll<number[]>(assetDetailIds)
        .subscribe((assetDetail) => {
          this.getAssetDetails();
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
