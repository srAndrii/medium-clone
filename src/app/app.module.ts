import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { TopBarModule } from './shared/modules/topBar/topBar.module'
import { PersistenceService } from './shared/services/persistence.service'
import { AuthInterceptor } from './shared/services/authInterceptor'
import { GlobalFeedModule } from './globalFeed/globalFeed.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),
        TopBarModule,
        GlobalFeedModule,
    ],
    providers: [
        PersistenceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
