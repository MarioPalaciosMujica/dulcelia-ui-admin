import { Subscription } from 'rxjs';
import { ImageService } from './../../../core/services/image.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { mediaDB } from 'src/app/shared/tables/media';
import { Image } from 'src/app/shared/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {

  public media = []

  public imageList: Image[] = [];
  selectedImage: File = null;
  imageName: string = '';
  imagePreview: string = '/assets/images/tb-img-demo.png';
  isButtonActive: boolean = true;

  private subscriptions$: Subscription[] = [];

  constructor(
    private imageService: ImageService,
    private _domSanitizer: DomSanitizer
  ) {
    //this.media = mediaDB.data;

    // Images
    const findAllImages$: Subscription = this.imageService.findAll().subscribe(data => {
      this.imageList = data as Image[];
    });
    this.subscriptions$.push(findAllImages$);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }

  selectFile(event){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imagePreview = event.target.result;
    }
    this.selectedImage = <File>event.target.files[0];
    this.imageName = this.selectedImage.name;
  }

  uploadImage(){
    this.isButtonActive = false;
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    const uploadImage$: Subscription = this.imageService.uploadImage(formData).subscribe(data => {
      this.isButtonActive = true;
    });
    this.subscriptions$.push(uploadImage$);
  }

  onDeleteConfirm(event){
    if (window.confirm('Esta seguro(a) que quiere eliminar esta imagen?')) {
      let idImage = event.data.idImage;
      const deleteCategory$: Subscription = this.imageService.deleteById(idImage).subscribe();
      this.subscriptions$.push(deleteCategory$);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public settings = {
    actions: {
      position: 'right'
    },
    delete: {
      confirmDelete: true
    },
    columns: {
      src: {
        title: 'Imagen',
        type: 'html',
        filter: false,
        width: '100px',
        valuePrepareFunction: (imageUrl) => {
          return this._domSanitizer.bypassSecurityTrustHtml(`<img src="${imageUrl}" width="50">`);
      },
      },
      alt: {
        title: 'Nombre'
      },
      created: {
        title: 'Creado',
      },
    },
  };


  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  

}
