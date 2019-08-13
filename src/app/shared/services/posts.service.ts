import { Injectable } from "@angular/core";
import {
    AngularFirestoreCollection,
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";
import { FirebaseStorageError } from "@firebase/storage/dist/src/implementation/error";
import { AngularFireAuth } from "@angular/fire/auth";
import { NotificationService } from "./../services/notification.service";
import { empty as observableEmpty, Observable, from } from "rxjs";
import { catchError, map, flatMap, concat, take } from "rxjs/operators";
import { Post } from "@app/models/post";
import * as firebase from "firebase/app";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";

@Injectable()
export class PostsService {
    userId: string;
    private readonly delayUrl =
        "http://slowwly.robertomurray.co.uk/delay/8000/url/";
    posts$: Observable<Post[]>;
    postsCollection: AngularFirestoreCollection<Post>;
    postsDoc: AngularFirestoreDocument<Post>;

    constructor(
        private _fb: FormBuilder,
        private _afAuth: AngularFireAuth,
        private _db: AngularFirestore,
        private _ntf: NotificationService
    ) {
        this._afAuth.authState.pipe(take(1)).subscribe(user => {
            if (user && user != undefined) {
                this.userId = user.uid;
                // this.postsCollection = this._db
                //     .collection('posts', ref => ref.where('uid','==',user.uid).orderBy('created_at', 'asc'));
                this.postsCollection = this._db.collection("posts", ref =>
                    ref.orderBy("created_at", "asc")
                );

                this.posts$ = this.postsCollection.valueChanges();
            }
        });
    }

    get form(): FormGroup {
        const postForm = this._fb.group({
            id: [""],
            title: ["", [Validators.required]],
            content: ["", Validators.required],
            featured_image: ["", [CustomValidators.url]],
            tags: this._fb.array([])
        });

        return postForm;
    }

    list(): Observable<any> {
        return this.postsCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Post;
                    data.id = a.payload.doc.id;
                    return data;
                });
            }),
            catchError(this.errorHandler)
        );
    }

    async create(post: Post): Promise<void> {
        post.uid = this.userId;
        post.createdAt = this.timestamp;
        post.id = this._db.createId();

        try {
            await this._db.doc(`posts/${post.id}`).set(post);
            this._ntf.open("toast.post.created", "toast.close");
        } catch (error) {
            this.errorHandler(error);
        }
    }

    read(id: string): Observable<Post> {
        const postDoc = this._db.doc<Post>(`posts/${id}`);

        return postDoc.snapshotChanges().pipe(
            map(snap => {
                if (!snap.payload.exists) return;

                return {
                    id: snap.payload.id,
                    // doc: snap.payload,
                    ...(snap.payload.data() as Post)
                };
            }),
            catchError(this.errorHandler)
        );
    }

    async update(post: Post): Promise<void> {
        const postDoc = this._db.doc<Post>(`posts/${post.id}`);

        try {
            await postDoc.update(post);
            this._ntf.open("toast.post.updated", "toast.close");
        } catch (error) {
            this.errorHandler(error);
        }
    }

    delete(id, fileName?): Observable<void> {
        return this.read(id).pipe(
            flatMap(post => {
                const file = post ? post.featured_image : "";
                return this.deleteFromStorage(file);
            }),
            concat(this.deleteFromDB(id)),
            catchError(this.errorHandler)
        );
    }

    // Delete post from Storage
    private deleteFromStorage(fileName: string): Observable<any> {
        const storageRef = firebase.storage().ref();
        return from(
            storageRef
                .child(`uploads/${fileName}`)
                .delete()
                .catch((error: FirebaseStorageError) =>
                    console.log("error:_ ", error.code)
                )
        );
    }

    // Delete image from Database
    private deleteFromDB(id: string): Observable<void> {
        const postDoc = this._db.doc<Post>(`posts/${id}`);
        return from(
            postDoc
                .delete()
                .catch((error: FirebaseStorageError) =>
                    console.log("error:_ ", error.code)
                )
        );
    }

    private get timestamp() {
        // return firestore.FieldValue.serverTimestamp();
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    private errorHandler(error: any) {
        console.log("error: ", error);
        this._ntf.open("toast.firebase." + error.message, "toast.close");
        return observableEmpty();
    }
}
