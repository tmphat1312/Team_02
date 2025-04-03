// package: loyalty
// file: data.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LoyaltyCampaign extends jspb.Message { 
    getId(): number;
    setId(value: number): LoyaltyCampaign;
    getName(): string;
    setName(value: string): LoyaltyCampaign;
    getType(): LoyaltyCampaignType;
    setType(value: LoyaltyCampaignType): LoyaltyCampaign;
    getStatus(): LoyaltyCampaignStatus;
    setStatus(value: LoyaltyCampaignStatus): LoyaltyCampaign;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoyaltyCampaign.AsObject;
    static toObject(includeInstance: boolean, msg: LoyaltyCampaign): LoyaltyCampaign.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoyaltyCampaign, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoyaltyCampaign;
    static deserializeBinaryFromReader(message: LoyaltyCampaign, reader: jspb.BinaryReader): LoyaltyCampaign;
}

export namespace LoyaltyCampaign {
    export type AsObject = {
        id: number,
        name: string,
        type: LoyaltyCampaignType,
        status: LoyaltyCampaignStatus,
    }
}

export enum LoyaltyCampaignType {
    LOYALTY_CAMPAIGN_TYPE_UNSPECIFIED = 0,
    LOYALTY_CAMPAIGN_TYPE_REWARD_POINT = 1,
    LOYALTY_CAMPAIGN_TYPE_REDEEM_POINT = 2,
}

export enum LoyaltyCampaignStatus {
    LOYALTY_CAMPAIGN_STATUS_UNSPECIFIED = 0,
    LOYALTY_CAMPAIGN_STATUS_ACTIVE = 1,
    LOYALTY_CAMPAIGN_STATUS_INACTIVE = 2,
}
