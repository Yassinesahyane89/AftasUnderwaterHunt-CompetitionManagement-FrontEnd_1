import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { MemberService } from '../member.service'
import {Router} from "@angular/router";
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MemberListComponent implements OnInit {
  // Public
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
        private router: Router,
        private _memberService: MemberService,
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

  ngOnInit(): void {
    this._memberService.getDataTableRows();

    this._memberService.onMemberListChanged
        .pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response.data;
            this.tempData = this.rows;
        });
  }

  EditMember(row){
    let id = row.id;
    this.router.navigate(['/member/edit', id]);
  }

}
