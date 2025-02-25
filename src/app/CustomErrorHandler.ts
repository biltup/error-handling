import {ErrorHandler, inject, Injectable, Injector, NgZone, runInInjectionContext} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {ErrorComponent} from "./error.component";
import {LRUCache} from "typescript-lru-cache";

interface ErrorStruct {
    message?: string;
    timeReported?: number;
}

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {
    readonly ngZone = inject(NgZone);
    private injector = inject(Injector);

    private lastTime: number = 0;

    //prevent navigation cycle bugs from inifinte reporting by checking is in list of last
    //10 exceptions only if occurred in last 2 seconds(should reduce to last 500ms perhaps)
    private errorCache = new LRUCache<string, ErrorStruct>({ maxSize: 10 });

    handleError(e: any): void {
        try {
            this.handleErrorImpl(e);
        }catch (err) {
            //swallow this one to prevent infinite cycle though we stil hit infinite navigation cycle
            //bugs somehow - not sure the context yet
            console.error("Exception trying to report", err);
            
            //this.sentryErrorHandler.handleError(e);
        }
    }

    handleErrorImpl(e: any): void {

        const now = Date.now();
        const diff = now - this.lastTime;
        //console.log(`diff=${diff}  now=${now} lastTime=${this.lastTime} constructorName=${e.constructor.name}`);

        /****************************
         Trying to avoid 100 reports of same damn bug, so check an LRU cache and do not
         do anything if we already reported it within the last 2 seconds, checking timestamp and all
         ******************************/
        if(this.isErrorReportedInLastTwoSeconds(e))
            return;

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


        //This is not working
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

    private isErrorReportedInLastTwoSeconds(e: any) {
        //for production to prevent 100 reports of same exception -> (hit in navigtation bugs mostly creating infinite cycle bugs)

        // const now = Date.now();
        // const twoSecondsAgo = now - 2000;
        //
        // let uniqueString: string;
        // if (e instanceof Error) {
        //     // If e is an Error object
        //     uniqueString += e.message + "-----";
        //     uniqueString = e.stack || 'No stack trace';
        // } else {
        //     //ugh, hope everyone reports Error correctly!!!
        //     return false;
        // }
        //
        // const errorStruct = this.errorCache.get(uniqueString);
        // if(errorStruct) {
        //     if(errorStruct.timeReported > twoSecondsAgo) {
        //         return true;
        //     }
        // }
        //
        // const errStruct: ErrorStruct = {
        //     message: uniqueString,
        //     timeReported: now
        // };
        //
        // this.errorCache.set(uniqueString, errStruct);
        return false;
    }


}
