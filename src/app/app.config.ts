import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {CustomErrorHandler} from "./CustomErrorHandler";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes)
  ]
};
