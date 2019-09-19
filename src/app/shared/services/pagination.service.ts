import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, tap, take, takeUntil } from 'rxjs/operators';
import { Post } from '@app/models/post';
import * as moment from 'moment';

interface QueryConfig {
    collection: string, //  path to collection
    search?: string, // filter when searching
    filter:any ,
    limit: number, // limit per query
    orderBy: string, // field to orderBy
    prepend: boolean, // prepend to source?
    reverse: boolean, // reverse order?
}

@Injectable()
export class PaginationService {
    destroy = new Subject<any>();

    // Source data
    private _done = new BehaviorSubject(false);
    private _loading = new BehaviorSubject(false);
    private _data = new BehaviorSubject([]);

    private query: QueryConfig;

    // Observable data
    data: Observable<any>;
    done: Observable<boolean> = this._done.asObservable();
    loading: Observable<boolean> = this._loading.asObservable();

    constructor(private _db: AngularFirestore) { }

    // Initial query sets options and defines the Observable
    // passing opts will override the defaults
    init(collection: string, orderBy: string, opts?: any) {
        this.query = {
            collection,
            orderBy,
            filter: null,
            search: null,
            limit: 12,
            prepend: false,
            reverse: false,
            ...opts
        };

       

        const first = this._db.collection(this.query.collection, ref => {

            // let cRef:firebase.firestore.Query = ref;
            
            if (this.query.search) {
                return ref
                    .orderBy('title', 'asc')
                    .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                    .limit(this.query.limit)
                    .startAt(this.query.search)
                    .endAt(this.query.search + '\uf8ff');
            }

            if(this.query.filter && this.query.filter.author!=""){
                return ref
                .where("created_at",">=",this.query.filter.date.min || moment([2014, 0, 1]).unix() )
                .where("created_at","<=",this.query.filter.date.max || moment.now() )
                .where("author","==",this.query.filter.author)
                .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit);
            }
           
            return ref
                .where("created_at",">=",this.query.filter ? this.query.filter.date.min : moment([2014, 0, 1]).unix() )
                .where("created_at","<=",this.query.filter ? this.query.filter.date.max : moment.now() )
                .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit);
        });

        this.mapAndUpdate(first);

        // Create the observable array for consumption in components
        this.data = this._data.asObservable().pipe(
            scan((acc, val) => {
                return this.query.prepend ? val.concat(acc) : acc.concat(val);
            }));
    }


    // Retrieves additional data from firestore
    more() {
        const cursor = this.getCursor();

        const more = this._db.collection(this.query.collection, ref => {

            // let cRef:firebase.firestore.Query = ref;

            if (this.query.search) {
                return ref
                    .orderBy('title', 'asc')
                    .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                    .limit(this.query.limit)
                    .startAt(this.query.search)
                    .endAt(this.query.search + '\uf8ff')
                    .startAfter(cursor);
            }


            if(this.query.filter && this.query.filter.author!=""){
                return ref
                .where("created_at",">=",this.query.filter.date.min || moment([2014, 0, 1]).unix() )
                .where("created_at","<=",this.query.filter.date.max || moment.now() )
                .where("author","==",this.query.filter.author)
                .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit)
                .startAfter(cursor);
            }


            return ref
                .where("created_at",">=",this.query.filter ? this.query.filter.date.min : moment([2014, 0, 1]).unix() )
                .where("created_at","<=",this.query.filter ? this.query.filter.date.max : moment.now() )
                .orderBy(this.query.orderBy, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit)
                .startAfter(cursor);

        });

        this.mapAndUpdate(more);
    }

    // Reset the page
    reset() {
        this._data.next([]);
        this._done.next(false);
    }

    // Determines the doc snapshot to paginate query
    private getCursor() {

        const current = this._data.value
        if (current.length) {
            return this.query.prepend ? current[0].doc : current[current.length - 1].doc
        }
        return null;
    }


    // Maps the snapshot to usable format the updates source
    private mapAndUpdate(col: AngularFirestoreCollection<any>) {

        if (this._done.value || this._loading.value) { return };

        // loading
        this._loading.next(true);

        // Map snapshot with doc ref (needed for cursor)
        return col.snapshotChanges()
        .pipe(
            tap(arr => {
                let values = arr.map(snap => {
                    return {
                        id: snap.payload.doc.id,
                        doc: snap.payload.doc,
                        ...snap.payload.doc.data() as Post
                    };
                });


                // If prepending, reverse the batch order
                values = this.query.prepend ? values.reverse() : values;


                // update source with new values, done loading
                this._data.next(values);
                this._loading.next(false);

                // no more values, mark done
                if (!values.length) {
                    this._done.next(true);
                }
            }),
            take(1),
            takeUntil(this.destroy)
        )
        .subscribe();
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
