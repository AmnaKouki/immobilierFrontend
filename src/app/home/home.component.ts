import { Component, inject } from '@angular/core';
import { AnnoncesService } from '../annonces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public annoncesService: AnnoncesService) {}

  annonces: any[] = [];
  ngOnInit() {
    this.annoncesService.getAll().subscribe((data: any) => {
      this.annonces = data.reverse().slice(0, 6);
    });
  }

  submitSearch(e: any) {
    this.router.navigate(['/list'], {
      queryParams: { search: e.target.value },
    });
  }

  clickSearch() {
    this.router.navigate(['/list'], {
      queryParams: { search: this.searchQuery },
    });
  }
  searchQuery = '';

  router = inject(Router);
}
