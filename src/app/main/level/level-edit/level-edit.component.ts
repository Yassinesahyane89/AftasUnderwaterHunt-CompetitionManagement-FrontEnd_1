import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LevelListService} from "../level-list/level-list.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.scss']
})
export class LevelEditComponent implements OnInit {
  public contentHeader: object;
  public levelId: number;
  public description: string;
  public point: number;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private levelListService: LevelListService,
  ) { }

  submit(form) {
    if (form.valid) {
      this.levelListService.updateLevel({id: this.levelId, description: this.description, point: this.point})
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
            }
          });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.levelListService.getLevelById(id).then((response: any) => {
      this.levelId = response.data.id;
      this.description = response.data.description;
      this.point = response.data.point;
    });

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
