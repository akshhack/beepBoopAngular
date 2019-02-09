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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { BeepBoopAccountComponent } from './BeepBoopAccount/BeepBoopAccount.component';
import { CreditListingComponent } from './CreditListing/CreditListing.component';

import { TravellerComponent } from './Traveller/Traveller.component';

import { BuyComponent } from './Buy/Buy.component';
import { SellComponent } from './Sell/Sell.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'BeepBoopAccount', component: BeepBoopAccountComponent },
  { path: 'CreditListing', component: CreditListingComponent },
  { path: 'Traveller', component: TravellerComponent },
  { path: 'Buy', component: BuyComponent },
  { path: 'Sell', component: SellComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
