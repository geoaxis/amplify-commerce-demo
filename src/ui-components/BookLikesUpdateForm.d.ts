/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { BookLikes } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookLikesUpdateFormInputValues = {
    owner?: string;
};
export declare type BookLikesUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookLikesUpdateFormOverridesProps = {
    BookLikesUpdateFormGrid?: FormProps<GridProps>;
    owner?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BookLikesUpdateFormProps = React.PropsWithChildren<{
    overrides?: BookLikesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bookLikes?: BookLikes;
    onSubmit?: (fields: BookLikesUpdateFormInputValues) => BookLikesUpdateFormInputValues;
    onSuccess?: (fields: BookLikesUpdateFormInputValues) => void;
    onError?: (fields: BookLikesUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: BookLikesUpdateFormInputValues) => BookLikesUpdateFormInputValues;
    onValidate?: BookLikesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BookLikesUpdateForm(props: BookLikesUpdateFormProps): React.ReactElement;
