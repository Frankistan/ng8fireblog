import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NotificationService } from "@app/shared";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: "app-upload-profile-image-dialog",
    templateUrl: "./upload-profile-image-dialog.component.html",
    styleUrls: ["./upload-profile-image-dialog.component.css"]
})
export class UploadProfileImageDialog {
    imageChangedEvent: any = "";
    croppedImage: any = "";

    aspectRatio: number = 1 / 1;
    resizeToWidth: number = 256;
    show: boolean = false;

    constructor(
        private dialogRef: MatDialogRef<UploadProfileImageDialog>,
        private _ntf: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    fileChangeEvent($event: any): void {
        this.imageChangedEvent = $event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.data.file = event.file;
    }

    imageLoaded() {
        this.show = true;
        // show cropper
    }

    loadImageFailed() {
        this._ntf.open('toast.cropper.failed', 'toast.close');
    }
}
