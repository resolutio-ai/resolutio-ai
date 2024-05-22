import { createContext } from "react";
import {
    AttachLicenseTermsRequest,
    CancelDisputeRequest,
    CancelDisputeResponse,
    ClaimableRevenueRequest,
    ClaimableRevenueResponse,
    CollectRoyaltyTokensRequest,
    CollectRoyaltyTokensResponse,
    MintLicenseTokensRequest,
    MintLicenseTokensResponse,
    RaiseDisputeRequest,
    RaiseDisputeResponse,
    RegisterDerivativeRequest,
    RegisterDerivativeWithLicenseTokensResponse,
    RegisterIpAndAttachPilTermsResponse,
    RegisterIpResponse,
    RegisterRequest,
    ResolveDisputeRequest, 
    ResolveDisputeResponse,
    SnapshotRequest,
    SnapshotResponse
} from "@story-protocol/core-sdk"



type storyContextType = {
    register: (request: RegisterRequest) => Promise<RegisterIpResponse| null>,
    attachLicenseTerms: (request: AttachLicenseTermsRequest) => Promise<RegisterIpAndAttachPilTermsResponse| null>,
    mintLicenseTokens: (request: MintLicenseTokensRequest) => Promise<MintLicenseTokensResponse| null>,
    registerDerivativeWithLicenseTokens: (request: RegisterDerivativeRequest) => Promise<RegisterDerivativeWithLicenseTokensResponse| null>,
    collectRoyaltyTokens: (request: CollectRoyaltyTokensRequest) => Promise<CollectRoyaltyTokensResponse| null>,
    snapshot: (request: SnapshotRequest) => Promise<SnapshotResponse| null>,
    claimRevenue: (request: ClaimableRevenueRequest) => Promise<ClaimableRevenueResponse| null>,
    raiseDispute: (request: RaiseDisputeRequest) => Promise<RaiseDisputeResponse| null>,
    cancelDispute: (request: CancelDisputeRequest) => Promise<CancelDisputeResponse| null>,
    resolveDispute: (request: ResolveDisputeRequest) => Promise<ResolveDisputeResponse | null>
}


//Create a context
const storyContext = createContext<storyContextType>({
    register: async (request: RegisterRequest) => null,
    attachLicenseTerms: async (request: AttachLicenseTermsRequest) => null,
    mintLicenseTokens: async (request: MintLicenseTokensRequest) => null,
    registerDerivativeWithLicenseTokens: async (request: RegisterDerivativeRequest) => null,
    collectRoyaltyTokens: async (request: CollectRoyaltyTokensRequest) => null,
    snapshot: async (request: SnapshotRequest) => null,
    claimRevenue: async (request: ClaimableRevenueRequest) => null,
    raiseDispute: async (request: RaiseDisputeRequest) => null,
    cancelDispute: async (request: CancelDisputeRequest) => null,
    resolveDispute: async (request: ResolveDisputeRequest) => null
});

//Create a provider
//create a custom Hook