import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {LevelListService} from "../level-list/level-list.service";
import { RouterModule, Routes, Router } from "@angular/router";
import {CoreSidebarService} from "../../../../@core/components/core-sidebar/core-sidebar.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.scss']
})
export class LevelAddComponent implements OnInit {
  // public
  public contentHeader: object;

  public description = "";
  public point : number;
  constructor(
      private router: Router,
      private _levelListService: LevelListService
  ) { }

  submit(form) {
    if (form.valid) {
      this._levelListService.AddRow({ description: this.description, point: this.point })
          .then((response) => {
            // Handle success case
            Swal.fire({
              title: 'Good job!',
              text: response.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
            form.reset();
            this.description = '';
            this.point = null;
            // redirect to list page /level/list
            this.router.navigate(['/level/list']).then(r => console.log(r));

          })
          .catch((error) => {
            if (error && error.status && error.error && error.error.message) {
              Swal.fire({
                title: `Error (${error.status})`,
                text: error.error.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary'
                }
              });

            } else if (error && error.error) {
              const validationErrors = error.error;

              Object.keys(validationErrors).forEach((key) => {
                const control = form.controls[key];
                if (control) {
                  control.setErrors({ serverError: validationErrors[key].join(', ') });
                }
              });
              console.log(form.controls['description'].errors.serverError);

              // Reopen the modal with the entered data
              this.description = form.value['description'];
              this.point = form.value['point'];

            } else {
              Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong!',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary'
                }
              });
            }
          });
    }
  }

  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Add New Level',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Level',
            isLink: true,
            link: '/level/list'
          },
          {
            name: 'Add New Level',
            isLink: false
          }
        ]
      }
    };
  }

}
