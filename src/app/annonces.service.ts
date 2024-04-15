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
}
