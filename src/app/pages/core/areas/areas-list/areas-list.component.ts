import { Component, OnInit } from '@angular/core';
import { AreaModel, ColumnModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import {
  AreasHttpService,
  CoreService,
  MessageCustomizationService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})
export class AreasListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.areasHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedAreas: AreaModel[] = [];
  areas: AreaModel[] = [];
  loaded: boolean = false;

  constructor(
    private areasHttpService: AreasHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getAreas());
  }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(page: number = 0) {
    this.loaded = true;
    this.areasHttpService
      .index<AreaModel[]>(page, this.search.value)
      .subscribe((areas) => {
        this.loaded = false;
        this.areas = areas;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'materials', header: 'Material' },
      { field: 'name', header: 'Nombre' },
      { field: 'unitMonetaryValue', header: 'Valor Monetario Unitario' },
      { field: 'code', header: 'Código' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getAreas(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.AREAS_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.AREAS_FORM,
      id,
    ]);
  }

  remove(id: number) {
    const onConfirm = () => {
      this.areasHttpService.delete<AreaModel>(id).subscribe((assetDetail) => {
        this.getAreas();
      });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Segúro quieres eliminar área ' + id + '?',
      'questionAction',
      onConfirm,
      onReject
    );
  }

  removeAll() {
    let areaIds: number[] = [];
    this.selectedAreas.forEach((selectedArea) => {
      areaIds.push(selectedArea.id);
    });
    const onConfirm = () => {
      this.areasHttpService.removeAll<number[]>(areaIds).subscribe(() => {
        this.getAreas();
      });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Seguro quieres eliminar áreas?',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
