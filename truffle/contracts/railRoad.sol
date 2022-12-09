// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract RailRoad {
    address public admin;
    address payable public adminPayble;
    uint public groupId;
    uint ticketPrice;
    mapping (string => bool) public TicketTypes;

    Card[] public cards;
    Ticket[] public tickets;

    struct Card {
        uint id;
        string name;
        uint price;
        uint discount;
        string image;
        
        string description;
        address owner;
        uint groupId;
    }

    struct Ticket {
        string ticketType;
        address owner;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "You're not the admin");
        _;
    }

    constructor(address _admin, uint _ticketPrice) {
        admin = _admin;
        adminPayble = payable(_admin);
        ticketPrice = _ticketPrice;

        // Tickets types
        TicketTypes["bus"]=true;
        TicketTypes["train"]=true;
        TicketTypes["subway"]=true;
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }

    /**************
         CARDS
    **************/

    function createCard(string memory name, uint price, uint count, uint discount, string memory image, string memory description) public onlyAdmin returns (Card[] memory) {
        for (uint i = 0; i < count; i++) {
            Card memory newCard = Card(cards.length, name, price, discount, image, description, address(0), groupId);
            cards.push(newCard);
        }
        groupId++;

        return cards;
    }

    function getMyCards() public view returns (Card[] memory) {
        uint count;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == msg.sender) {
                count++;
            }
        }

        Card[] memory myCards = new Card[](count);
        uint256 j;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == msg.sender) {
                myCards[j] = cards[i];
                j++;
            }
        }

        return myCards;
    }

    function getAvailableCards() public view returns (Card[] memory) {
        uint count;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == address(0)) {
                count++;
            }
        }

        Card[] memory availableCards = new Card[](count);
        uint256 j;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == address(0)) {
                availableCards[j] = cards[i];
                j++;
            }
        }

        return availableCards;
    }

    function retrieveAllCards() external view onlyAdmin returns (Card[] memory){
        return cards;
    }

    function buyCard(uint id) external payable returns (Card memory card) {

        for(uint i = 0; i < cards.length; i++) {
            if (cards[i].id == id) {
                require(cards[i].owner == address(0), "Card not available");
                require(cards[i].price == msg.value, "Probleme dans le paiement");
                cards[i].owner = msg.sender;
                return cards[i];

                //(bool sent, bytes memory data) = adminPayble.call{value: 1000000000000000000}("");
                //require(sent, "Failed to send Ether");
            }
        }
        require(false, "Card doesnt exist");
    }

    function giveCard(uint id, address userToGive) external returns (bool success) {
        for(uint i = 0; i < cards.length; i++) {
            if (cards[i].id == id) {
                require(cards[i].owner == msg.sender, "Card not yours");
                cards[i].owner = userToGive;
                return true;
            }
        }
        require(false, "Card doesnt exist");
    }

    /**************
        TICKETS
    **************/

    function ticketPriceAfterDiscount() external view returns (uint price) {
        uint amountDiscount = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == msg.sender && cards[i].discount > amountDiscount) {
                amountDiscount = cards[i].discount;
            }    
        }
        uint reduction = (ticketPrice * amountDiscount) / 100;
        return ticketPrice - reduction;
    }

    function buyTicket(string memory typeTicket) external payable returns (Ticket memory ticket) {

        // Get Discount
        uint amountDiscount = 0;
        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].owner == msg.sender && cards[i].discount > amountDiscount) {
                amountDiscount = cards[i].discount;
            }    
        }
        uint reduction = (ticketPrice * amountDiscount) / 100;

        require((ticketPrice - reduction) == msg.value, "Probleme dans le paiement");
        require(TicketTypes[typeTicket], "Ce type de ticket n'existe pas");
        Ticket memory newTicket = Ticket(typeTicket, msg.sender);
        tickets.push(newTicket);

        return newTicket;
    }

    function getMyTickets() public view returns (Ticket[] memory) {
        uint count;
        for (uint i = 0; i < tickets.length; i++) {
            if (tickets[i].owner == msg.sender) {
                count++;
            }
        }

        Ticket[] memory myTickets = new Ticket[](count);
        uint256 j;
        for (uint i = 0; i < tickets.length; i++) {
            if (tickets[i].owner == msg.sender) {
                myTickets[j] = tickets[i];
                j++;
            }
        }
        return myTickets;
    }
}