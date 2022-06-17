// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";


contract MyToken is ERC20, Ownable, ERC20Permit,ERC721Holder {
    IERC721 public collection;
    uint256 public tokenid;
    bool public initialized = false;
    bool public forsale= false;
    bool public canRedeem = false;
    uint256 public salePrice;

    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}
        function initialize(address _collection, uint256 _tokenId, uint256 _amount) external onlyOwner{
            require(!initialized,"Already initialized");
            require(_amount > 0);
            collection=IERC721(_collection);
            collection.safeTransferFrom(msg.sender, address(this),_tokenId);
            tokenid=_tokenId;
            initialized=true;
            _mint(msg.sender,_amount);
        }
    // function mint(address to, uint256 amount) public onlyOwner {
    //     _mint(to, amount);
    // }

    function putForsale (uint256 _price)external onlyOwner{
            salePrice = _price;
            forsale = true;
    }

    function purchase () external payable {
        require (forsale,"Not For Sale");
        require(msg.value > salePrice ,"The amount less than required");
        collection.transferFrom(address(this), msg.sender, tokenid);
        forsale=false;
        canRedeem = true;
    }

    function redeem (uint256 _amount) external {
        require (canRedeem, "Redemption not possible");
        uint256 totalEther = address(this).balance;
        uint256 totalRedeem = _amount * totalEther/ totalSupply();
        _burn (msg.sender, _amount);
        payable(msg.sender).transfer(totalRedeem);
    }
}
