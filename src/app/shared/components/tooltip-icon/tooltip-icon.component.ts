import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { TooltipModule } from 'primeng/tooltip';

type PrimeTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip-icon',
  imports: [LucideAngularModule, TooltipModule],
  template: `
    <span
      class="inline-flex items-center justify-center"
      [pTooltip]="tooltip()"
      [tooltipPosition]="tooltipPosition()"
      [attr.aria-label]="resolvedAriaLabel()"
    >
      <lucide-icon [img]="icon()" [size]="size()" />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipIconComponent {
  readonly icon = input.required<LucideIconData>();
  readonly tooltip = input.required<string>();
  readonly size = input<number>(16);
  readonly tooltipPosition = input<PrimeTooltipPosition>('top');
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.tooltip());
}
