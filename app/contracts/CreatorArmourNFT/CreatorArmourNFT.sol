// // SPDX-License-Identifier: MIT
// // Compatible with OpenZeppelin Contracts ^5.0.0
// pragma solidity ^0.8.20;


//NOTE: COMMENTED BECAUSE IT IS NOT DIRECTLY NEEDED FOR THIS REPO TO FUNCTION
//NOTE: COMMENTED BECAUSE IT IS NOT DIRECTLY NEEDED FOR THIS REPO TO FUNCTION
//NOTE: COMMENTED BECAUSE IT IS NOT DIRECTLY NEEDED FOR THIS REPO TO FUNCTION

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract CreatorArmourNFT is ERC721, ERC721URIStorage, Ownable {
//     uint256 private _nextTokenId;
// //Date: May 19 2024 => 
// //Note: Github Text Editor Is Having A Glitch Hence The Typo In Constructore
//     constructor(address initialOwner)
//         ERC721("CreatorArmour", "CTA")
//         Ownable(initalOwner) {}

//     function safeMint(string memory uri) public {
//         uint256 tokenId = _nextTokenId++;
//         _safeMint(msg.sender, tokenId);
//         _setTokenURI(tokenId, uri);
//      }

//     // The following functions are overrides required by Solidity.

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }

//     function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }
// }