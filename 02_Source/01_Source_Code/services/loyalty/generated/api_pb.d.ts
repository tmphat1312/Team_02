// package: loyalty
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as data_pb from "./data_pb";

export class ListLoyaltyCampaignRequest extends jspb.Message { 
    clearLoyaltyCampaignIdsList(): void;
    getLoyaltyCampaignIdsList(): Array<number>;
    setLoyaltyCampaignIdsList(value: Array<number>): ListLoyaltyCampaignRequest;
    addLoyaltyCampaignIds(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListLoyaltyCampaignRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListLoyaltyCampaignRequest): ListLoyaltyCampaignRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListLoyaltyCampaignRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListLoyaltyCampaignRequest;
    static deserializeBinaryFromReader(message: ListLoyaltyCampaignRequest, reader: jspb.BinaryReader): ListLoyaltyCampaignRequest;
}

export namespace ListLoyaltyCampaignRequest {
    export type AsObject = {
        loyaltyCampaignIdsList: Array<number>,
    }
}

export class ListLoyaltyCampaignResponse extends jspb.Message { 
    getCode(): number;
    setCode(value: number): ListLoyaltyCampaignResponse;
    getMessage(): string;
    setMessage(value: string): ListLoyaltyCampaignResponse;

    hasData(): boolean;
    clearData(): void;
    getData(): ListLoyaltyCampaignResponse.Data | undefined;
    setData(value?: ListLoyaltyCampaignResponse.Data): ListLoyaltyCampaignResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListLoyaltyCampaignResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListLoyaltyCampaignResponse): ListLoyaltyCampaignResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListLoyaltyCampaignResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListLoyaltyCampaignResponse;
    static deserializeBinaryFromReader(message: ListLoyaltyCampaignResponse, reader: jspb.BinaryReader): ListLoyaltyCampaignResponse;
}

export namespace ListLoyaltyCampaignResponse {
    export type AsObject = {
        code: number,
        message: string,
        data?: ListLoyaltyCampaignResponse.Data.AsObject,
    }


    export class Data extends jspb.Message { 
        clearLoyaltyCampaignsList(): void;
        getLoyaltyCampaignsList(): Array<data_pb.LoyaltyCampaign>;
        setLoyaltyCampaignsList(value: Array<data_pb.LoyaltyCampaign>): Data;
        addLoyaltyCampaigns(value?: data_pb.LoyaltyCampaign, index?: number): data_pb.LoyaltyCampaign;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Data.AsObject;
        static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Data;
        static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
    }

    export namespace Data {
        export type AsObject = {
            loyaltyCampaignsList: Array<data_pb.LoyaltyCampaign.AsObject>,
        }
    }

}

export class UpsertLoyaltyCampaignRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): UpsertLoyaltyCampaignRequest;
    getName(): string;
    setName(value: string): UpsertLoyaltyCampaignRequest;
    getType(): data_pb.LoyaltyCampaignType;
    setType(value: data_pb.LoyaltyCampaignType): UpsertLoyaltyCampaignRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpsertLoyaltyCampaignRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpsertLoyaltyCampaignRequest): UpsertLoyaltyCampaignRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpsertLoyaltyCampaignRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpsertLoyaltyCampaignRequest;
    static deserializeBinaryFromReader(message: UpsertLoyaltyCampaignRequest, reader: jspb.BinaryReader): UpsertLoyaltyCampaignRequest;
}

export namespace UpsertLoyaltyCampaignRequest {
    export type AsObject = {
        id: number,
        name: string,
        type: data_pb.LoyaltyCampaignType,
    }
}

export class UpsertLoyaltyCampaignResponse extends jspb.Message { 
    getCode(): number;
    setCode(value: number): UpsertLoyaltyCampaignResponse;
    getMessage(): string;
    setMessage(value: string): UpsertLoyaltyCampaignResponse;

    hasData(): boolean;
    clearData(): void;
    getData(): UpsertLoyaltyCampaignResponse.Data | undefined;
    setData(value?: UpsertLoyaltyCampaignResponse.Data): UpsertLoyaltyCampaignResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpsertLoyaltyCampaignResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpsertLoyaltyCampaignResponse): UpsertLoyaltyCampaignResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpsertLoyaltyCampaignResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpsertLoyaltyCampaignResponse;
    static deserializeBinaryFromReader(message: UpsertLoyaltyCampaignResponse, reader: jspb.BinaryReader): UpsertLoyaltyCampaignResponse;
}

export namespace UpsertLoyaltyCampaignResponse {
    export type AsObject = {
        code: number,
        message: string,
        data?: UpsertLoyaltyCampaignResponse.Data.AsObject,
    }


    export class Data extends jspb.Message { 
        getId(): number;
        setId(value: number): Data;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Data.AsObject;
        static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Data;
        static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
    }

    export namespace Data {
        export type AsObject = {
            id: number,
        }
    }

}
