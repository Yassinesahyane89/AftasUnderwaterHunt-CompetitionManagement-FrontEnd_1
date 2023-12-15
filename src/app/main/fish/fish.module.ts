import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";

import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { CoreSidebarModule } from "@core/components";

// fish
import  { FishAddComponent} from "./fish-add/fish-add.component";
import { FishEditComponent } from "./fish-edit/fish-edit.component";
import { FishListComponent } from "./fish-list/fish-list.component";
import {FishService} from "./fish.service";

// routing
const routes: Routes = [
    {
        path: "list",
        component: FishListComponent,
        data: { animation: "FishListComponent" },
    },
    {
        path: "add",
        component: FishAddComponent,
        data: { animation: "FishAddComponent" },
    },
    {
        path: "edit/:id",
        component: FishEditComponent,
        data: { animation: "FishEditComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
];

@NgModule({
    declarations: [FishAddComponent, FishEditComponent, FishListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        ContentHeaderModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        CorePipesModule,
        CoreDirectivesModule,
        CoreSidebarModule,
    ],
    providers: [FishService],
})
export class FishModule {}
