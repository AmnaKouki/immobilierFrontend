import { Component, inject } from '@angular/core';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  annoncesService = inject(AnnoncesService);
  annonces: any[] = [];

  ngOnInit() {
    this.annoncesService.getAll().subscribe((data: any) => {
      this.annonces = data;
    });
  }
}
