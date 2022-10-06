import { FeedStateInterface } from '../types/feedState.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from '../../../../auth/types/authState.interface'
import { AppStateInterface } from '../../../types/appState.interface'

export const feedFeatureSelector =
    createFeatureSelector<FeedStateInterface>('feed')

export const isLoadingSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.isLoading
)

export const errorSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.error
)

export const feedSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.data
)
