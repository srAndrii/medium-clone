import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'
import { Observable } from 'rxjs'
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from '../../store/selectors'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface'

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup
    isSubmitting$: Observable<boolean>
    backendErrors$: Observable<BackendErrorsInterface | any>

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValue()
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: '',
            password: '',
        })
        console.log(this.form.valid)
    }

    initializeValue(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    }

    onSubmit(): void {
        const request: RegisterRequestInterface = {
            user: this.form.value,
        }
        this.store.dispatch(registerAction({ request }))
    }
}
