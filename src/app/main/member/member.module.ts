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

// member
import  { MemberAddComponent} from "./member-add/member-add.component";
import { MemberEditComponent } from "./member-edit/member-edit.component";
import { MemberListComponent } from "./member-list/member-list.component";

import {MemberService} from "./member.service";

// routing
const routes: Routes = [
    {
        path: "list",
        component: MemberListComponent,
        data: { animation: "FishListComponent" },
    },
    {
        path: "add",
        component: MemberAddComponent,
        data: { animation: "FishAddComponent" },
    },
    {
        path: "edit/:id",
        component: MemberEditComponent,
        data: { animation: "FishEditComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
];

@NgModule({
    declarations: [MemberAddComponent, MemberEditComponent, MemberListComponent],
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
    providers: [MemberService],
})
export class MemberModule {}
