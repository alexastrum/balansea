//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./BseaToken.sol";
import "./RewardsPool.sol";
import "./BseaNFT.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract Minter {
	// State Variables
	address public immutable owner;
    BseaToken bseaToken;
    BseaNFT bseaNFT;
    address rewardsPool;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event DepositReceived(
		address indexed sender,
		uint256 value
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner, address _rewardsPool, BseaToken _bseaToken, BseaNFT _bseaNFT) {
		owner = _owner;
        rewardsPool = _rewardsPool;
        bseaToken = _bseaToken;
        bseaNFT = _bseaNFT;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {
        // TODO: Compute membership expiration based on amount

        // TODO: Mint reward NFT and send to sender
        bseaNFT.safeMint(msg.sender);

        // TODO: Mint reward tokens and add to reward pool
        bseaToken.mint(rewardsPool, 1);

        // TODO: Mint reward tokens and add to liquidity pool

		emit DepositReceived(msg.sender, msg.value);
    }
}
