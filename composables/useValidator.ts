import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import type { Order } from '~/utils/types/Menu'

export interface IForm {
    name: string
    email: string
    password: string
    confirmPassword: string
    category: string
}
export default function (form?: IForm) {
    const rules = computed(() => ({
        name: {
            required: helpers.withMessage('Name field is required.', required),
            minLength: minLength(4),
        },
        email: {
            required: helpers.withMessage('Email field is required.', required),
            email: helpers.withMessage('Email should be a valid email address.', email),
        },
        password: {
            required: helpers.withMessage('Password field is required.', required),
            minLength: helpers.withMessage('Password should be greater than 6chars.', minLength(6)),
        },
        confirmPassword: {
            required: helpers.withMessage('Password confirmation field is required.', required),
            sameAs: helpers.withMessage('Passwords does not match.', sameAs(form?.password)),
        },
        category: {
            required: helpers.withMessage('Category field is required.', required),
        },
    }))

    const orderRules = computed(() => ({
        customer_name: {
            required: helpers.withMessage('Customer name is required.', required),
        },
        table_number: {
            required: helpers.withMessage('Table field is required.', required),
        },
    }))

    return {
        rules,
        orderRules,
    }
}
