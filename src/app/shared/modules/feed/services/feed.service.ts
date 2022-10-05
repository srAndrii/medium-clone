import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetFeedResponseInterfaceInterface } from '../types/getFeedResponseInterface.interface'
import { environment } from '../../../../../environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class FeedService {
    constructor(private http: HttpClient) {}
    getFeed(url: string): Observable<GetFeedResponseInterfaceInterface> {
        const fullUrl = environment.apiUrl + url
        return this.http.get<GetFeedResponseInterfaceInterface>(fullUrl)
    }
}
