import { AnyZodObject, ZodSchema } from 'zod';
import type RuleStage from '../executors/rule-stage';
import { TOptionalGetter, TValidationResult } from './common';
import type { TRuleStageExecutorContext } from './rule-stage';

export enum ENodeMetadataOptionType {
  DROP_DOWN = 'DROP_DOWN',
  INPUT = 'INPUT',
}

export enum ENodeType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

export type TNodeMetadataInputOptions = {
  schema: ZodSchema
};

export type TNodeMetadataDropDownOption = {
  id: string,
  name: string
};

interface INodeMetadataOption {
  id: string,
  name: string,
  validate: (optionValue: any) => TValidationResult,
}

interface INodeMetadataInputOption extends INodeMetadataOption {
  type: ENodeMetadataOptionType.INPUT,
  inputOptions: TNodeMetadataInputOptions,
}

interface INodeMetadataDropDownOption extends INodeMetadataOption {
  type: ENodeMetadataOptionType.DROP_DOWN,
  dropDownOptions: TNodeMetadataDropDownOption[],
}

export type TNodeMetadataOption = INodeMetadataInputOption | INodeMetadataDropDownOption;

export type TNodeOption = string | number | boolean;
export type TNodeOptions = Record<string, TNodeOption | never>;

export type TNodeExecutorContext<T extends TNodeOptions> = TRuleStageExecutorContext & { ruleStage?: RuleStage, nodeOptions: T };

export type TNodeMetadata<T extends TNodeOptions> = {
  defaultOptions: T,
  options: TOptionalGetter<TNodeExecutorContext<T>, TNodeMetadataOption[]>,
  inputSchema: TOptionalGetter<TNodeExecutorContext<T>, AnyZodObject>,
  outputSchema: TOptionalGetter<TNodeExecutorContext<T>, AnyZodObject>,
};

export type TNodeConfig<T extends TNodeOptions> = TNodeMetadata<T> & {
  id: string,
  name: string,
  type?: ENodeType,
  description: string,
};
