import { Injectable } from "@angular/core";
import {
    AngularFireStorage,
    AngularFireUploadTask,
    AngularFireStorageReference
} from "@angular/fire/storage";
import { NotificationService } from "./../services/notification.service";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { finalize, tap, takeUntil } from "rxjs/operators";
import firebase from "firebase/app";

@Injectable()
export class FileManagerService {
    destroy = new Subject<any>();

    private _cancelled: boolean = false;

    // _collection: string = "uploads/featured_images";
    private _collection: string = "uploads";

    // Main task
    private _task: AngularFireUploadTask;
    task = new BehaviorSubject<AngularFireUploadTask>(null);

    // Progress monitoring
    private _percentage = new BehaviorSubject(0);
    percentage: Observable<number> = this._percentage.asObservable();

    snapshot: Observable<firebase.storage.UploadTaskSnapshot>;

    // Download URL
    private _downloadURL = new BehaviorSubject<string>("");
    downloadURL: Observable<string> = this._downloadURL.asObservable();

    constructor(
        private _st: AngularFireStorage,
        private _ntf: NotificationService
    ) {}

    upload(file: File, path?: string) {
        this._cancelled = false;
        this._downloadURL.next("");
        // The storage path
        path =
            path || `${this._collection}/${new Date().getTime()}_${file.name}`;

        // Document Reference
        let fileRef: AngularFireStorageReference = this._st.ref(path);

        // The main _task
        this._task = this._st.upload(path, file);
        this.task.next(this._task);

        this._task.catch(_ => {
            this._cancelled = true;
            this._percentage.next(0);
        });

        // Progress monitoring
        this._task
            .percentageChanges()
            .pipe(takeUntil(this.destroy))
            .subscribe(pct => this._percentage.next(pct));

        this.snapshot = this._task.snapshotChanges().pipe(
            // The file's download URL
            finalize(async () => {
                const url = await fileRef.getDownloadURL().toPromise();
                this._downloadURL.next(url);
            })
        );
    }

    // Determines if the upload task is active
    isActive(snapshot) {
        // return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
        return snapshot.state === "running" || snapshot.state === "paused";
    }

    // Determines if the upload task is cancelled
    get isCancelled() {
        return this._cancelled;
    }

    // Determines if the upload task is finished
    isFinished(snapshot) {
        return snapshot.bytesTransferred === snapshot.totalBytes;
    }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    delete(fileName: string, path: string): Promise<any> {
        const storageRef = firebase.storage().ref();
        return storageRef.child(`${path}/${fileName}`).delete();
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
