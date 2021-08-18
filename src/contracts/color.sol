pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //import base functionality
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; //import totalsupply()

contract Color is ERC721, IERC721Enumerable { // We must extends IERC721Enumerable 
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {}

    function mint(string memory _color) public {
      require(!_colorExists[_color]);
        colors.push(_color);
        uint256 _id = colors.length-1;
        _mint(msg.sender,_id);
        _colorExists[_color] = true;
    }
    

    // And must override below three functions

    function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns (uint256) {
        // You need update this logic.
      // ...
      
      return 3;
       
    }

    function totalSupply() external  view override returns (uint256) {
      // You need update this logic.
      // ...
      uint256 length = colors.length;
      return length;
    }

    function tokenByIndex(uint256 index) external view  override returns (uint256) {
      // You need update this logic.
      // ...
      return 5;
    }
}