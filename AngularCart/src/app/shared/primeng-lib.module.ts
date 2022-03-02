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
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CarouselModule } from 'primeng/carousel';

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
    DropdownModule,
    MenubarModule,
    MenuModule,
    TieredMenuModule,
    BadgeModule,
    CarouselModule
  ]
})
export class PrimengLibModule { }
