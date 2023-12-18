import type { ErrorObject } from '@vuelidate/core'

export interface IField {
    id: string
    label: string
    required: boolean
    errors: ErrorObject[]
    help: string
}
