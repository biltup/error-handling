import {Component, inject, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {FetchResponse} from "../SomeApi";
import {FetchService} from "../fetch.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    imports: [
    ],
    selector: 'trainer-proposal-page',
    standalone: true,
    templateUrl: './propose.component.html',
})
export class ProposeComponent implements OnInit, OnDestroy {

    private _fetchSvc = inject(FetchService);

    title = 'error-handling';
    response?: FetchResponse;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit(): void {
        this._fetchSvc.listResponse$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: FetchResponse) => {
                throw new Error("this error is hidden while if you comment this and throw below one, it works");
                this.response = data;
                //throw new Error("this error works and renders custom error handler popup dialogue");
            });

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}