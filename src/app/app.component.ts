import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FetchService} from "./fetch.service";
import {Subject, takeUntil} from "rxjs";
import {FetchResponse} from "./SomeApi";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'error-handling';


}
