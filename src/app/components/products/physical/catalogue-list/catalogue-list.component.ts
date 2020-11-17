import { CatalogueService } from './../../../../core/services/catalogue.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Catalogue } from 'src/app/shared/models/catalogue.model';

@Component({
    selector: 'app-catalogue-list',
    templateUrl: './catalogue-list.component.html',
    styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit, OnDestroy {

    public catalogueList: Catalogue[] = [];
    public subscriptions$: Subscription[] = [];

    constructor(
        private catalogueService: CatalogueService
    ){
        const findAllCatalogues$: Subscription = this.catalogueService.findAll().subscribe(data => {
            this.catalogueList = data as Catalogue[];
        });
        this.subscriptions$.push(findAllCatalogues$);
    }

    ngOnInit(){}

    ngOnDestroy(){
        this.subscriptions$.forEach(el => el.unsubscribe());
    }

    onCreateConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere crear este item?')){
            let catalogue: Catalogue = event.newData;
            console.log(catalogue);
            const edit$: Subscription = this.catalogueService.save(catalogue).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onEditConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere modificar este item?')) {
            let catalogue: Catalogue = event.newData;
            console.log(catalogue);
            const edit$: Subscription = this.catalogueService.update(catalogue).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    
    onDeleteConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere eliminar este item?')) {
            let id = event.data.idCatalogue;
            const delete$: Subscription = this.catalogueService.deleteById(id).subscribe();
            this.subscriptions$.push(delete$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    public settings = {
        actions: { position: 'right' },
        add: { confirmCreate: true },
        delete: { confirmDelete: true },
        edit: { confirmSave: true },
        columns: {
            catalogueName: {
                title: 'Nombre',
                type: 'text',
                filter: false
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
    }

}