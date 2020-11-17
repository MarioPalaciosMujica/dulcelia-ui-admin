import { TagService } from './../../../../core/services/tag.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag.model';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit, OnDestroy {

    public tagList: Tag[] = [];
    public subscriptions$: Subscription[] = [];

    constructor(
        private tagService: TagService
    ){
        const findAllTags$: Subscription = this.tagService.findAll().subscribe(data => {
            this.tagList = data as Tag[];
        });
        this.subscriptions$.push(findAllTags$);
    }

    ngOnInit(){}

    ngOnDestroy(){
        this.subscriptions$.forEach(el => el.unsubscribe());
    }

    onCreateConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere crear este item?')){
            let tag: Tag = event.newData;
            console.log(tag);
            const edit$: Subscription = this.tagService.save(tag).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onEditConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere modificar este item?')) {
            let tag: Tag = event.newData;
            console.log(tag);
            const edit$: Subscription = this.tagService.update(tag).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    
    onDeleteConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere eliminar este item?')) {
            let id = event.data.idTag;
            const delete$: Subscription = this.tagService.deleteById(id).subscribe();
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