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

enum State{Active,InActive}

contract TournamentPrizePool {
    string private _name;
    address payable owner;
    uint _fee;
    uint _maxEntries;
    State _state;
    address[100]  _addresses;
    uint _enteredCount;
    

    constructor(){
        _state = State.InActive;
    }

    receive() external payable {}
    fallback() external payable {}

    function start(uint fee, uint maxEntries, string memory name) public payable{
        _fee = fee;
        _maxEntries = maxEntries;
        _state = State.Active;
        _enteredCount = 0;
        _name = name;
    }

    function name() public view returns(string memory){
        return _name;
    }

    function currentEntries() public view returns(uint){
        return _enteredCount;
    }

    function join() public payable {
        // confirm there is enough funds 
        require(msg.value >= (_fee *(1 ether)), "Incorrect Fee amount");
        require(_state == State.Active, "Inactive");

        // Transfer to address(this)
        bool sent = payable(address(this)).send(msg.value);
        require(sent, "Could not send entry fee");

        _addresses[_enteredCount] = msg.sender;
        _enteredCount = _enteredCount +1;
    }

    function determineWinners(address first) public {
        // Transfer from address(this) to sender 
        require(_state == State.Active, "Inactive");
        
        //Signed by account 3
        require(msg.sender ==  address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8), "Wrong sender");
        
        // Calculate the winners then send funds 
        // 1st 60%
        // 2nd 30%
        // 3rd 10%
        
        for(uint i =0; i < _enteredCount; i++){
            address a = _addresses[i];
            if(a == first){
                payable(a).transfer(address(this).balance);
            }
        }

        _state = State.InActive;
    }
}
