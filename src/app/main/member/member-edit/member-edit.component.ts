import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../member.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
    public contentHeader: object;
    public memberId: number;
    public name: string;
    public familyName: string;
    public nationality: string;
    public identityDocumentType: string;
    public selectedIdentityDocumentType: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
    ) { }

  submit(form) {
      if(form.valid){
         this.memberService.updateMember({
           id: this.memberId,
           name: this.name,
           familyName: this.familyName,
           identityDocumentType: this.selectedIdentityDocumentType,
         }).then((response) => {
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
                this.identityDocumentType = '';
                // redirect to list page /member/list
                this.router.navigate(['/member/list']).then(r => console.log(r));
             }).catch((error) => {
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
    this.memberService.getMemberById(id).then((response: any) => {
      this.memberId = response.data.id;
      this.name = response.data.name;
      this.nationality = response.data.nationality;
      this.familyName = response.data.familyName;
      this.identityDocumentType = response.data.identityDocumentType;
      this.selectedIdentityDocumentType = response.data.identityDocumentType;
    });

    this.contentHeader = {
      headerTitle: 'Member Edit',
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
            name: 'Member Edit',
            isLink: false,
            link: '/'
          }
        ]
      }
    };
  }

}
