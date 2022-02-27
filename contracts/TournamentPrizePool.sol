//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
/*

    list participantAddresses
    total funds
    inputFee

    constructor( 
        inputFee, 
        tournamentId,
        firstPlacePercentage,
        secondPlacePercentage,
        thirdPlacePercentage
    )
    
    contract endpoints 

    join()
        checks amount payed is = to input fee
        adds to participant list 

    retreive funds()
        checks if caller is in participant list 

        checks oracle to see finishing position of wallet 
        
        1st 
            distribute first place payout 
        2nd
            distribute second place payout
        
        3rd 
            distribute third place payout 

*/

import "hardhat/console.sol";


contract TournamentPrizePool {
    string private greeting;
    address payable owner;
    uint _fee;
    
    constructor(uint fee) {
        owner = payable(msg.sender);
        _fee = fee;
        console.log("Deploying TournamentPrizePool with entryFee %d",fee);
    }

    receive() external payable {}
    fallback() external payable {}

    function join() public payable {
        // confirm there is enough funds 
        require(msg.value == _fee, "Incorrect Fee amount");

        // Transfer to address(this)
        bool sent = payable(address(this)).send(msg.value);
        require(sent, "Could not send entry fee");
    }

    function determineWinners(address first, address second, address third) public {
        // Transfer from address(this) to sender 
        require(msg.sender ==  0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB);
        
        // Calculate the winners then send funds 

    }
}
