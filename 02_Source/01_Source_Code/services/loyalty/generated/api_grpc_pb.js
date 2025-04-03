// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_pb = require('./api_pb.js');
var data_pb = require('./data_pb.js');

function serialize_loyalty_ListLoyaltyCampaignRequest(arg) {
  if (!(arg instanceof api_pb.ListLoyaltyCampaignRequest)) {
    throw new Error('Expected argument of type loyalty.ListLoyaltyCampaignRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loyalty_ListLoyaltyCampaignRequest(buffer_arg) {
  return api_pb.ListLoyaltyCampaignRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loyalty_ListLoyaltyCampaignResponse(arg) {
  if (!(arg instanceof api_pb.ListLoyaltyCampaignResponse)) {
    throw new Error('Expected argument of type loyalty.ListLoyaltyCampaignResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loyalty_ListLoyaltyCampaignResponse(buffer_arg) {
  return api_pb.ListLoyaltyCampaignResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loyalty_UpsertLoyaltyCampaignRequest(arg) {
  if (!(arg instanceof api_pb.UpsertLoyaltyCampaignRequest)) {
    throw new Error('Expected argument of type loyalty.UpsertLoyaltyCampaignRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loyalty_UpsertLoyaltyCampaignRequest(buffer_arg) {
  return api_pb.UpsertLoyaltyCampaignRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loyalty_UpsertLoyaltyCampaignResponse(arg) {
  if (!(arg instanceof api_pb.UpsertLoyaltyCampaignResponse)) {
    throw new Error('Expected argument of type loyalty.UpsertLoyaltyCampaignResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loyalty_UpsertLoyaltyCampaignResponse(buffer_arg) {
  return api_pb.UpsertLoyaltyCampaignResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LoyaltyServiceService = exports.LoyaltyServiceService = {
  listLoyaltyCampaign: {
    path: '/loyalty.LoyaltyService/ListLoyaltyCampaign',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.ListLoyaltyCampaignRequest,
    responseType: api_pb.ListLoyaltyCampaignResponse,
    requestSerialize: serialize_loyalty_ListLoyaltyCampaignRequest,
    requestDeserialize: deserialize_loyalty_ListLoyaltyCampaignRequest,
    responseSerialize: serialize_loyalty_ListLoyaltyCampaignResponse,
    responseDeserialize: deserialize_loyalty_ListLoyaltyCampaignResponse,
  },
  upsertLoyaltyCampaign: {
    path: '/loyalty.LoyaltyService/UpsertLoyaltyCampaign',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.UpsertLoyaltyCampaignRequest,
    responseType: api_pb.UpsertLoyaltyCampaignResponse,
    requestSerialize: serialize_loyalty_UpsertLoyaltyCampaignRequest,
    requestDeserialize: deserialize_loyalty_UpsertLoyaltyCampaignRequest,
    responseSerialize: serialize_loyalty_UpsertLoyaltyCampaignResponse,
    responseDeserialize: deserialize_loyalty_UpsertLoyaltyCampaignResponse,
  },
};

exports.LoyaltyServiceClient = grpc.makeGenericClientConstructor(LoyaltyServiceService, 'LoyaltyService');
