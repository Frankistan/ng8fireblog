import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[autofocus]"
})
export class AutofocusDirective implements OnInit {
    // FUENTE: https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.elementRef.nativeElement.focus();
    }
}
