import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class CoreService {
    private _postId$: BehaviorSubject<string> = new BehaviorSubject("");
    postId: Observable<string> = this._postId$.asObservable();


    // darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isListView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearchOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
    language: BehaviorSubject<string> = new BehaviorSubject("es");
}
