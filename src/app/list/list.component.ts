import { Component, inject } from '@angular/core';
import { AnnoncesService } from '../annonces.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  isLoading = false;
  annoncesService = inject(AnnoncesService);
  annonces: any[] = [];
  searchValue = '';
  activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.isLoading = true;
    this.annoncesService.getAll().subscribe((data: any) => {
      this.isLoading = false;
      this.annonces = data.reverse();
      // if there is a search query, filter the data
      if (this.activatedRoute.snapshot.queryParamMap.get('search')) {
        this.searchValue =
          this.activatedRoute.snapshot.queryParamMap.get('search')!;
        this.annonces = this.annonces.filter((annonce) =>
          annonce.titre.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }

      // if there is a type query, filter the data
      if (this.activatedRoute.snapshot.queryParamMap.get('type')) {
        this.searchValue =
          this.activatedRoute.snapshot.queryParamMap.get('type')!;
        this.annonces = this.annonces.filter((annonce) =>
          annonce.type.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.isLoading = true;
      // reload when the query params change
      this.annoncesService.getAll().subscribe((data: any) => {
        this.isLoading = false;
        this.annonces = data.reverse();
        // if there is a search query, filter the data
        if (queryParams.search) {
          this.searchValue = queryParams.search;
          this.annonces = this.annonces.filter((annonce) =>
            annonce.titre.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        }

        // if there is a type query, filter the data
        if (queryParams.type) {
          this.searchValue = queryParams.type;
          this.annonces = this.annonces.filter((annonce) =>
            annonce.type.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        }
      });
    });
  }

  // get query param
}
