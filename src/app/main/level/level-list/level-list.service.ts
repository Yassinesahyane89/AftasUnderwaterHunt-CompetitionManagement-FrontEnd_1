import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LevelListService  implements Resolve<any> {
  public rows: any;
  public onLevelListChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onLevelListChanged = new BehaviorSubject({});
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
      this._httpClient.get(environment.levelsUrl).subscribe((response: any) => {
        this.rows = response;
        this.onLevelListChanged.next(this.rows);
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
            this._httpClient.post(environment.levelsUrl, row).subscribe((response: any) => {
            resolve(response);
            }, reject);
        });
    }

    /**
     * get row by id
     *
     * @param row
     */

    getLevelById(rowId): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(`${environment.levelsUrl}/${rowId}`).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }

    /**
     * update row
     *
     * @param row
     */
    updateLevel(row): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.put(`${environment.levelsUrl}/${row.id}`, row).subscribe((response: any) => {
          resolve(response);
        }, reject);
      });
    }
}
