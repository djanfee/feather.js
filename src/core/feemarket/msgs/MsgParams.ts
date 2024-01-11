import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgParams as MsgParams_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/tx';
import { Params } from '../params';
import { Params as Params_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/params';

export class MsgParams extends JSONSerializable<
  MsgParams.Amino,
  MsgParams.Data,
  MsgParams.Proto
> {
  constructor(public params: Params, public authority: AccAddress) {
    super();
  }

  public static fromAmino(data: MsgParams.Amino): MsgParams {
    const {
      value: { params, authority },
    } = data;
    return new MsgParams(Params.fromAmino(params), authority);
  }

  public toAmino(): MsgParams.Amino {
    const { params, authority } = this;
    return {
      type: 'feemarket/MsgParams',
      value: {
        params: params.toAmino(),
        authority: authority,
      },
    };
  }

  public static fromData(proto: MsgParams.Data): MsgParams {
    const { params, authority } = proto;
    return new MsgParams(Params.fromData(params), authority);
  }

  public toData(): MsgParams.Data {
    const { params, authority } = this;
    return {
      '@type': '/feemarket.feemarket.v1.MsgParams',
      params: params.toData(),
      authority: authority,
    };
  }

  public static fromProto(proto: MsgParams.Proto): MsgParams {
    return new MsgParams(
      Params.fromProto(proto.params as Params_pb),
      proto.authority
    );
  }

  public toProto(): MsgParams.Proto {
    const { params, authority } = this;
    return MsgParams_pb.fromPartial({
      params: params.toProto(),
      authority,
    });
  }
}

export namespace MsgParams {
  export interface Amino {
    type: 'feemarket/MsgParams';
    value: {
      params: Params.Amino;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.MsgParams';
    params: Params.Data;
    authority: AccAddress;
  }
  export type Proto = MsgParams_pb;
}
