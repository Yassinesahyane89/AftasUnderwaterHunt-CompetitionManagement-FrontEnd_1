import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService implements Resolve<any> {
    public rows: any;
    public onCompetitionListChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

  constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onCompetitionListChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      return new Promise<void>((resolve, reject) => {
        Promise.all([this.getDataTableRows()]).then(() => {
          resolve();
        }, reject);
      });
    }

    /**
     * Get rows
     */

    getDataTableRows(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(environment.competitionsUrl).subscribe((response: any) => {
          this.rows = response;
          this.onCompetitionListChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
      });
    }

    /**
     * Add row
     *
     * @param row
     */

    AddRow(row): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.post(environment.competitionsUrl, row).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }

    /**
     * get row by id
     *
     * @param row
     */

    getRow(row): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(environment.competitionsUrl + '/' + row.id).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }

    /**
     * update row
     *
     * @param row
     */

    updateRow(row): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.put(environment.competitionsUrl + '/' + row.id, row).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }

    /**
     * delete row
     *
     * @param row
     */

    deleteRow(row): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.delete(environment.competitionsUrl + '/' + row.id).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }
}
