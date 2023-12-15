import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { LevelListService } from 'app/main/level/level-list/level-list.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LevelListComponent implements OnInit {
  // Public
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private

  constructor(
      private router: Router,
      private _levelListService: LevelListService,
      private _coreSidebarService: CoreSidebarService,
  ) {
    this._unsubscribeAll = new Subject();
  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.rows = this.tempData.filter(function (d) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {
    this._levelListService.getDataTableRows();

  this._levelListService.onLevelListChanged
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        this.rows = response.data;
        this.tempData = this.rows;
      });
  }

    EditLevel(row:any): void {
    const levelId = row.id; // Assuming 'id' is the property that holds the level ID
    this.router.navigate([`/level/edit/${levelId}`]);
    }
}
