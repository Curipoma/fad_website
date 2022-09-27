import { Component, OnInit } from '@angular/core';
import {
  AssetDetailsHttpService,
  CoreService,
  MessageCustomizationService,
} from '@services/core';
import { AssetDetailsModel, ColumnModel, PaginatorModel } from '@models/core';
import { FormControl } from '@angular/forms';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-asset-details-list',
  templateUrl: './asset-details-list.component.html',
  styleUrls: ['./asset-details-list.component.scss'],
})
export class AssetDetailsListComponent implements OnInit {
  columns: ColumnModel[] = [];
  assetDetails: AssetDetailsModel[] = [];
  pagination$ = this.assetDetailsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  loading: boolean = false;
  selectedAssetDetails: AssetDetailsModel[] = [];

  constructor(
    private assetDetailsHttpService: AssetDetailsHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService
  ) {
    this.columns = this.getColumns();
    this.search.valueChanges.subscribe((_) => {
      this.getAssetDetails();
    });
    this.pagination$.subscribe((pagination) => {
      this.paginator = pagination;
    });
  }

  ngOnInit(): void {
    this.getAssetDetails();
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
    ];
  }

  paginate(e: any) {
    this.getAssetDetails(e.page);
  }

  remove(id: number) {
    function onConfirm() {
      console.log('on confirm');
    }
    function onReject() {
      console.log('on reject');
    }

    // todo resolver el envío de funciones para que ejecuten los btns

    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar detalle de activo ' + id,
      'questionAction',
      onConfirm,
      onReject
    );
  }

  getAssetDetails(page: number = 0) {
    this.loading = true;
    this.assetDetailsHttpService
      .index<AssetDetailsModel[]>(page, this.search.value)
      .subscribe((assetDetails) => {
        this.assetDetails = assetDetails;
        this.loading = false;
      });
  }

  refresh() {
    this.getAssetDetails();
  }
}
