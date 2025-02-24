import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
} from "@angular/material/dialog";

export interface DialogData {
    title: string;
    message: string;
    url?: string;
}

@Component({
    selector: 'error-component',
    templateUrl: './error.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {

    navigateIfNeeded(url: string | undefined) {
        console.log(`maybe redirect=${url}`);

        if(url) {
            //only old school works here due to component not being deconstructed or something
            // https://stackoverflow.com/questions/47288678/how-to-redirect-correctly-in-a-global-error-handler
            window.location.href = "/"+url;
        }

    }
}
