import { Component, OnInit } from '@angular/core';
import { ColumnModel, ConsumablesModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import { CoreService, MessageCustomizationService } from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';
import { ConsumablesHttpService } from '@services/core/consumables-http.service';

@Component({
  selector: 'app-consumables-list',
  templateUrl: './consumables-list.component.html',
  styleUrls: ['./consumables-list.component.scss'],
})
export class ConsumablesListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.consumablesHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedConsumables: ConsumablesModel[] = [];
  consumables: ConsumablesModel[] = [];
  loaded: boolean = false;

  constructor(
    private consumablesHttpService: ConsumablesHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getConsumables());
  }

  ngOnInit(): void {
    this.getConsumables();
  }

  getConsumables(page: number = 0) {
    this.loaded = true;
    this.consumablesHttpService
      .index<ConsumablesModel[]>(page, this.search.value)
      .subscribe((consumables) => {
        this.consumables = consumables;
        this.loaded = false;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'asset', header: 'Activo' },
      { field: 'amount', header: 'Cantidad' },
      { field: 'code', header: 'Código' },
      { field: 'description', header: 'Descripción' },
      { field: 'totalValue', header: 'Valor Total' },
      { field: 'unitValue', header: 'Valor Unit' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getConsumables(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.CONSUMABLES_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      this.envRoutes.CORE + '/' + this.coreRoutes.CONSUMABLES_FORM,
      id,
    ]);
  }

  remove(id: number) {
    const onConfirm = () => {
      this.consumablesHttpService
        .delete<ConsumablesModel>(id)
        .subscribe((consumable) => {
          this.getConsumables();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar este consumible ' + id,
      'questionAction',
      onConfirm,
      onReject
    );
  }

  removeAll() {
    let consumables: number[] = [];
    this.selectedConsumables.forEach((selectedConsumable) => {
      consumables.push(selectedConsumable.id);
    });
    const onConfirm = () => {
      this.consumablesHttpService
        .removeAll<number[]>(consumables)
        .subscribe((assetDetail) => {
          this.getConsumables();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      'Seguro quieres eliminar estos consumibles',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
