import type { ErrorObject } from "@vuelidate/core";

export const DEFAULT_VALUE = {
    $propertyPath: "",
    $property: '',
    $validator: "",
    $uid: "",
    $message: "",
    $params: {
        type: ""
    },
    $response: false,
    $pending: false,
}

export interface IField {
    id: string;
    label: string;
    required: boolean;
    errors: ErrorObject[];
    help: string;
}
