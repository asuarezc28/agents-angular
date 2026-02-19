import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipIconComponent } from '../../../../shared/components/tooltip-icon/tooltip-icon.component';
import { PanelConfig } from '../../models/navigation-config';
import { getIcon } from '../../config/icons';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, TranslateModule, TooltipIconComponent],
  templateUrl: './sidebar.html',
  styles: [
    `
      .sidebar-frame {
        border-color: var(
          --p-card-border-color,
          var(--p-content-border-color, var(--p-surface-300))
        );
      }

      .sidebar-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
      }

      .sidebar-icon-btn.p-button {
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        display: grid;
        place-items: center;
        border-radius: 0.9rem;
        border: 1px solid transparent;
        background: transparent;
        color: var(--p-text-muted-color);
        line-height: 1;
        box-shadow: none;
        transition:
          background-color 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease,
          color 180ms ease;
      }

      .sidebar-icon-btn.p-button app-tooltip-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .sidebar-icon-btn.p-button:hover {
        color: var(--p-primary-color);
      }

      .sidebar-icon-btn--active.p-button {
        border-color: color-mix(in srgb, var(--p-primary-color) 36%, transparent);
        background-color: color-mix(in srgb, var(--p-primary-color) 16%, transparent);
        color: var(--p-primary-color);
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--p-primary-color) 18%, transparent),
          0 8px 20px color-mix(in srgb, var(--p-primary-color) 20%, transparent);
      }

      @media (min-width: 1024px) {
        .sidebar-content {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    `,
  ],
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

  protected buttonClass(panelId: string): string {
    return this.isActive(panelId)
      ? 'sidebar-icon-btn sidebar-icon-btn--active'
      : 'sidebar-icon-btn';
  }

  protected iconFor = getIcon;
}
