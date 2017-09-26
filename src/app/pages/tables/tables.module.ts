import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ModalComponent } from '../ui-features/modals/modal/modal.component';

const components = [
  ModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  providers: [
    SmartTableService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class TablesModule { }
