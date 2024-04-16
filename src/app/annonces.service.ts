import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  constructor(public httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get('http://localhost:8084/api/annonces');
  }

  getById(id: string) {
    return this.httpClient.get(`http://localhost:8084/api/annonces/${id}`);
  }

  add(annonce: any) {
    return this.httpClient.post(
      'http://localhost:8084/api/annonces/add',
      annonce
    );
  }

  uploadImage(id: string, formData: FormData) {
    return this.httpClient.post(
      'http://localhost:8084/api/annonces/uploadImage/' + id,
      formData
    );
  }

  delete(id: string) {
    return this.httpClient.delete(
      `http://localhost:8084/api/annonces/delete/${id}`
    );
  }

  deletePhoto(id: string, filename: string) {
    return this.httpClient.delete(
      `http://localhost:8084/api/annonces/${id}/image/delete/${filename}`
    );
  }

  update(id: string, annonce: any) {
    return this.httpClient.post(
      `http://localhost:8084/api/annonces/update/${id}`,
      annonce
    );
  }
}
