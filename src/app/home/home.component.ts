import { Component } from '@angular/core';
import { AnnoncesService } from '../annonces.service';

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
      this.annonces = data;
    });
  }
}
