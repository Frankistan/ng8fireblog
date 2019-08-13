import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '@app/layout/confirm-dialog/confirm-dialog.component';
import { FileManagerService, PostsService, NotificationService, I18nService } from '@app/shared';
import { Observable, Subject } from 'rxjs';
import { map, tap, takeUntil, finalize } from 'rxjs/operators';
import { Post } from '@app/models/post';
import { TinymceOptions } from 'ngx-tinymce';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
    private _changed: boolean = false;
    private _id: string;
    private _post: Post;
    private _saved: boolean = false;

    postForm: FormGroup;

	destroy = new Subject<any>();
	
	options:any= {	
		'language': this.i18n.language.slice(0,2)	
	};

    //chips
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    constructor(
        private _dlg: MatDialog,
        private _fb: FormBuilder,
        private _fmSVC: FileManagerService,
        public _postSVC: PostsService,
        private _route: ActivatedRoute,
		private _ntf: NotificationService,
		public i18n: I18nService,
    ) {
        this.createForm();

        this.postForm.valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe(val => {

                if (JSON.stringify(this._post) != JSON.stringify(val))
                    this._changed = true;
            });
    }

    ngOnInit() {

        this._fmSVC.task.pipe(map(task => {
            if(!task) 
            {this.postForm.controls['featured_image'].setValue("");
            return new Observable<firebase.storage.UploadTaskSnapshot>(null);}
            return task.snapshotChanges().pipe(
            tap((snap:any) => {
                this._fmSVC.downloadURL
                    .pipe(
                        takeUntil(this.destroy))
                    .subscribe(url => {
                        this.postForm.controls['featured_image'].setValue(url);
                    });
            }),
            // finalize( () => {
            //     this._fmSVC.downloadURL
            //         .pipe(
            //             takeUntil(this.destroy))
            //         .subscribe(url => {
            //             this.postForm.controls['featured_image'].setValue(url);
            //         });
            // }),
            takeUntil(this.destroy)
            ).subscribe();
        }),
        takeUntil(this.destroy)        
        ).subscribe();

        this._id = this._route.snapshot.params['id'];

        if (this._id) {
            this._postSVC.read(this._id).pipe(
                tap(post => {
                    if(post) {
                        this.postForm.patchValue(post || {});
                        this.postForm.setControl('tags', this._fb.array(post.tags || []));
                        this._changed = false;
                        this._saved = false;
                    }
                })
            )
            .pipe(takeUntil(this.destroy))
            .subscribe(post => this._post = post);
        }
    }

    private createForm() {
        this.postForm = this._postSVC.form;
        this.postForm.controls['featured_image'].setValue("");
        this._post = this.postForm.value;
    }

    private randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private opendDiscardDlg(): Observable<boolean> {
        let dialogRef = this._dlg.open(ConfirmDialog, {
            data: { answer: false, title: 'dialog.discard_changes' }
        });

        return dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            }));
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this._changed && !this._saved) {
            return this.opendDiscardDlg();
        } else {
            // this._core.isLoading.next(true);
            return true;
        }
    }

    get tags(): FormArray {
        return <FormArray>this.postForm.get('tags');
    }

    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our requirement
        if ((value || '').trim()) {
            this.tags.push(new FormControl({ id: this.randomIntFromInterval(1000, 9999), text: value.trim() }));
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeTag(index: number): void {

        if (index >= 0) {
            this.tags.removeAt(index);
        }
    }

    deleteImage($event: Event, url: string) {
        $event.preventDefault();

        if (url.search("https://firebasestorage.googleapis.com")) {
            this.postForm.controls['featured_image'].setValue("");
            return;
        }

        url = decodeURIComponent(url);
        const parts = url.split("?")[0].split("/");
        const fileName = parts[parts.length - 1];
        const path = "uploads";

        this._fmSVC.delete(fileName, path)
            .then(_ => {
                this.postForm.controls['featured_image'].setValue("");
            })
            .catch(err => {
                this._ntf.open('toast.firebase.' + err.code_, 'toast.close');
            });
    }

    save() {
        // console.log('image: ',this.postForm.controls['image'].value);
        if (this._id) {
            this._postSVC.update(this.postForm.value);
        } else {
            this._postSVC.create(this.postForm.value);
        }
        this._saved = true;
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
