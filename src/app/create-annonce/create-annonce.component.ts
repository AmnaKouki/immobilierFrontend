import { Component, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { AnnoncesService } from '../annonces.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concat, finalize } from 'rxjs';
import { Router } from '@angular/router';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css'],
})
export class CreateAnnonceComponent {
  categories = [
    {
      name: 'Maison',
      value: 'maison',
    },
    {
      name: 'Appartement',
      value: 'appartement',
    },
    {
      name: 'Terrain',
      value: 'terrain',
    },
  ];
  types = [
    {
      name: 'Vente',
      value: 'vente',
    },
    {
      name: 'Location',
      value: 'location',
    },
  ];
  caracteristiques = [
    {
      name: 'Jardin',
      value: 'Jardin',
    },
    {
      name: 'Ascenseur',
      value: 'Ascenseur',
    },
    {
      name: 'Parking',
      value: 'Parking',
    },
    {
      name: 'Vue sur mer/montagne',
      value: 'Vue sur mer/montagne',
    },
    {
      name: 'Meublé',
      value: 'Meublé',
    },
    {
      name: 'Climatisation',
      value: 'Climatisation',
    },
    {
      name: 'Chauffage',
      value: 'Chauffage',
    },
    {
      name: 'Piscine',
      value: 'Piscine',
    },
    {
      name: 'Cuisine équipée',
      value: 'Cuisine équipée',
    },
    {
      name: 'Balcon',
      value: 'Balcon',
    },
    {
      name: 'Terrasse',
      value: 'Terrasse',
    },
    {
      name: 'Cheminée',
      value: 'Cheminée',
    },
    {
      name: 'Sécurité',
      value: 'Sécurité',
    },
    {
      name: 'Proximité des commodités',
      value: 'Proximité des commodités',
    },
  ];

  regions = [
    { name: 'Tunis', value: 'Tunis' },
    { name: 'Ariana', value: 'Ariana' },
    { name: 'Manouba', value: 'Manouba' },
    { name: 'Ben Arous', value: 'Ben Arous' },
    { name: 'Nabeul', value: 'Nabeul' },
    { name: 'Bizerte', value: 'Bizerte' },
    { name: 'Zaghouan', value: 'Zaghouan' },
    { name: 'Sousse', value: 'Sousse' },
    { name: 'Monastir', value: 'Monastir' },
    { name: 'Mahdia', value: 'Mahdia' },
    { name: 'Sfax', value: 'Sfax' },
    { name: 'Beja', value: 'Beja' },
    { name: 'Jendouba', value: 'Jendouba' },
    { name: 'ElKef', value: 'ElKef' },
    { name: 'Siliana', value: 'Siliana' },
    { name: 'Kairouan', value: 'Kairouan' },
    { name: 'Sidi Bouzid', value: 'Sidi Bouzid' },
    { name: 'Kasserine', value: 'Kasserine' },
    { name: 'Gabes', value: 'Gabes' },
    { name: 'Medenine', value: 'Medenine' },
    { name: 'Gafsa', value: 'Gafsa' },
    { name: 'Tozeur', value: 'Tozeur' },
    { name: 'Tataouine', value: 'Tataouine' },
    { name: 'Kebili', value: 'Kebili' },
  ];

  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  annonceService = inject(AnnoncesService);
  toast = inject(HotToastService);
  router = inject(Router);
  form: FormGroup = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    selectedCategory: new FormControl('', [Validators.required]),
    selectedType: new FormControl('', [Validators.required]),
    selectedRegion: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    surface: new FormControl(0, [Validators.required]),
    prix: new FormControl(0, [Validators.required]),
    nbPieces: new FormControl(0, [Validators.required]),
    selectedCaracteristiques: new FormControl([]),
    uploadedFiles: new FormControl([]),
    adresse: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tel: new FormControl('', [
      Validators.pattern('[- +()0-9]+'),
      Validators.required,
    ]),
  });

  onUpload(event: any) {
    for (let file of event.files) {
      this.form.value.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  onSubmit({ addAnother = false }) {
    // check if form is valid
    if (!this.form.valid) {
      this.toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (this.form.value.uploadedFiles.length === 0) {
      this.toast.error('Veuillez ajouter au moins une image');
      return;
    }

    let annonce = {
      type: this.form.value.selectedType.value,
      categorieImmo: this.form.value.selectedCategory.value,
      titre: this.form.value.titre,
      description: this.form.value.description,
      surface: this.form.value.surface,
      prix: this.form.value.prix,
      nbPieces: this.form.value.nbPieces,
      caracteristiques: [
        ...this.form.value.selectedCaracteristiques.map((c: any) => c.value),
      ],
      region: this.form.value.selectedRegion.value,
      adresse: this.form.value.adresse,
      contact: {
        email: this.form.value.email,
        telephone: this.form.value.tel,
      },
      photos: [],
    };

    this.annonceService.add(annonce).subscribe({
      next: (response: any) => {
        console.log('annonce added', response);
        let observables: any = [];
        this.form.value.uploadedFiles.forEach((file: any) => {
          //this.uploadSingleImg(response.id, file);
          observables.push(this.uploadSingleImg(response.id, file));
        });

        concat(...observables)
          .pipe(
            finalize(() => {
              this.toast.success('Annonce créée avec succès');
              this.resetForm();
              if (!addAnother) {
                this.router.navigate(['/admin']);
              } else {
                // scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            })
          )
          .subscribe({
            next: (res) => console.log('File uploaded', res),
            error: (err) => console.error('Upload error', err),
          });
      },
      error: (error) => {
        console.error(error);
        this.toast.error("Erreur lors de la création de l'annonce");
      },
    });
  }

  /**
   * Upload single img
   * @param id annonce id
   * @param file image
   */
  uploadSingleImg(id: string, file: any) {
    let formData = new FormData();
    formData.append('image', file);
    return this.annonceService.uploadImage(id, formData);
  }

  uploadfun(event: any) {
    let files = event.files;
    this.form.value.uploadedFiles = files;
  }

  annonceIdAfterCreation = '';
  @ViewChild('uploader') uploader!: FileUpload;
  resetForm() {
    this.uploader.clear();
    this.form.reset();
    this.form.value.uploadedFiles = [];
  }
}
