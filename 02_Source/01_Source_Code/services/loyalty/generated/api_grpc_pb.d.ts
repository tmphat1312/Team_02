// package: loyalty
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_pb from "./api_pb";
import * as data_pb from "./data_pb";

interface ILoyaltyServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listLoyaltyCampaign: ILoyaltyServiceService_IListLoyaltyCampaign;
    upsertLoyaltyCampaign: ILoyaltyServiceService_IUpsertLoyaltyCampaign;
}

interface ILoyaltyServiceService_IListLoyaltyCampaign extends grpc.MethodDefinition<api_pb.ListLoyaltyCampaignRequest, api_pb.ListLoyaltyCampaignResponse> {
    path: "/loyalty.LoyaltyService/ListLoyaltyCampaign";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.ListLoyaltyCampaignRequest>;
    requestDeserialize: grpc.deserialize<api_pb.ListLoyaltyCampaignRequest>;
    responseSerialize: grpc.serialize<api_pb.ListLoyaltyCampaignResponse>;
    responseDeserialize: grpc.deserialize<api_pb.ListLoyaltyCampaignResponse>;
}
interface ILoyaltyServiceService_IUpsertLoyaltyCampaign extends grpc.MethodDefinition<api_pb.UpsertLoyaltyCampaignRequest, api_pb.UpsertLoyaltyCampaignResponse> {
    path: "/loyalty.LoyaltyService/UpsertLoyaltyCampaign";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.UpsertLoyaltyCampaignRequest>;
    requestDeserialize: grpc.deserialize<api_pb.UpsertLoyaltyCampaignRequest>;
    responseSerialize: grpc.serialize<api_pb.UpsertLoyaltyCampaignResponse>;
    responseDeserialize: grpc.deserialize<api_pb.UpsertLoyaltyCampaignResponse>;
}

export const LoyaltyServiceService: ILoyaltyServiceService;

export interface ILoyaltyServiceServer extends grpc.UntypedServiceImplementation {
    listLoyaltyCampaign: grpc.handleUnaryCall<api_pb.ListLoyaltyCampaignRequest, api_pb.ListLoyaltyCampaignResponse>;
    upsertLoyaltyCampaign: grpc.handleUnaryCall<api_pb.UpsertLoyaltyCampaignRequest, api_pb.UpsertLoyaltyCampaignResponse>;
}

export interface ILoyaltyServiceClient {
    listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
}

export class LoyaltyServiceClient extends grpc.Client implements ILoyaltyServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    public listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    public listLoyaltyCampaign(request: api_pb.ListLoyaltyCampaignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    public upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    public upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
    public upsertLoyaltyCampaign(request: api_pb.UpsertLoyaltyCampaignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.UpsertLoyaltyCampaignResponse) => void): grpc.ClientUnaryCall;
}
