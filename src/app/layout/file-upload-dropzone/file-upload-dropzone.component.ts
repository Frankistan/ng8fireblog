import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileManagerService, NotificationService } from '@app/shared';
import { ImageValidator } from '@app/shared/validators/image.validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// SOURCE: https://github.com/angular/angularfire2/issues/1649
// https://github.com/angular/angularfire2/issues/1463

@Component({
    selector: 'file-upload-dropzone',
    templateUrl: './file-upload-dropzone.component.html',
    styleUrls: ['./file-upload-dropzone.component.scss']
})
export class FileUploadDropzoneComponent implements OnInit, OnDestroy {
    @ViewChild('fileInput',{static: false}) fileInput;

    uploadForm: FormGroup;

    destroy = new Subject<any>();

    task: AngularFireUploadTask;

    // State for dropzone CSS toggling
    isHovering: boolean;

    constructor(
        private _fb: FormBuilder,
        private _cdr: ChangeDetectorRef,
        private _ntf: NotificationService,
        public fmSVC: FileManagerService,
    ) { }

    ngOnInit(): void {
        this.uploadForm = this._fb.group({
            'image': ['', [
                // ImageValidator.imageSizeValidator(100000),
                ImageValidator.imageExtensionValidator(['image/jpg', 'image/jpeg', 'image/png'])]
            ]
        });
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(event) {

        // The File object
        let file = event.item(0);
        this.uploadForm.controls['image'].setValue(file);
        this._cdr.detectChanges();

        if (this.uploadForm.status == "INVALID") {
            this._ntf.open('validation.file-not-supported');
            return;
        }

        this.fmSVC.upload(file);

        this.fmSVC.task
            .pipe(takeUntil(this.destroy))
            .subscribe(t => this.task = t);
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
