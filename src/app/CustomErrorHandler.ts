import {ErrorHandler, inject, Injectable, Injector, NgZone, runInInjectionContext} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {ErrorComponent} from "./error.component";

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {
    readonly ngZone = inject(NgZone);
    private injector = inject(Injector);

    private lastTime: number = 0;

    handleError(e: any): void {
        const now = Date.now();
        const diff = now - this.lastTime;
        //console.log(`diff=${diff}  now=${now} lastTime=${this.lastTime} constructorName=${e.constructor.name}`);

        // if(diff < 2000) {
        //     //navigation nastiness bugs can cause below code to cause more errors which
        //     //bubble back to this block again resulting in cycle so cut the cycle here
        //     //console.error("Solve above error that occurred above all these logs");
        //
        //     //not quite working.....  not sure how to override.
        //     //we lose logs when using window.location.href = '/500-error'; but at least it works better!!
        //     // Delay the retrieval of the NavService -> Router to avoid cyclic dependency errors
        //     //IN GENERAL, NOT WORKING redirecting EVERY TIME!!!
        //     // const router1 = this.injector.get(Router);
        //     // const targetOfCurrentNavigation = router1. getCurrentNavigation()?.finalUrl;
        //     // router1.navigate(['/500-error'], { browserUrl: targetOfCurrentNavigation });
        //
        //     return; //do nothing but log this one
        // }
        this.lastTime = now;

        console.error("Error.  Biltup Global Error Handler:", e);
        if(!(e instanceof Error)) {
            console.error("Someone throwing a bad error type="+e);
        }

        // Delay the retrieval of the NavService and Router to avoid cyclic dependency errors
        const router = this.injector.get(Router);
        //const url = svc.getLastAttemptedUrl();

        let title;
        let message;

        if(e instanceof TypeError && e.message === "Failed to fetch") {
            title = 'Network Issues';
            message = 'Please check your network connection';
        } else if(e instanceof Error) {
            title = 'Client Bug';
            message = 'You encountered a client bug.  Refresh your browser and try again';
        } else {
            //this is very very bad. no stack trace
            title = 'Client Bug';
            message = 'You encountered a client bug(code: 4560)';
        }


        //This is not working and results in infinite bug reporting...
        //
        // const dialog = this.injector.get(MatDialog);
        //
        // this.ngZone.run(() => {
        //     console.log("ng zone running");
        //     dialog.open(ErrorComponent, {
        //         data: { title: title, message: message  }
        //     });
        // });

        //huge IMPORTANT piece not firing in one special case...
        //this.sentryErrorHandler.handleError(e);
    }

}
