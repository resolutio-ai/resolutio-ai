// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArbiterNFT is
    ERC721("ResolutioArbiter", "Arbiter"),
    Ownable,
    ReentrancyGuard
{
    struct Arbiter {
        bool isActive;
        uint256 mintCount;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// @dev links a user address to their arbiter details
    mapping(address => Arbiter) whitelistedAddresses;

    /// @dev Modifier to confirm that address is whitelisted
    modifier isWhitelisted(address _address) {
        require(
            whitelistedAddresses[_address].isActive,
            "Whitelist: You need to be whitelisted"
        );
        _;
    }

    /// @dev Adds a user to the list of selected or whitelisted arbiters stored within the smart contract.
    /// @param _addressToWhitelist, the wallet address of the arbiter to be added.
    function addUser(address _addressToWhitelist) public onlyOwner {
        whitelistedAddresses[_addressToWhitelist].isActive = true;
    }

    /// @dev Verifies that a user's wallet address is amongst the selected addresses stored in the smart contract.
    /// @param _whitelistedAddress, the wallet address of the arbiter to be added.
    /// @return a boolean representing the result of the verification
    function verifyUser(address _whitelistedAddress)
        public
        view
        returns (bool)
    {
        bool userIsWhitelisted = whitelistedAddresses[_whitelistedAddress]
            .isActive;
        return userIsWhitelisted;
    }

    /// @notice Should transfer NFT from one user to another
    /// @dev Since the Arbiter NFT is not to be transferrable, Transfer function has been overriden to prevent transfer of ArbiterNFT
    /// @param from address of the sender of the NFT
    /// @param to address of the receiver of the NFT
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {}

    /// @notice Should mint and send token to caller.
    /// @dev This function is only callable by selected/whitelisted arbiters.
    /// @dev This function can only be called once per arbiter.
    /// @return the token Id of the minted NFT
    function createToken()
        public
        isWhitelisted(msg.sender)
        returns (uint256)
    {
        require(
            whitelistedAddresses[msg.sender].mintCount == 0,
            "You have already minted your membership token"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        whitelistedAddresses[msg.sender].mintCount = 1;
        return newItemId;
    }
}