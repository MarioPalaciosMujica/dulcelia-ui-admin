import { CatalogueService } from './../../../../core/services/catalogue.service';
import { CategoryService } from './../../../../core/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
//import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category.model';
import { Catalogue } from 'src/app/shared/models/catalogue.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public closeResult: string;
  //public categories = []

  public category: Category = {};
  public categoryList: Category[] = [];
  public catalogueList: Catalogue[] = [];
  public catalogueOptions: any[] = [];
  private subscriptions$: Subscription[] = [];

  public form: FormGroup;

  public settings = {
    add: { confirmCreate: true },
    delete: { confirmDelete: true },
    edit: { confirmSave: true },
    actions: { position: 'right' },
    columns: {
      name: {
        title: 'Categoría',
        type: 'text',
        filter: false
      },
      catalogue: {
        title: 'Catalogo',
        type: 'html',
        filter: false,
        valuePrepareFunction: (catalogue) => {
          return catalogue.catalogueName;
        },
        editor: {
          type: 'list',
          config: {
            list: []
          }
        }
      },
      created: {
        title: 'Creado',
        editable: false,
        filter: false
      },
      modified: {
        title: 'Modificado',
        editable: false,
        filter: false
      }
    }
  };

  constructor(
    private modalService: NgbModal, 
    private categoryService: CategoryService,
    private catalogueService: CatalogueService,
    private fb: FormBuilder
  ) {
    //this.categories = categoryDB.category;

    this.form = fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z \-\']+')
      ]],
      selectCatalogue: [null, [
        Validators.required
      ]]
    });

    // Categories
    const findAllCategories$: Subscription = this.categoryService.findAll().subscribe(data => {
      this.categoryList = data as Category[];
    });
    this.subscriptions$.push(findAllCategories$);

    // Catalogues
    const findAllCatalogues$: Subscription = this.catalogueService.findAll().subscribe(data => {
      this.catalogueList = data as Catalogue[];
      for(let cat of this.catalogueList){
        this.catalogueOptions = [...this.catalogueOptions, { value: cat.idCatalogue, title: cat.catalogueName }];
        this.settings.columns.catalogue.editor.config.list = this.catalogueOptions; 
        this.settings = Object.assign({},this.settings);
      }
    });
    this.subscriptions$.push(findAllCatalogues$);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(el => el.unsubscribe());
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onCreateConfirm(event){
    if (window.confirm('Esta seguro(a) que quiere crear este item?')){
        let idCatalogue: number = Number(event.newData.catalogue);
        let category: Category = event.newData;
        category.catalogue = this.catalogueList.find(c => c.idCatalogue == idCatalogue);
        const edit$: Subscription = this.categoryService.save(category).subscribe();
        this.subscriptions$.push(edit$);
        event.confirm.resolve();
    } else {
        event.confirm.reject();
    }
}

  onEditConfirm(event){
    if (window.confirm('Esta seguro(a) que quiere modificar este item?')) {
      let idCatalogue: number = Number(event.newData.catalogue);
      let category: Category = event.newData;
      category.catalogue = this.catalogueList.find(c => c.idCatalogue == idCatalogue);
      const edit$: Subscription = this.categoryService.update(category).subscribe();
      this.subscriptions$.push(edit$);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event){
    if (window.confirm('Esta seguro(a) que quiere eliminar este item?')) {
      let id = event.data.idCategory;
      const delete$: Subscription = this.categoryService.deleteById(id).subscribe();
      this.subscriptions$.push(delete$);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSubmit(){
    this.toModel();
    const saveCategory$: Subscription = this.categoryService.save(this.category).subscribe(save => {
      this.modalService.dismissAll();
    });
    this.subscriptions$.push(saveCategory$);
  }

  toModel(){
    this.category.name = this.getName.value;
    this.category.catalogue = this.catalogueList.find(el => el.idCatalogue == Number(this.getCatalogue.value));
  }

  get getName() { return this.form.get('name'); }
  get getCatalogue() { return this.form.get('selectCatalogue'); }

}
