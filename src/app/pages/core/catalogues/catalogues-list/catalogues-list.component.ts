import { Component, OnInit } from '@angular/core';
import { CatalogueModel, ColumnModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import { CoreService, MessageCustomizationService } from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';
import { CataloguesHttpService } from '@services/core/catalogues-http.service';

@Component({
  selector: 'app-catalogues-list',
  templateUrl: './catalogues-list.component.html',
  styleUrls: ['./catalogues-list.component.scss'],
})
export class CataloguesListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.cataloguesHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedCatalogues: CatalogueModel[] = [];
  catalogues: CatalogueModel[] = [];
  loaded: boolean = false;

  constructor(
    private cataloguesHttpService: CataloguesHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getCatalogues());
  }

  ngOnInit(): void {
    this.getCatalogues();
  }

  getCatalogues(page: number = 0) {
    this.loaded = true;
    this.cataloguesHttpService
      .index<CatalogueModel[]>(page, this.search.value)
      .subscribe((Catalogues) => {
        this.loaded = false;
        this.catalogues = Catalogues;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nombre' },
      { field: 'type', header: 'Tipo' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getCatalogues(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUES_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUES_FORM,
      id,
    ]);
  }

  remove(id: number) {
    this.catalogues = this.catalogues.filter(
      (catalogue) => catalogue.id !== id
    );

    const onConfirm = () => {
      this.cataloguesHttpService.delete<CatalogueModel>(id).subscribe(() => {
        this.getCatalogues();
      });
    };
    this.messagesService.questionAction(
      'Eliminar',
      '¿Segúro quieres eliminar este catálogo ' + id + '?',
      'questionAction',
      onConfirm
    );
  }

  removeAll() {
    let catalogueTypeIds: number[] = [];
    this.selectedCatalogues.forEach((selectedMaterial) => {
      catalogueTypeIds.push(selectedMaterial.id);
    });
    const onConfirm = () => {
      this.cataloguesHttpService
        .removeAll<number[]>(catalogueTypeIds)
        .subscribe(() => {
          this.getCatalogues();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Seguro quieres eliminar estos catálogos?',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
