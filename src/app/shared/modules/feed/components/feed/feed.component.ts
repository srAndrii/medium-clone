import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getFeedAction } from '../../store/actions/getFeed.action'
import { Observable, Subscription } from 'rxjs'
import { GetFeedResponseInterfaceInterface } from '../../types/getFeedResponseInterface.interface'
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from '../../store/selectors'
import { environment } from '../../../../../../environments/environment'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { parseUrl, stringify } from 'query-string'

@Component({
    selector: 'mc-feed',
    templateUrl: 'feed.component.html',
    styleUrls: ['feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
    @Input('apiUrl') apiUrlProps: string

    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    feed$: Observable<GetFeedResponseInterfaceInterface | null>
    limit = environment.limit
    baseUrl: string
    queryParamsSubscription: Subscription
    currentPage: number

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe()
    }

    ngOnInit(): void {
        this.initializeValues()
        this.initializeListeners()
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
        this.baseUrl = this.router.url.split('?')[0]
    }

    initializeListeners(): void {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: Params) => {
                this.currentPage = Number(params['page'] || '1')
                this.fetchFeed()
            }
        )
    }

    fetchFeed(): void {
        const offset = this.currentPage * this.limit - this.limit
        const parsedUrl = parseUrl(this.apiUrlProps)
        const stringifiedParams = stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query,
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
        this.store.dispatch(getFeedAction({ url: apiUrlWithParams }))
    }
}
