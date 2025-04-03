import * as grpc from "@grpc/grpc-js";
import { LoyaltyServiceService } from "../generated/api_grpc_pb";
import type { ILoyaltyServiceServer } from "../generated/api_grpc_pb";
import {
    ListLoyaltyCampaignResponse,
    UpsertLoyaltyCampaignResponse,
    ListLoyaltyCampaignRequest,
} from "../generated/api_pb";
import {
    LoyaltyCampaign,
    LoyaltyCampaignType,
    LoyaltyCampaignStatus,
} from "../generated/data_pb"
const mockLoyaltyCampaigns: LoyaltyCampaign[] = [
    new LoyaltyCampaign().setId(1).setName("Campaign 1").setType(LoyaltyCampaignType.LOYALTY_CAMPAIGN_TYPE_REWARD_POINT).setStatus(LoyaltyCampaignStatus.LOYALTY_CAMPAIGN_STATUS_ACTIVE),
    new LoyaltyCampaign().setId(2).setName("Campaign 2").setType(LoyaltyCampaignType.LOYALTY_CAMPAIGN_TYPE_REDEEM_POINT).setStatus(LoyaltyCampaignStatus.LOYALTY_CAMPAIGN_STATUS_INACTIVE),
];

const loyaltyServer: ILoyaltyServiceServer = {
    listLoyaltyCampaign: (call, callback) => {
        const request: ListLoyaltyCampaignRequest = call.request;
        const campaignIds = request.getLoyaltyCampaignIdsList();

        const response = new ListLoyaltyCampaignResponse();
        const data = new ListLoyaltyCampaignResponse.Data();

        if (campaignIds.length > 0) {
            data.setLoyaltyCampaignsList(mockLoyaltyCampaigns.filter(c => campaignIds.includes(c.getId())));
        } else {
            data.setLoyaltyCampaignsList(mockLoyaltyCampaigns);
        }

        response.setCode(0).setMessage("OK").setData(data);
        callback(null, response);
    },
    upsertLoyaltyCampaign: (call, callback) => {
        const request = call.request;
        const id = request.getId();
        const response = new UpsertLoyaltyCampaignResponse();
        const data = new UpsertLoyaltyCampaignResponse.Data();

        if (id > 0) {
            const existingCampaign = mockLoyaltyCampaigns.find(c => c.getId() === id);
            if (existingCampaign) {
                existingCampaign.setName(request.getName());
                existingCampaign.setType(request.getType());
                response.setCode(200).setMessage("Campaign updated successfully").setData(data.setId(id));
                callback(null, response);
                return;
            }
            response.setCode(5).setMessage("Campaign not found").setData(data);
            callback(null, response);
            return;
        }

        const newId = Math.max(...mockLoyaltyCampaigns.map(c => c.getId()), 0) + 1;
        const newCampaign = new LoyaltyCampaign()
            .setId(newId)
            .setName(request.getName())
            .setType(request.getType())
            .setStatus(LoyaltyCampaignStatus.LOYALTY_CAMPAIGN_STATUS_ACTIVE);

        mockLoyaltyCampaigns.push(newCampaign);
        response.setCode(0).setMessage("OK").setData(data.setId(newId));
        callback(null, response);
    },
};

const server = new grpc.Server();
server.addService(LoyaltyServiceService, loyaltyServer);

server.bindAsync("0.0.0.0:9443", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(`Failed to bind server: ${error.message}`);
        return
    }
    console.log(`Server running at http://0.0.0.0:${port}`);
});
