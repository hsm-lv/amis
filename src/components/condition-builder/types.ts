export type FieldTypes =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'time'
  | 'datetime'
  | 'select';

export type OperatorType =
  | 'equals'
  | 'not_equals'
  | 'less_than'
  | 'less_than_or_equals';

export type FieldItem = {
  type: 'text';
  operators: Array<OperatorType>;
};

export type ExpressionSimple = string | number | object | undefined;
export type ExpressionComplex =
  | ExpressionSimple
  | {
      type: 'value';
      value: ExpressionSimple;
    }
  | {
      type: 'func';
      func: string;
      args: Array<ExpressionComplex>;
    }
  | {
      type: 'field';
      field: string;
    }
  | {
      type: 'raw';
      field: string;
    };

export interface ConditionRule {
  id: any;
  left?: ExpressionComplex;
  op?: OperatorType;
  right?: ExpressionComplex | Array<ExpressionComplex>;
}

export interface ConditionGroupValue {
  id: string;
  conjunction: 'and' | 'or';
  not?: boolean;
  children?: Array<ConditionRule | ConditionGroupValue>;
}

export interface ConditionValue extends ConditionGroupValue {}

interface BaseField {
  type: FieldTypes;
  label: string;
  valueTypes?: Array<'value' | 'field' | 'func' | 'expression'>;

  // valueTypes 里面配置 func 才有效。
  funcs?: Array<string>;

  defaultValue?: any;
}

type FieldGroup = {
  label: string;
  children: Array<FieldSimple>;
};

interface TextField extends BaseField {
  name: string;
  type: 'text';
  minLength?: number;
  maxLength?: number;
}

interface NumberField extends BaseField {
  name: string;
  type: 'number';
  maximum?: number;
  minimum?: number;
}

interface DateField extends BaseField {
  name: string;
  type: 'date';
  minDate?: any;
  maxDate?: any;
}

interface TimeField extends BaseField {
  name: string;
  type: 'time';
  minTime?: any;
  maxTime?: any;
}

interface DatetimeField extends BaseField {
  type: 'datetime';
  name: string;
}

interface SelectField extends BaseField {
  type: 'select';
  name: string;
  multiple?: boolean;
  options?: Array<any>;
}

interface BooleanField extends BaseField {
  type: 'boolean';
  name: string;
}

interface GroupField {
  type: 'group';
  label: string;
  name: string;
  children: Array<FieldSimple>;
}

type FieldSimple =
  | TextField
  | NumberField
  | DateField
  | TimeField
  | DatetimeField
  | SelectField
  | BooleanField;

export type Field = FieldSimple | FieldGroup | GroupField;

interface FuncGroup {
  label: string;
  children: Array<Func>;
}

export interface Func {
  type: string;
  returnType: FieldTypes;
  args: Array<FuncArg>;
  label: string;
}
export interface FuncArg extends BaseField {
  isOptional?: boolean;
}
export type Funcs = Array<Func | FuncGroup>;
export type Fields = Array<Field>;
