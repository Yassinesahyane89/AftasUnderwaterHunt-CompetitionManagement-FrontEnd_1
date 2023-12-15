import { Component, OnInit } from '@angular/core';
import {MemberService} from "../member.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {LevelListService} from "../../level/level-list/level-list.service";

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {

    public contentHeader: object;

    public name = "";
    public familyName = "";
    public nationality = "";
    selectedIdentityDocumentType: ""

  constructor(
        private router: Router,
        private _memberService: MemberService,
        private _levelListService: LevelListService,
    ) { }

  submit(form) {
      if (form.valid){
        this._memberService.AddRow({ name: this.name, familyName: this.familyName, nationality: this.nationality, identityDocumentType: this.selectedIdentityDocumentType })
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
                this.familyName = '';
                this.nationality = '';
                this.selectedIdentityDocumentType = '';

                // redirect to list page /member/list
                this.router.navigate(['/member/list']).then(r => console.log(r));

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
                }else if (error && error.error ) {
                   const validationErrors = error.error;

                   Object.keys(validationErrors).forEach(prop => {
                       const formControl = form.controls[prop];
                       if (formControl) {
                           // activate the error message
                           formControl.setErrors({
                               serverError: validationErrors[prop]
                           });
                       }
                   });
                }
            });
        }
      }

  ngOnInit(): void {
      this.contentHeader = {
          headerTitle: 'Member Add',
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
                      name: 'Member',
                      isLink: true,
                      link: '/member/list'
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
