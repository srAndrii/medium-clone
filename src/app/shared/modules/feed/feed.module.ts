import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeedComponent } from './components/feed/feed.component'
import { EffectsModule } from '@ngrx/effects'
import { GetFeedEffect } from './store/effects/getFeed.effect'
import { StoreModule } from '@ngrx/store'
import { FeedService } from './services/feed.service'
import { reducers } from './store/reducer'
import { RouterModule } from '@angular/router'
import { ErrorMessageModule } from '../errorMessage/errorMessage.module'
import { LoadingModule } from '../loading/loading.module'

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedService],
})
export class FeedModule {}
