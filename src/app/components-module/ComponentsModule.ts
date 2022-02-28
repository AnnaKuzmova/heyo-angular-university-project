import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponentComponent } from './components/alert-component/alert-component.component';
import { ButtonComponentComponent } from './components/button-component/button-component.component';

@NgModule({
  declarations: [ButtonComponentComponent, AlertComponentComponent],
  imports: [CommonModule],
  exports: [ButtonComponentComponent, AlertComponentComponent],
  bootstrap: [],
})
export class ComponentsModule {}
