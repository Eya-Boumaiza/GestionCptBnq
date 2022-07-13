import { Component, OnInit } from '@angular/core';
import { Client } from 'app/shared/Models/Client';
import { DataService } from 'app/data.service';
import { ClientService } from 'app/shared/Services/SrvClient/client.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/operation', title: 'Operations',  icon: 'library_books', class: '' },
    { path: '/transaction', title: 'Transactions',  icon: 'library_books', class: '' },
    // { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
];

export const ROUTESclient: RouteInfo[] = [
  { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
  { path: '/operation', title: 'Operations',  icon: 'credit_card', class: '' },
  { path: '/transaction', title: 'Transactions',  icon: 'library_books', class: '' },
];

export const ROUTESbanquier: RouteInfo[] = [
  { path: '/ConsulterClient', title: 'Liste des Clients',  icon: 'library_books', class: '' },
  { path: '/ConsulterTransaction', title: 'Liste des Transactions',  icon: 'library_books', class: '' },
  { path: '/NotificationGerant', title: 'Notifications',  icon: 'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

 // @Input()  parentData;
 cdClient = '';
 public resultatt: string
 public _ClientModel: Client[]
 constructor(private data2: DataService, public _ClientService: ClientService, ) {}



  ngOnInit() {
   // this.menuItems = ROUTES.filter(menuItem => menuItem);

   this.data2.share2.subscribe(x => this.resultatt = x);
    console.log(this.resultatt)
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (this.resultatt === 'client') {this.menuItems = ROUTESclient.filter(menuItem => menuItem);
    }

    if (this.resultatt === 'banquier') {this.menuItems = ROUTESbanquier.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
