import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { MenuConfig } from '../../models/navigation-config';
import { getIcon } from '../../config/icons';

@Component({
  selector: 'app-menubar',
  imports: [ButtonModule, TranslateModule, LucideAngularModule],
  templateUrl: './menubar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent {
  readonly menus = input.required<MenuConfig[]>();
  readonly activeMenuId = input.required<string>();

  readonly menuSelected = output<MenuConfig>();

  protected selectMenu(menu: MenuConfig): void {
    this.menuSelected.emit(menu);
  }

  protected isActive(menuId: string): boolean {
    return this.activeMenuId() === menuId;
  }

  protected iconFor = getIcon;
}
