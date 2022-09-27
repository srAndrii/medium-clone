import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, of, map, catchError, tap } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { PersistenceService } from '../../../shared/services/persistence.service'
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction,
} from '../actions/getcurrentUser.action'

@Injectable()
export class GetCurrentUserEffect {
    getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCurrentUserAction),
            switchMap(() => {
                const token = this.persistenceService.get('accessToken')
                if (!token) {
                    return of(getCurrentUserFailureAction())
                }
                return this.authService.getCurrentUser().pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return getCurrentUserSuccessAction({ currentUser })
                    }),

                    catchError(() => {
                        return of(getCurrentUserFailureAction())
                    })
                )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistenceService: PersistenceService
    ) {}
}
