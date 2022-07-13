import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { OperationsComponent } from '../../operations/operations.component';
import {  TransactionsComponent} from '../../transactions/transactions.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AppComponent } from 'app/app.component';
import { ConsulterClientsComponent } from 'app/consulter-clients/consulter-clients.component';
import { ConsulterTransactionComponent } from 'app/consulter-transaction/consulter-transaction.component';
import { NotifGerantComponent } from 'app/notif-gerant/notif-gerant.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
   // { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'operation',   component: OperationsComponent },
    { path: 'transaction',   component: TransactionsComponent },
    // { path: 'table-list',     component: TableListComponent },
//  { path: 'typography',     component: TypographyComponent },
   // { path: 'icons',          component: IconsComponent },
   // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  //  { path: 'upgrade',        component: UpgradeComponent },
  { path: 'ConsulterClient',   component: ConsulterClientsComponent },
  { path: 'ConsulterTransaction',   component: ConsulterTransactionComponent },
  { path: 'NotificationGerant',   component: NotifGerantComponent },
  // { path: 'transaction',   component: TransactionsComponent },
];
