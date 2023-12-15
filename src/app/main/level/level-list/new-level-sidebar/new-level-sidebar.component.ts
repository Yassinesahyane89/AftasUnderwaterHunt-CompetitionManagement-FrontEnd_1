import { Component, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import {LevelListService} from "../level-list.service";
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: "app-new-level-sidebar",
  templateUrl: "./new-level-sidebar.component.html",
})
export class NewLevelSidebarComponent implements OnInit {
  // Public
  public description = "";
  public point : number;

  constructor(
      private _levelListService: LevelListService,
      private _coreSidebarService: CoreSidebarService) {}

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  submit(form) {
    if (form.valid) {
      this.toggleSidebar('new-level-sidebar');
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

            setTimeout(() => {
              this.toggleSidebar('new-level-sidebar');
            }, 500);
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
              this.toggleSidebar('new-level-sidebar');

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


  ngOnInit(): void {}
}
