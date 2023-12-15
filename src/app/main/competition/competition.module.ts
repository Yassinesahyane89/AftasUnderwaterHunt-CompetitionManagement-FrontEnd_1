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

// competition
import  { CompetitionAddComponent} from "./competition-add/competition-add.component";
import { CompetitionEditComponent } from "./competition-edit/competition-edit.component";
import { CompetitionListComponent } from "./competition-list/competition-list.component";
import {CompetitionService} from "./competition.service";

// routing
const routes: Routes = [
    {
        path: "list",
        component: CompetitionListComponent,
        data: { animation: "FishListComponent" },
    },
    {
        path: "add",
        component: CompetitionAddComponent,
        data: { animation: "FishAddComponent" },
    },
    {
        path: "edit/:id",
        component: CompetitionEditComponent,
        data: { animation: "FishEditComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
];

@NgModule({
    declarations: [CompetitionAddComponent, CompetitionEditComponent, CompetitionListComponent],
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
    providers: [CompetitionService],
})
export class CompetitionModule {}
