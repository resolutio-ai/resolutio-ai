// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

/// @title DisputePool
/// @author Ogubuike Alexandra
/// @notice Handles Functionalities involved in Resolutio's Dispute Resolution
contract Disputepool {
    uint256 private _itemIds;
    uint256 private resolvedItemsIds;

    /// @dev A structure to hold the state of a given dispute.
    /// @param disputeId The Id that identifies a particular dispute within the contract.
    /// @param tokenId
    /// @param resolved A boolean to tell if dispute has been resolved.
    /// @param isOpenForApplication A boolean to tell if arbiters can still apply to resolve dispute.
    /// @param HasSelectedArbiters A boolean to tell if arbiters have been selected for dispute
    struct Dispute {
        uint256 disputeId;
        uint256 tokenId;
        bool resolved;
        bool isOpenForApplication;
        bool HasSelectedArbiters;
    }

    //// @dev links the ItemId (disputeId) to a dispute
    mapping(uint256 => Dispute) itemIdToDispute;

    //// @dev links a dispute Id to an array containing the addresses of arbiters selected for the dispute's resolution.
    mapping(uint256 => address[]) disputeIdToArbiters;

    /// @dev Gets the selected addresses for a dispute
    /// @param id The disputeId for the dispute
    /// @return an array of addresses belonging to selected arbiters
    function getAddressesForDispute(uint256 id)
        public
        view
        returns (address[] memory)
    {
        return disputeIdToArbiters[id];
    }

    /// @dev Adds an arbiter to a dispute pool
    /// @param _user the wallet address of the arbiter to be added
    /// @param id The disputeId for the dispute
    function AddUserToDisputePool(address _user, uint256 id) public payable {
        //Check that dispute has not been resolved
        //Check that we are still collecting address for the dispute
        //Check that monery being sent ==
        require(
            itemIdToDispute[id].resolved &&
                itemIdToDispute[id].isOpenForApplication,
            "This Dispute Has Already been Resolved or the dispute is closed for application"
        );
        disputeIdToArbiters[id].push(_user);
    }

    /// @dev Gets arbiters that corresponds to the index being passed as parameters
    /// @param one first random number
    /// @param two second random number
    /// @param three third random number
    /// @param id The disputeId for the dispute
    //// @return a tuple containing the addresses selected
    function getRandomArbiters(
        uint256 one,
        uint256 two,
        uint256 three,
        uint256 id
    )
        external
        returns (
            address x,
            address y,
            address z
        )
    {
        //Make sure that dispute id actually exists ==> if (bytes(m1[msg.sender]).length
        require(!itemIdToDispute[id].resolved, "Dispute Id"); //Test this to know what happens when i try to get arbiters from a dispute that has not been created
        //Make sure this can only be done once
        require(
            itemIdToDispute[id].HasSelectedArbiters,
            "Request for random arbiters has already occured"
        );
        address[] memory addresses = disputeIdToArbiters[id];

        x = addresses[one];
        y = addresses[two];
        z = addresses[three];

        itemIdToDispute[id].HasSelectedArbiters = false;
        disputeIdToArbiters[id] = [x, y, z];
        return (x, y, z);
    }

    /// @dev Set a dispute as resolved
    /// @param itemId The disputeId for the dispute
    function resolveDispute(uint256 itemId) public {
        Dispute storage dispute = itemIdToDispute[itemId];
        dispute.resolved = true;
        resolvedItemsIds += 1;
    }

    /// @dev Close a dispute so that arbiters can no longer apply to it for participation
    /// @param itemId The disputeId for the dispute
    function closeDisputeApplication(uint256 itemId) external {
        Dispute storage dispute = itemIdToDispute[itemId];
        dispute.isOpenForApplication = false;
    }

    /// @dev Create a new dispute
    /// @param tokenId The NFT tokenId of the dispute (assuming the dispute is created as an NFT)
    function createDispute(uint256 tokenId) external {
        //require we are not creating the token twice!
        uint256 count = _itemIds;

        count += 1;

        uint256 itemId = count;

        itemIdToDispute[itemId] = Dispute(itemId, tokenId, false, true, false);

        _itemIds = count;
    }

    /// @dev Gets all dispute ever created in the smart contract
    /// @return an array of disputes
    function getAllDisputes() public view returns (Dispute[] memory) {
        uint256 itemCount = _itemIds;
        uint256 currentIndex = 0;

        Dispute[] memory items = new Dispute[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            Dispute memory currentDispute = itemIdToDispute[currentId];
            items[currentIndex] = currentDispute;
            currentIndex += 1;
        }
        return items;
    }

    /// @dev Gets all unresolved disputes in the smart contract
    /// @return an array of disputes
    function getAllUnResolvedDisputes() public view returns (Dispute[] memory) {
        uint256 itemCount = _itemIds;
        uint256 unresolvedDispute = _itemIds - resolvedItemsIds;
        uint256 currentIndex = 0;

        Dispute[] memory unresolvedDisputes = new Dispute[](unresolvedDispute);
        for (uint256 i = 0; i < itemCount; i++) {
            if (!itemIdToDispute[i + 1].resolved) {
                uint256 currentId = i + 1;
                Dispute memory currentItem = itemIdToDispute[currentId];
                unresolvedDisputes[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return unresolvedDisputes;
    }
}