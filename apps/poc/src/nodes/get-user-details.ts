import { BaseNode, Types } from '@fraud-tool/lib-engine';

import { CUserType, TUserType } from '../input-output-types/user';

type TNodeInput = {
  userId: string,
};
type TNodeOutput = {
  user: TUserType,
};

export default class GetUserNode extends BaseNode<TNodeInput, TNodeOutput> {
  constructor() {
    super({
      id: 'getUser',
      name: 'Get User',
      description: 'Retrieve details for a given user ID',

      inputs: {
        userId: { name: 'User ID', type: Types.EPrimitive.STRING, },
      },
      outputs: {
        user: { name: 'User', type: CUserType, },
      },
    });
  }

  execute(input: TNodeInput): TNodeOutput {
    return {
      user: {
        id: input.userId,
        username: 'username',
        createdAt: Types.CDateType.fromNative(new Date()),
      },
    };
  }
}
