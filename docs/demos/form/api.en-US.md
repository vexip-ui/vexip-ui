### Form Props

| Name          | Type                                   | Description                                                                                                                                   | Default     | Since   |
| ------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| method        | `'get' \| 'post' \| 'put' \| 'delete'` | Set the method value of the native form object, which takes effect after setting the action                                                   | `'post'`    | -       |
| action        | `string`                               | Set the action value of the native form tag                                                                                                   | `null`      | -       |
| model         | `Record<string, any>`                  | The form data source                                                                                                                          | `{}`        | -       |
| rules         | `Record<string, any>`                  | The form validation rules                                                                                                                     | `{}`        | -       |
| label-width   | `number \| 'auto'`                     | The width of the form label                                                                                                                   | `'auto'`    | -       |
| labell-align  | `'right' \| 'top' \| 'left'`           | The alignment of form labels                                                                                                                  | `'right'`   | -       |
| all-required  | `boolean`                              | Set whether all form content is required                                                                                                      | `false`     | -       |
| label-suffix  | `string`                               | The suffix of the form label, such as `:`                                                                                                     | `''`        | -       |
| hide-asterisk | `boolean`                              | Set whether to hide required asterisks                                                                                                        | `false`     | -       |
| validate-all  | `boolean`                              | Set whether to perform all rule validation during form validation (by default each field encounters an error and stops subsequent validation) | `false`     | -       |
| hide-label    | `boolean`                              | Set whether to hide the form label, commonly used in login forms                                                                              | `false`     | -       |
| disabled      | `boolean`                              | Set whether to disable all controls under the form                                                                                            | `false`     | `2.0.0` |
| loading       | `boolean`                              | Set whether all controls under the form are loading                                                                                           | `false`     | `2.0.0` |
| size          | `'small' \| 'default' \| 'large'`      | Set the size of all controls under the form                                                                                                   | `'default'` | `2.0.0` |
| inline        | `boolean`                              | Set whether the form is inline layout                                                                                                         | `false`     | `2.0.0` |
| gap           | `number \| number[]`                   | Grid gap, refer to the prop of the same name of the Row component                                                                             | `[8, 0]`    | `2.0.0` |
| justify       | `RowGridJustify`                       | Horizontal arrangement, refer to the prop of the same name of the Row component                                                               | `'start'`   | `2.0.0` |
| align         | `RowGridAlign`                         | Vertical alignment, refer to the prop of the same name of the Row component                                                                   | `'top'`     | `2.0.0` |

### Form Methods

| Name             | Description                                                                                | Signature                                          | Since |
| ---------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- | ----- |
| validate         | Validate all fields of the form                                                            | `() => Promise<string[]>`                          | -     |
| validateFields   | Validate the fields specified by the form according to the properties                      | `(props: string \| string[]) => Promise<string[]>` | -     |
| reset            | resets all fields of the form                                                              | `() => void`                                       | -     |
| resetFields      | Reset the fields specified by the form according to the properties                         | `(props: string \| string[]) => void`              | -     |
| clearError       | Clear all error messages of the form                                                       | `() => void`                                       | -     |
| clearFieldsError | Clears the error information of the fields specified by the form according to the property | `(props: string \| string[]) => void`              | -     |

### Form Slots

| Name    | Description           | Parameters | Since |
| ------- | --------------------- | ---------- | ----- |
| default | Slot for form content | -          | -     |

### FormItem Props

| Name             | Type             | Description                                                                                                                                       | Default      | Since   |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| label            | `string`         | label of the form field                                                                                                                           | `''`         | -       |
| prop             | `string`         | property of the form field                                                                                                                        | `''`         | -       |
| rules            | `Rule \| Rule[]` | Validation specification for form fields                                                                                                          | `[]`         | -       |
| label-width      | `number`         | width of the form field label                                                                                                                     | `null`       | -       |
| required         | `boolean`        | Set whether the field is required                                                                                                                 | `false`      | -       |
| html-for         | `string`         | `for` attribute of native `<label>`                                                                                                               | `null`       | -       |
| default-value    | `unknown`        | set the default value of the field                                                                                                                | `null`       | -       |
| hide-error-tip   | `boolean`        | Set whether to hide the error tip                                                                                                                 | `false`      | -       |
| validate-all     | `boolean`        | Set whether to perform all rule validation when validating, if not set, it will inherit the property value of the same name of the Form component | `null`       | -       |
| hide-asterisk    | `boolean`        | Set whether to hide the required asterisk, if not set, it will inherit the property value of the same name of the Form component                  | `null`       | -       |
| hide-label       | `boolean`        | Set whether to hide the form label, if not set, it will inherit the property value of the same name of the Form component                         | `null`       | -       |
| action           | `boolean`        | Set whether it is a pure action FormItem, if so, the style is centered and the content is centered and has no bottom margin                       | `false`      | -       |
| error-transition | `string`         | transition effect name for error message                                                                                                          | `'vxp-fade'` | -       |
| help             | `string`         | Set the help information for field                                                                                                                | `''`         | `2.0.0` |

> Supported props of Column component include: span, offset, push, pull, order, flex, xs, sm, md, lg, xl, xxl

The types related to `Rule`:

```ts
type Types =
  | 'string'
  | 'number'
  | 'boolean'
  | 'int'
  | 'float'
  | 'array'
  | 'object'
  | 'date'
  | 'url'
  | 'color'
  | 'email'
type Range = [number, number]
type ValidatorReslut = boolean | string | Error | Promise<boolean | string | Error>

interface Rule<T = any> {
  required?: boolean,
  type?: Types,
  length?: number,
  range?: Range,
  strict?: boolean,
  enums?: T[],
  message?: string,
  validator?(value: T, model: Record<string, any>): ValidatorReslut
}
```

### FormItem Slots

| Name    | Description                     | Parameters      | Since   |
| ------- | ------------------------------- | --------------- | ------- |
| default | Slot for field content          | -               | -       |
| label   | Slot for field label content    | -               | -       |
| help    | Slot for field help information | -               | `2.0.0` |
| error   | Slot for error content tip      | `(tip: string)` | -       |

### FormSubmit Props

> The FormSubmit component is a repackage of the Button component and supports most of the properties of the Button component. Only the properties specific to the Submit component are listed below.

| Name             | Type            | Description                                                                                                                     | Default         | Since |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----- |
| type             | `string`        | Same as the `type` property of the Button component, but with a different default value                                         | `'primary'`     | -     |
| label            | `string`        | Set the content of the submit button, it will be invalid when using the slot                                                    | `locale.submit` | -     |
| on-before-submit | `() => unknown` | Set callback before form submission, support asynchronous function and Promise, return value of `false` will prevent submission | `null`          | -     |

### FormSubmit Events

| Name   | Description                                                                                                                                               | Parameters           | Since |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----- |
| submit | The event callback before the submission jump is about to occur, there is no return value, triggering this event means that the submission is not blocked | -                    | -     |
| error  | Emitted when an error occurs in form validation before submitting, and returns the validation error message                                               | `(errors: string[])` | -     |

### FormReset Props

> The FormReset component is a repackage of the Button component and supports most of the properties of the Button component. Only the properties specific to the Reset component are listed below.

| Name            | Type            | Description                                                                                                                     | Default        | Since |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----- |
| text            | `string`        | Set the content of the reset button, it will be invalid when using the slot                                                     | `locale.reset` | -     |
| on-before-reset | `() => unknown` | Set callback before form submission, support asynchronous function and Promise, return value of `false` will prevent submission | `null`         | -     |

### FormReset Events

| Name  | Description                                                                                                             | Parameters | Since |
| ----- | ----------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| reset | Event callback before commit reset is about to occur, no return value, triggering this event means reset is not blocked | -          | -     |
