import {ActivatedRouteSnapshot, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {from} from "rxjs";
import {inject} from "@angular/core";
import {FetchService} from "./fetch.service";

export const routes: Routes = [
    {
        title: 'shared',
        path: '',
        children: [
            {path: 'propose', loadChildren: () => import('app/component/propose.routes')},
        ]
    },
];
