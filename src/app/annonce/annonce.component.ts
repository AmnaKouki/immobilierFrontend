import { Component, inject } from '@angular/core';
import { AnnoncesService } from '../annonces.service';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent {
  annonceService = inject(AnnoncesService);
  activatedRoute = inject(ActivatedRoute);
  annonceId = this.activatedRoute.snapshot.params['id'];
  annonce: any = null;
  private _album: any[] = [];
  constructor(private _lightbox: Lightbox) {}

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  close(): void {
    this._lightbox.close();
  }

  ngOnInit() {
    this.annonceService.getById(this.annonceId).subscribe((data: any) => {
      this.annonce = data;
      let photos = data.photos;
      photos.forEach((photo: any) => {
        this._album.push({
          src: 'http://localhost:8084/api/annonces/download/' + photo,
          caption: '',
          thumb: 'http://localhost:8084/api/annonces/download/' + photo,
        });
      });
    });
  }

  showContact() {}
}
