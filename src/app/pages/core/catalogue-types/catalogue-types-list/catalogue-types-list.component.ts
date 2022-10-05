import { Component, OnInit } from '@angular/core';
import { CatalogueTypeModel, ColumnModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import { CoreService, MessageCustomizationService } from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';
import { CatalogueTypesHttpService } from '@services/core/catalogue-types-http.service';

@Component({
  selector: 'app-catalogue-types-list',
  templateUrl: './catalogue-types-list.component.html',
  styleUrls: ['./catalogue-types-list.component.scss'],
})
export class CatalogueTypesListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.catalogueTypesHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedCatalogueTypes: CatalogueTypeModel[] = [];
  catalogueTypes: CatalogueTypeModel[] = [];
  loaded: boolean = false;

  constructor(
    private catalogueTypesHttpService: CatalogueTypesHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getCatalogueTypes());
  }

  ngOnInit(): void {
    this.getCatalogueTypes();
  }

  getCatalogueTypes(page: number = 0) {
    this.loaded = true;
    this.catalogueTypesHttpService
      .index<CatalogueTypeModel[]>(page, this.search.value)
      .subscribe((catalogueTypes) => {
        this.loaded = false;
        this.catalogueTypes = catalogueTypes;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nombre' },
      { field: 'value', header: 'Valor' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getCatalogueTypes(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUE_TYPES_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUE_TYPES_FORM,
      id,
    ]);
  }

  remove(id: number) {
    this.catalogueTypes = this.catalogueTypes.filter(
      (catalogueType) => catalogueType.id !== id
    );

    const onConfirm = () => {
      this.catalogueTypesHttpService
        .delete<CatalogueTypeModel>(id)
        .subscribe(() => {
          this.getCatalogueTypes();
        });
    };
    this.messagesService.questionAction(
      'Eliminar',
      '¿Segúro quieres eliminar tipo de catálogo ' + id + '?',
      'questionAction',
      onConfirm
    );
  }

  removeAll() {
    let catalogueTypeIds: number[] = [];
    this.selectedCatalogueTypes.forEach((selectedMaterial) => {
      catalogueTypeIds.push(selectedMaterial.id);
    });
    const onConfirm = () => {
      this.catalogueTypesHttpService
        .removeAll<number[]>(catalogueTypeIds)
        .subscribe(() => {
          this.getCatalogueTypes();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Seguro quieres eliminar estos tipos de catálogo?',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
