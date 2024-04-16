import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AnnoncesService } from 'src/app/annonces.service';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css'],
})
export class TableActionsComponent implements ICellRendererAngularComp {
  annonceId = '';
  annonceService = inject(AnnoncesService);
  router = inject(Router);
  agInit(params: ICellRendererParams): void {
    this.annonceId = params.data.id;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  view() {
    this.router.navigate([`/annonce/${this.annonceId}`]);
  }

  edit() {
    this.router.navigate([`/admin/edit/${this.annonceId}`]);
  }

  delete() {
    // prompt user for confirmation
    const confirmation = confirm(
      'Etes vous sûr de vouloir supprimer cet élément ?'
    );
    if (confirmation) {
      this.annonceService.delete(this.annonceId).subscribe({
        next: () => {
          console.log('deleted' + this.annonceId);
          window.location.reload();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}
