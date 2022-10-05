import { Component, OnInit } from '@angular/core';
import { ColumnModel, MaterialModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import {
  CoreService,
  MaterialsHttpService,
  MessageCustomizationService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.materialsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedMaterials: MaterialModel[] = [];
  materials: MaterialModel[] = [];
  loaded: boolean = false;

  constructor(
    private materialsHttpService: MaterialsHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getMaterials());
  }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials(page: number = 0) {
    this.loaded = true;
    this.materialsHttpService
      .index<MaterialModel[]>(page, this.search.value)
      .subscribe((materials) => {
        this.loaded = false;
        this.materials = materials;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'description', header: 'Descripción' },
      { field: 'initialExistence', header: 'Existencia inicial' },
      { field: 'annualExistence', header: 'Existencia anual' },
      { field: 'unitValue', header: 'Valor Unitario' },
      { field: 'totalValue', header: 'Valor Total' },
      { field: 'code', header: 'Código' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getMaterials(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.MATERIALS_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.MATERIALS_FORM,
      id,
    ]);
  }

  remove(id: number) {
    this.materials = this.materials.filter((material) => material.id !== id);

    const onConfirm = () => {
      this.materialsHttpService.delete<MaterialModel>(id).subscribe(() => {
        this.getMaterials();
      });
    };
    this.messagesService.questionAction(
      'Eliminar',
      '¿Segúro quieres eliminar área ' + id + '?',
      'questionAction',
      onConfirm
    );
  }

  removeAll() {
    let materialIds: number[] = [];
    this.selectedMaterials.forEach((selectedMaterial) => {
      materialIds.push(selectedMaterial.id);
    });
    const onConfirm = () => {
      this.materialsHttpService
        .removeAll<number[]>(materialIds)
        .subscribe(() => {
          this.getMaterials();
        });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Seguro quieres este eliminar materiales?',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}
