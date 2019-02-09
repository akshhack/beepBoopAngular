import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.vehicle.auction{
   export enum ListingState {
      FOR_SALE,
      SOLD,
   }
   export class Traveller extends Participant {
      travellerId: string;
      name: string;
      qrCode: string;
   }
   export class BeepBoopAccount extends Asset {
      accountId: string;
      owner: Traveller;
      creditBalance: number;
      cashBalance: number;
   }
   export class CreditListing extends Asset {
      listingId: string;
      sellerAccount: BeepBoopAccount;
      price: number;
      numCredits: number;
      state: ListingState;
   }
   export class Buy extends Transaction {
      buyerAccount: BeepBoopAccount;
      listing: CreditListing;
   }
   export class Sell extends Transaction {
      sellerAccount: BeepBoopAccount;
      sellingPrice: number;
      numCredits: number;
   }
// }
