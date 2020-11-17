import { CollectionService } from './../../../../core/services/collection.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collection } from 'src/app/shared/models/collection.model';

@Component({
    selector: 'app-collection-list',
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit, OnDestroy {

    public collectionList: Collection[] = [];
    public subscriptions$: Subscription[] = [];

    constructor(
        private collectionService: CollectionService
    ){
        const findAllCollections$: Subscription = this.collectionService.findAll().subscribe(data => {
            this.collectionList = data as Collection[];
        });
        this.subscriptions$.push(findAllCollections$);
    }

    ngOnInit(){}

    ngOnDestroy(){
        this.subscriptions$.forEach(el => el.unsubscribe());
    }

    onCreateConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere crear este item?')){
            let collection: Collection = event.newData;
            console.log(collection);
            const edit$: Subscription = this.collectionService.save(collection).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onEditConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere modificar este item?')) {
            let collection: Collection = event.newData;
            console.log(collection);
            const edit$: Subscription = this.collectionService.update(collection).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    
    onDeleteConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere eliminar este item?')) {
            let id = event.data.idCollection;
            const delete$: Subscription = this.collectionService.deleteById(id).subscribe();
            this.subscriptions$.push(delete$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    public settings = {
        add: { confirmCreate: true },
        delete: { confirmDelete: true },
        edit: { confirmSave: true },
        actions: { position: 'right' },
        columns: {
            name: {
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