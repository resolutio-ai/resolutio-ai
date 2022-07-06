// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ResolvedDisputeNft is ERC1155, Ownable {
    address contractAddress;
    uint256 public currentIndex = 1;

    mapping(uint256 => string) private _uris;

    constructor() ERC1155("") {}

    /// @dev Mints tokens for a resolved dispute
    /// @param amount the number of tokens to be minted
    /// @param _uri the URI to the information for the current dispute stored on IPFS
    function mintToken(uint256 amount, string memory _uri) external onlyOwner {
        uint256 _currentIndex = currentIndex;

        _mint(msg.sender, _currentIndex, amount, "");
        _uris[_currentIndex] = _uri;
        unchecked {
            _currentIndex++;
        }

        currentIndex = _currentIndex;
        setApprovalForAll(msg.sender, true);
    }

    /// @dev Get the Uri of a ResolvedDisputeNft
    /// @param tokenId TokenId for a ResolvedDisputeNft
    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    /// @dev Sets the Uri of a ResolvedDisputeNft
    /// @param tokenId TokenId for the ResolvedDisputeNft
    /// @param _uri the URI to the information for the current dispute stored on IPFS
    function setTokenUri(uint256 tokenId, string memory _uri)
        external
        onlyOwner
    {
        _uris[tokenId] = _uri;
    }    

    //Make the NFT non transferable
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override onlyOwner {}

    //Override the batch transfer function to, make the NFT non transferable
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override onlyOwner {}
}