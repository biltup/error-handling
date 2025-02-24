import {inject, Injectable} from "@angular/core";
import {FakeApi, FetchRequest, FetchResponse} from "./SomeApi";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";


@Injectable({ providedIn: 'root' })
export class FetchService {
    private myApi = inject(FakeApi);

    private _listResponse: ReplaySubject<FetchResponse> = new ReplaySubject<FetchResponse>(1);

    get listResponse$(): Observable<FetchResponse> {
        return this._listResponse.asObservable();
    }

    async fetchRemote(): Promise<FetchResponse> {
        const request = new FetchRequest();
        const response = await this.myApi.fetchRemote(request);
        //fire to all listeners...
        this._listResponse.next(response);
        return response;
    }
}