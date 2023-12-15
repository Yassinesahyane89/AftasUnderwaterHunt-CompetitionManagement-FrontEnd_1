import { Component, OnInit } from '@angular/core';
import {FishService} from "../fish.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {LevelListService} from "../../level/level-list/level-list.service";
@Component({
  selector: 'app-fish-add',
  templateUrl: './fish-add.component.html',
  styleUrls: ['./fish-add.component.scss']
})
export class FishAddComponent implements OnInit {

    public contentHeader: object;

    public name = "";
    public weight : number;
    public levelId : number;
    public levelOptions: { id: number, description: string }[] = [];
    public selectedLevelId: number=4;


    constructor(
        private router: Router,
        private _fishService: FishService,
        private _levelListService: LevelListService,
    ) { }

    submit(form) {
        if (form.valid) {
            this._fishService.AddRow({ name: this.name, weight: this.weight, level_id: this.selectedLevelId })
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
                    this.weight = null;
                    this.levelId = null;
                    this.selectedLevelId = null;
                    // redirect to list page /fish/list
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
                                control.setErrors({
                                    serverError: validationErrors[key],
                                });
                            }
                        });
                    }
                });
        }
    }

    ngOnInit(): void {
        this._levelListService.getDataTableRows().then((response : any) => {
            // get description frrm all levels
            this.levelOptions = response.data.map((level: any) => ({
                id: level.id,
                description: level.description
            }));
        });

        this.contentHeader = {
            headerTitle: 'Fish Add',
            actionButton: false,
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
                        name: 'Add',
                        isLink: false,
                        link: '/'
                    }
                ]
            }
        };
    }

}
