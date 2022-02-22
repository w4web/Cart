import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG imports

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  exports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    TabViewModule,
    SidebarModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    InputSwitchModule,
    DropdownModule
  ]
})
export class PrimengLibModule { }
