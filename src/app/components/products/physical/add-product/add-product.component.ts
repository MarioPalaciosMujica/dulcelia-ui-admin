import { CataloguesEnum } from './../../../../shared/enums/catalogues.enum';
import { ImageService } from './../../../../core/services/image.service';
import { OptionService } from './../../../../core/services/option.service';
import { Subscription } from 'rxjs';
import { TagService } from './../../../../core/services/tag.service';
import { CategoryService } from './../../../../core/services/category.service';
import { CollectionService } from './../../../../core/services/collection.service';
import { BrandService } from './../../../../core/services/brand.service';
import { ProductService } from './../../../../core/services/product.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { Brand } from 'src/app/shared/models/brand.model';
import { Collection } from 'src/app/shared/models/collection.model';
import { Category } from 'src/app/shared/models/category.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Option } from 'src/app/shared/models/option.model';
import { Image } from 'src/app/shared/models/image.model';
import { Variant } from 'src/app/shared/models/variant.model';
declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('TagsCheckBoxGroup', { 'static': true}) tagsCheckBoxGroup: ElementRef;

  public form: FormGroup;
  public imagePreviewUrl: string = 'assets/images/pro3/1.jpg';

  public product: Product = {};
  public brandList: Brand[] = [];
  public collectionList: Collection[] = [];
  public categoryList: Category[] = [];
  public tagList: Tag[] = [];
  public optionList: Option[] = [];
  private imageList: Image[] = [];

  private subscriptions$: Subscription[] = [];

  public isCreate: boolean = true;
  public pageTitle: string = 'Añadir Producto';

  public url = [{
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  }
  ]


  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private collectionService: CollectionService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private optionService: OptionService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.product.images = [];

    this.form = this.fb.group({
      barcode: [null, [
        Validators.maxLength(13)
      ]],
      title: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
        //,Validators.pattern('^[a-zA-Z \-\']+')
      ]],
      description: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]],
      isNew: [true, [
        Validators.required
      ]],
      // discountPercentage: [0.00, [
      //   Validators.required,
      //   Validators.pattern('^\\d+\\.\\d{2}$')
      // ]],
      isCapacityQty: [true, [
        Validators.required
      ]],
      isActive: [true, [
        Validators.required
      ]],
      selectBrand: [null, [
      ]],
      selectCollection: [null, [
      ]],
      selectCategory: [null, [
        Validators.required
      ]],
      tags: this.fb.array([]),
      // price: [null, [
      //   Validators.required,
      //   Validators.pattern('^[0-9]+$')
      // ]],
      stock: [0, [
        Validators.required,
      ]],
      variants: this.fb.array([], Validators.required)
    });
    
    // Brands
    const findAllBrands$ = this.brandService.findAll().subscribe(data => {
      this.brandList = data as Brand[];
    });
    this.subscriptions$.push(findAllBrands$);

    // Collections
    const findAllCollections$ = this.collectionService.findAll().subscribe(data => {
      this.collectionList = data as Collection[];
    });
    this.subscriptions$.push(findAllCollections$);

    // Categories
    const findAllCategories$ = this.categoryService.findAll().subscribe(data => {
      this.categoryList = data as Category[];
    });
    this.subscriptions$.push(findAllCategories$);

    // Tags
    const findAllTags$ = this.tagService.findAll().subscribe(data => {
      this.tagList = data as Tag[];
    });
    this.subscriptions$.push(findAllTags$);

    // Option
    const findAllOptions$ = this.optionService.findAll().subscribe(data => {
      this.optionList = data as Option[];
    });
    this.subscriptions$.push(findAllOptions$);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(paramMap.has('id')){
        this.editPage();
        const findPrduct$: Subscription = this.productService.findById(Number(paramMap.get('id'))).subscribe(data => {
          this.product = data as Product;
          this.toForm();
          //console.log(this.product);
        });
        this.subscriptions$.push(findPrduct$);
      }
    });
  }

  ngAfterViewInit(){
    //console.log('ngAfterViewInit()');
  }

  private initVariant() {
    return this.fb.group({
      unit: [0 ,[
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      priceAmount: [null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]]
    });
  }

  addVariant() {
    const control = <FormArray>this.form.controls['variants'];
    control.push(this.initVariant());
  }

  removeVariant(i: number) {
    const control = <FormArray>this.form.controls['variants'];
    control.removeAt(i);
  }

  private editPage(){
    this.isCreate = false;
    this.pageTitle = 'Editar Producto';
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('tags') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }

  uploadImage(event){
    if (event.target.files.length === 0){
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // read
    let selectedImage: File = null;
    let imageName: string = '';
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event: any) => {
    //   //this.imagePreview = event.target.result;
    //   this.url[i].img = reader.result.toString();
    // }
    selectedImage = <File>event.target.files[0];
    imageName = selectedImage.name;

    // upload
    const formData = new FormData();
    formData.append('image', selectedImage, selectedImage.name);
    const uploadImage$: Subscription = this.imageService.uploadImage(formData).subscribe(data => {
      let image: Image = data as Image;
      this.imagePreviewUrl = image.src;
      //this.imageList.push(image);
      this.product.images.push(image);
    });
    this.subscriptions$.push(uploadImage$);
  }

  selectImage(url: string){
    this.imagePreviewUrl = url;
  }

  deleteImage(idImage: number){
    let index = this.product.images.findIndex(i => i.idImage == idImage);
    this.product.images.splice(index, 1);
  }

  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.url[i].img = reader.result.toString();
    // }

    // read
    let selectedImage: File = null;
    let imageName: string = '';
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      //this.imagePreview = event.target.result;
      this.url[i].img = reader.result.toString();
    }
    selectedImage = <File>event.target.files[0];
    imageName = selectedImage.name;
    
    // upload
    const formData = new FormData();
    formData.append('image', selectedImage, selectedImage.name);
    const uploadImage$: Subscription = this.imageService.uploadImage(formData).subscribe(data => {
      let image: Image = data as Image;
      this.imagePreviewUrl = image.src;
      this.imageList.push(image);
    });
    this.subscriptions$.push(uploadImage$);
  }

  discart(){
    console.log('TODO : discart()');
  }

  onSubmit(){
    this.toModel();
    console.log(this.product);

    if(this.isCreate){
      const saveProduct$: Subscription = this.productService.save(this.product).subscribe(data => {
        this.router.navigate(['/products/lista']);
      });
      this.subscriptions$.push(saveProduct$);
    }
    else {
      const updateProduct$: Subscription = this.productService.update(this.product).subscribe(data => {
        this.router.navigate(['/products/lista']);
      });
      this.subscriptions$.push(updateProduct$);
    }
    
  }

  toModel(){
    this.product.discountPercentage = null;
    this.product.isSale = false;
    this.product.barcode = this.getBarCode.value;
    this.product.title = this.getTitle.value;
    this.product.description = this.getDescription.value;
    this.product.isNew = this.isNew.value;
    this.product.isCapacityQty = this.isCapQty.value;
    this.product.isActive = this.isActive.value;
    this.product.brand = this.brandList.find(b => b.idBrand == Number(this.getBrand.value));
    this.product.collection = this.collectionList.find(c => c.idCollection == Number(this.getCollection.value));

    if(this.product.currentBasePrice == undefined || this.product.currentBasePrice == null || this.product.currentBasePrice <= 0){
      this.product.currentBasePrice = 0;
    }
    if(this.product.currentTotalPrice == undefined || this.product.currentTotalPrice == null || this.product.currentTotalPrice <= 0){
      this.product.currentTotalPrice = 0;
    }

    this.product.tags = [];
    for(let value of this.getTags.value){
      if(value != false){
        this.product.tags.push(this.tagList.find(t => t.idTag == Number(value) ));
      }
    }

    this.product.categories = [];
    this.product.categories.push(this.categoryList.find(c => c.idCategory ==  Number(this.getCategory.value) ));

    this.product.stock = Number(this.getStock.value);
    if(this.product.stock <= 0){
      this.product.stock = null;
    }

    if(this.product.categories[0].catalogue.idCatalogue == CataloguesEnum.tortas){
      this.product.isCapacityQty = true;
    }
    else {
      this.product.isCapacityQty = false;
    }

    this.product.variants = [];
    for(let i = 0; this.getVariants.controls.length > i; i++){
      let variant: Variant = {};
      variant.options = [];
      variant.sku = null;
      variant.basePriceAmount = Number(this.getVariants.controls[i].get('priceAmount').value);
      if(this.product.isCapacityQty){
        variant.clientsCapacity = Number(this.getVariants.controls[i].get('unit').value);
        variant.unitQuantity = null;
      }
      else {
        variant.clientsCapacity = null;
        variant.unitQuantity = Number(this.getVariants.controls[i].get('unit').value);
      }
      this.product.variants.push(variant);
    }

    let currentIndex: number = null;
    let minorPrice: number = null;
    for(let i = 0; this.product.variants.length > i; i++) {
      if(minorPrice == null || this.product.variants[i].basePriceAmount < minorPrice){
        currentIndex = i;
        minorPrice = this.product.variants[i].basePriceAmount;
      }
    }
    for(let i = 0; this.product.variants.length > i; i++) {
      if(i == currentIndex){
        this.product.variants[i].isSelected = true;
      }
      else {
        this.product.variants[i].isSelected = false;
      }
    }

    this.product.options = [];

    // if(this.isCreate){
    //   let variant: Variant = {};
    //   variant.basePriceAmount = Number(this.getPrice.value);
    //   variant.options = [];
    //   variant.clientsCapacity = null;
    //   variant.sku = null;
    //   variant.unitQuantity = null;
    //   this.product.variants = [];
    //   this.product.variants.push(variant);
    // }
    // else {
    //   this.product.variants[0].basePriceAmount = Number(this.getPrice.value);
    //   this.product.variants[0].options = [];
    //   this.product.variants[0].clientsCapacity = null;
    //   this.product.variants[0].sku = null;
    //   this.product.variants[0].unitQuantity = null;
    // }
    
  }

  toForm(){
    this.setBarCode = this.product.barcode != null ? this.product.barcode : null;
    this.setTitle = this.product.title;
    this.setDescription = this.product.description;
    this.setNew = this.product.isNew;
    this.setCapQty = this.product.isCapacityQty;
    this.setActive = this.product.isActive;
    this.setBrand = this.product.brand != null ? this.product.brand.idBrand : null;
    this.setCollection = this.product.collection != null ? this.product.collection.idCollection : null;
    this.setCategory = this.product.categories[0].idCategory;
    //this.setPrice = this.product.variants[0].basePriceAmount;
    this.setStock = this.product.stock != null ? this.product.stock : 0;

    const checkArray: FormArray = this.form.get('tags') as FormArray;
    if(this.product.tags != null && this.product.tags != undefined){
      for(let tag of this.product.tags){
        checkArray.push(new FormControl(tag.idTag));
      }
      for(let item of this.product.tags){
        let tag = this.tagList.find(t => t.idTag == item.idTag);
        tag.isSelected = true;
      }
    }

    if(this.product.images != null && this.product.images.length >= 1){
      this.imagePreviewUrl = this.product.images[0].src;
    }

    for(let i = 0; this.product.variants.length > i; i++){
      const control = <FormArray>this.form.controls['variants'];
      control.push(this.initVariant());
      if(this.product.isCapacityQty){
        this.getVariants.controls[i].get('unit').setValue(Number(this.product.variants[i].clientsCapacity));
      }
      else {
        this.getVariants.controls[i].get('unit').setValue(Number(this.product.variants[i].unitQuantity));
      }
      this.getVariants.controls[i].get('priceAmount').setValue(this.product.variants[i].basePriceAmount);
    }
  }

  // onCheckboxChange2(e) {
  //   const checkArray: FormArray = this.form.get('tags') as FormArray;
  
  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }

  get getBarCode() { return this.form.get('barcode'); }
  get getTitle() { return this.form.get('title'); }
  get getDescription() { return this.form.get('description'); }
  get isNew() { return this.form.get('isNew'); }
  //get getDiscount() { return this.form.get('discountPercentage'); }
  get isCapQty() { return this.form.get('isCapacityQty'); }
  get isActive() { return this.form.get('isActive'); }
  get getBrand() { return this.form.get('selectBrand'); }
  get getCollection() { return this.form.get('selectCollection'); }
  get getCategory() { return this.form.get('selectCategory'); }
  get getTags() { return <FormArray>this.form.get('tags'); }
  //get getPrice() { return this.form.get('price'); }
  get getStock() { return this.form.get('stock'); }
  get getVariants() { return <FormArray>this.form.get('variants'); }

  set setBarCode(value: string) { this.form.get('barcode').setValue(value); }
  set setTitle(value: string) { this.form.get('title').setValue(value); }
  set setDescription(value: string) { this.form.get('description').setValue(value); }
  set setNew(value: boolean) { this.form.get('isNew').setValue(value); }
  set setCapQty(value: boolean) { this.form.get('isCapacityQty').setValue(value); }
  set setActive(value: boolean) { this.form.get('isActive').setValue(value); }
  set setBrand(value: number) { this.form.get('selectBrand').setValue(value); }
  set setCollection(value: number) { this.form.get('selectCollection').setValue(value); }
  set setCategory(value: number) { this.form.get('selectCategory').setValue(value); }
  // TODO set Tags
  //set setPrice(value: number) { this.form.get('price').setValue(value); }
  set setStock(value: number) { this.form.get('stock').setValue(value); }

}
