import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LevelListService} from "../../level/level-list/level-list.service";
import {FishService} from "../fish.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-fish-edit',
  templateUrl: './fish-edit.component.html',
  styleUrls: ['./fish-edit.component.scss']
})
export class FishEditComponent implements OnInit {
    public contentHeader: object;
    public fishId: number;
    public name: string;
    public description: string;
    public weight: number;
    public levelId: number;
    public levelOptions: { id: number, description: string }[] = [];
    public selectedLevelId: number;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fishService: FishService,
        private _levelListService: LevelListService,
    ) { }


  submit(form) {
        if (form.valid) {
          this.fishService.updateFish({
            id: this.fishId,
            name: this.name,
            description: this.description,
            weight: this.weight,
            levelId: this.selectedLevelId
          })
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
                this.name = '';
                this.description = '';
                this.weight = null;
                this.levelId = null;
                // redirect to list page /level/list
                this.router.navigate(['/fish/list']).then(r => console.log(r));

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
                      control.setErrors({serverError: validationErrors[key].join(', ')});
                    }
                  });
                }
              });

        }
    }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.fishService.getFishById(id).then((response: any) => {
          this.fishId = response.data.id;
          this.name = response.data.name;
          this.description = response.data.description;
          this.weight = response.data.weight;
          this.levelId = response.data.level.id;
            this.selectedLevelId = response.data.level.id;
        });


          // Fetch level options
      this._levelListService.getDataTableRows().then((response : any) => {
          // get description frrm all levels
          this.levelOptions = response.data.map((level: any) => ({
              id: level.id,
              description: level.description
          }));
      });

        this.contentHeader = {
          headerTitle: 'Edit Fish',
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
                name: 'Fish',
                isLink: true,
                link: '/fish/list'
              },
              {
                name: 'Edit Fish',
                isLink: false,
                link: '/'
              }
            ]
          }
        };
  }

}
