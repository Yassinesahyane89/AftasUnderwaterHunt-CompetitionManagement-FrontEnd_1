import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { FishService } from 'app/main/fish/fish.service';

@Component({
  selector: 'app-fish-list',
  templateUrl: './fish-list.component.html',
  styleUrls: ['./fish-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FishListComponent implements OnInit {
    // Public
    public rows: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public searchValue = '';
    private tempData = [];
    private _unsubscribeAll: Subject<any>;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
        private router: Router,
        private _fishService: FishService
    ) {
        this._unsubscribeAll = new Subject();
    }

    filterUpdate(event) {
        const val = event.target.value.toLowerCase();
        this.rows = this.tempData.filter((d: any) => {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.table.offset = 0;
    }
  ngOnInit(): void {
    this._fishService.getDataTableRows();

    this._fishService.onFishListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response.data;
            this.tempData = this.rows;
        });
  }

    EditFish(row: any) {
        this.router.navigate(['/fish/edit', row.id]);
    }

}
