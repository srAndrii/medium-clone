import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getFeedAction } from '../../store/actions/getFeed.action'
import { Observable } from 'rxjs'
import { GetFeedResponseInterfaceInterface } from '../../types/getFeedResponseInterface.interface'
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from '../../store/selectors'

@Component({
    selector: 'mc-feed',
    templateUrl: 'feed.component.html',
    styleUrls: ['feed.component.scss'],
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlProps: string

    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    feed$: Observable<GetFeedResponseInterfaceInterface | null>

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues()
        this.fetchData()
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
    }

    fetchData(): void {
        this.store.dispatch(getFeedAction({ url: this.apiUrlProps }))
    }
}
