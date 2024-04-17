import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import { reducers, metaReducers } from "@core/store";
import { FeatureEffects } from "@core/store/feature-effects";
import { BrowserModule } from "@angular/platform-browser";

declare global {
  interface Navigator {
    msSaveBlob;
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => boolean;
  }
}

/**
 * The main application module
 *
 * @stable
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([FeatureEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
