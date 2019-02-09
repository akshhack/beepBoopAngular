/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreditListingService } from './CreditListing.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-creditlisting',
  templateUrl: './CreditListing.component.html',
  styleUrls: ['./CreditListing.component.css'],
  providers: [CreditListingService]
})
export class CreditListingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  listingId = new FormControl('', Validators.required);
  sellerAccount = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  numCredits = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);

  constructor(public serviceCreditListing: CreditListingService, fb: FormBuilder) {
    this.myForm = fb.group({
      listingId: this.listingId,
      sellerAccount: this.sellerAccount,
      price: this.price,
      numCredits: this.numCredits,
      state: this.state
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreditListing.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.vehicle.auction.CreditListing',
      'listingId': this.listingId.value,
      'sellerAccount': this.sellerAccount.value,
      'price': this.price.value,
      'numCredits': this.numCredits.value,
      'state': this.state.value
    };

    this.myForm.setValue({
      'listingId': null,
      'sellerAccount': null,
      'price': null,
      'numCredits': null,
      'state': null
    });

    return this.serviceCreditListing.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'listingId': null,
        'sellerAccount': null,
        'price': null,
        'numCredits': null,
        'state': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.vehicle.auction.CreditListing',
      'sellerAccount': this.sellerAccount.value,
      'price': this.price.value,
      'numCredits': this.numCredits.value,
      'state': this.state.value
    };

    return this.serviceCreditListing.updateAsset(form.get('listingId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCreditListing.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCreditListing.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'listingId': null,
        'sellerAccount': null,
        'price': null,
        'numCredits': null,
        'state': null
      };

      if (result.listingId) {
        formObject.listingId = result.listingId;
      } else {
        formObject.listingId = null;
      }

      if (result.sellerAccount) {
        formObject.sellerAccount = result.sellerAccount;
      } else {
        formObject.sellerAccount = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.numCredits) {
        formObject.numCredits = result.numCredits;
      } else {
        formObject.numCredits = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'listingId': null,
      'sellerAccount': null,
      'price': null,
      'numCredits': null,
      'state': null
      });
  }

}
