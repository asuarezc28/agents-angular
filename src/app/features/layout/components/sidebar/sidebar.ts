import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { PanelConfig } from '../../models/navigation-config';
import { getIcon } from '../../config/icons';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, TranslateModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly panels = input.required<PanelConfig[]>();
  readonly activePanelId = input.required<string>();

  readonly panelSelected = output<PanelConfig>();

  protected selectPanel(panel: PanelConfig): void {
    this.panelSelected.emit(panel);
  }

  protected isActive(panelId: string): boolean {
    return this.activePanelId() === panelId;
  }

  protected iconFor = getIcon;
}
