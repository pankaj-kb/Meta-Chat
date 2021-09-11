pragma solidity ^0.4.18;
contract ChatWei {
    struct contractProperties {
        address[] registeredUserAddress;
    }

    ContractProperties contractProperties;

    function ChatWei public {
        //constructor
        contractProperties.ChatWeiOwner = msg.sender;
    }

    function getContractProperties() public view returns (address, address[]) {
        return (contractProperties,ChatWeiOwner, contractProperties.registeredUserAddress);
    }
}