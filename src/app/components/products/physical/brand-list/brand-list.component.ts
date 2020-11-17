import { BrandService } from './../../../../core/services/brand.service';
import { Brand } from './../../../../shared/models/brand.model';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, OnDestroy {

    public brandlist: Brand[] = [];
    public subscriptions$: Subscription[] = [];

    constructor(
        private brandService: BrandService
    ){
        const findAllBrands$: Subscription = this.brandService.findAll().subscribe(data => {
            this.brandlist = data as Brand[];
        });
        this.subscriptions$.push(findAllBrands$);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscriptions$.forEach(el => el.unsubscribe());
    }

    onCreateConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere crear este item?')){
            let brand: Brand = event.newData;
            console.log(brand);
            const edit$: Subscription = this.brandService.save(brand).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onEditConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere modificar este item?')) {
            let brand: Brand = event.newData;
            console.log(brand);
            const edit$: Subscription = this.brandService.update(brand).subscribe();
            this.subscriptions$.push(edit$);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    
    onDeleteConfirm(event){
        if (window.confirm('Esta seguro(a) que quiere eliminar este item?')) {
            let id = event.data.idBrand;
            const delete$: Subscription = this.brandService.deleteById(id).subscribe();
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