import { Component,  Input } from '@angular/core';

@Component({
    selector: 'fab-edit-post',
    template: `
    <a mat-fab [routerLink]="['/posts/', id,'edit']" class="mat-fab-bottom-right">
        <mat-icon aria-label="edit post">edit</mat-icon>
    </a>
  `,
    styles: [`
        .mat-fab-bottom-right {
            top: auto !important;
            right: 1.5rem !important;
            bottom: 1.5rem !important;
            left: auto !important;
            position: fixed !important;
        }
    `]
})
export class FabEditPostComponent {
    @Input() id;
}
