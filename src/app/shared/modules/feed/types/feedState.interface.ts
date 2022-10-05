import { GetFeedResponseInterfaceInterface } from './getFeedResponseInterface.interface'

export interface FeedStateInterface {
    isLoading: boolean
    error: string | null
    data: GetFeedResponseInterfaceInterface | null
}
