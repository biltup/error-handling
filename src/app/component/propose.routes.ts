import {ActivatedRouteSnapshot, Routes} from "@angular/router";
import {from} from "rxjs";
import {inject} from "@angular/core";
import {FetchService} from "../fetch.service";
import {AppComponent} from "../app.component";
import {ProposeComponent} from "./propose.component";

export default [
    {
        title: 'Propose',
        path: '',
        resolve: {
            fetch: (route:ActivatedRouteSnapshot) => from(inject(FetchService).fetchRemote()),
            //any other data to fetch in parallel goes here
        },
        component: ProposeComponent,
    },
] as Routes;