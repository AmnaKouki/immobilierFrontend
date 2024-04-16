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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-annonce',
  templateUrl: './update-annonce.component.html',
  styleUrls: ['./update-annonce.component.css'],
})
export class UpdateAnnonceComponent {
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

  onSubmit({ addAnother = false }) {
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
      photos: [...this.currentPhotos],
    };

    this.annonceService.update(this.annonceId, annonce).subscribe({
      next: (data: any) => {
        console.log('Annonce updated', data);
        this.toast.success('Annonce modifiée avec succès');
        if (this.form.value.uploadedFiles.length > 0) {
          let uploads = this.form.value.uploadedFiles.map((file: any) =>
            this.uploadSingleImg(data.id, file)
          );
          concat(...uploads)
            .pipe(finalize(() => this.router.navigate(['/admin'])))
            .subscribe({
              next: (res) => {
                console.log('Image uploaded', res);
              },
              error: (err) => {
                console.error('Upload image error', err);
                this.toast.error("Erreur lors de l'upload des images");
              },
            });
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (e) => {
        console.error('Update annonce error', e);
        this.toast.error("Erreur lors de la modification de l'annonce");
      },
    });
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

  activatedRoute = inject(ActivatedRoute);
  annonceId = this.activatedRoute.snapshot.params['id'];

  currentPhotos: any[] = [];

  ngOnInit() {
    this.annonceService.getById(this.annonceId).subscribe({
      next: (data: any) => {
        this.currentPhotos = data.photos;
        this.form.patchValue({
          titre: data.titre,
          selectedCategory: this.categories.find(
            (c) => c.value === data.categorieImmo
          ),
          selectedType: this.types.find((t) => t.value === data.type),
          selectedRegion: this.regions.find((r) => r.value === data.region),
          description: data.description,
          surface: data.surface,
          prix: data.prix,
          nbPieces: data.nbPieces,
          selectedCaracteristiques: this.caracteristiques.filter((c) =>
            data.caracteristiques.includes(c.value)
          ),
          adresse: data.adresse,
          email: data.contact.email,
          tel: data.contact.telephone,
        });
      },
      error: (e) => console.log(e),
    });
  }

  deletePhoto(photo: string) {
    this.annonceService.deletePhoto(this.annonceId, photo).subscribe({
      next: (res) => {
        console.log('Photo deleted', res);
        this.toast.success('Photo supprimée avec succès');
        this.currentPhotos = this.currentPhotos.filter((p) => p !== photo);
      },
      error: (err) => {
        console.error('Delete photo error', err);
        this.toast.error('Erreur lors de la suppression de la photo');
      },
    });
  }
}
