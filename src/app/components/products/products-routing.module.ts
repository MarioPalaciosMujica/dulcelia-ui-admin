import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { BrandListComponent } from './physical/brand-list/brand-list.component';
import { CatalogueListComponent } from './physical/catalogue-list/catalogue-list.component';
import { CollectionListComponent } from './physical/collection-list/collection-list.component';
import { TagListComponent } from './physical/tag-list/tag-list.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categorias',
        component: CategoryComponent,
        data: {
          title: "Categorías",
          breadcrumb: "Categorías"
        }
      },
      {
        path: 'marcas',
        component: BrandListComponent,
        data: {
          title: "Marcas",
          breadcrumb: "Marcas"
        }
      },
      {
        path: 'lista',
        component: ProductListComponent,
        data: {
          title: "Lista de Productos",
          breadcrumb: "Lista de Productos"
        }
      },
      {
        path: 'detalle',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        }
      },
      {
        path: 'editor',
        component: AddProductComponent,
        data: {
          title: "Editar Producto",
          breadcrumb: "Editar Producto"
        }
      },
      {
        path: 'editor/:id',
        component: AddProductComponent,
        data: {
          title: "Editar Producto",
          breadcrumb: "Editar Producto"
        }
      },
      {
        path: 'colecciones',
        component: CollectionListComponent,
        data: {
          title: "Colecciónes",
          breadcrumb: "Colecciónes"
        }
      },
      {
        path: 'catalogos',
        component: CatalogueListComponent,
        data: {
          title: "Catalogos",
          breadcrumb: "Catalogos"
        }
      },
      {
        path: 'etiquetas',
        component: TagListComponent,
        data: {
          title: "Etiquetas",
          breadcrumb: "Etiquetas"
        }
      },
      // {
      //   path: 'digital/digital-product-list',
      //   component: DigitalListComponent,
      //   data: {
      //     title: "Product List",
      //     breadcrumb: "Product List"
      //   }
      // },
      // {
      //   path: 'digital/digital-add-product',
      //   component: DigitalAddComponent,
      //   data: {
      //     title: "Add Products",
      //     breadcrumb: "Add Product"
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
