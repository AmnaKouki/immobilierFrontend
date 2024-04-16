import { Component, inject } from '@angular/core';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
  ClientSideRowModelModule,
} from 'ag-grid-community';

import { AnnoncesService } from '../annonces.service';
import { TableActionsComponent } from '../components/table-actions/table-actions.component';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private gridApi!: GridApi;

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.annonceService.getAll().subscribe({
      next: (data: any) => {
        this.rowData = data.reverse();
      },
      error: (e) => console.log(e),
    });
  }
  // Row Data: The data to be displayed.
  annonceService = inject(AnnoncesService);
  rowData: any[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'titre', headerName: 'Titre' },
    {
      field: 'type',
      headerName: 'Type',
      valueFormatter: (params) => {
        // titlecase
        return params.value.charAt(0).toUpperCase() + params.value.slice(1);
      },
    },
    { field: 'categorieImmo', headerName: 'Catégorie',
    valueFormatter: (params) => {
      // titlecase
      return params.value.charAt(0).toUpperCase() + params.value.slice(1);
    }, },

    // { field: 'description' },
    {
      field: 'surface',
      headerName: 'Surface',
      valueGetter: (params) => `${params.data.surface} m²`,
    },
    {
      field: 'prix',
      headerName: 'Prix',
      valueGetter: (params) => `${params.data.prix} DT`,
    },
    {
      field: 'nbPieces',
      headerName: 'Nombre de pièces',
      valueGetter: (params) => `${params.data.nbPieces} pièce(s)`,
    },
    { field: 'caracteristiques', headerName: 'Caractéristiques', width: 300 },
    //{ field: 'photos', headerName: 'Photos' },
    { field: 'region', headerName: 'Région' },
    { field: 'adresse', headerName: 'Adresse' },
    { field: 'contact.email', headerName: 'Email' },
    { field: 'contact.telephone', headerName: 'Téléphone' },
    {
      field: 'createdDate',
      headerName: 'Date de Création',
      valueGetter: (params) => {
        const date = new Date(params.data.createdDate);
        const result = date.toLocaleDateString('en-GB', {
          // you can use undefined as first argument
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        return result;
      },
    },
    {
      field: 'lastModifiedDate',
      headerName: 'Derniere modification',
      valueGetter: (params) => {
        const date = new Date(params.data.createdDate);
        const result = date.toLocaleDateString('en-GB', {
          // you can use undefined as first argument
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        return result;
      },
    },
    {
      field: 'Actions',
      cellRenderer: TableActionsComponent,
      pinned: 'right',
      width: 155,
    },
  ];
}
