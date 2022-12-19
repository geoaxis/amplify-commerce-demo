/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookLikesCreateFormInputValues = {
    owner?: string;
};
export declare type BookLikesCreateFormValidationValues = {
    owner?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookLikesCreateFormOverridesProps = {
    BookLikesCreateFormGrid?: FormProps<GridProps>;
    owner?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BookLikesCreateFormProps = React.PropsWithChildren<{
    overrides?: BookLikesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BookLikesCreateFormInputValues) => BookLikesCreateFormInputValues;
    onSuccess?: (fields: BookLikesCreateFormInputValues) => void;
    onError?: (fields: BookLikesCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: BookLikesCreateFormInputValues) => BookLikesCreateFormInputValues;
    onValidate?: BookLikesCreateFormValidationValues;
} & React.CSSProperties>;
export default function BookLikesCreateForm(props: BookLikesCreateFormProps): React.ReactElement;
