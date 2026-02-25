import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { Filter, FilterX } from 'lucide-angular';
import { TooltipIconComponent } from '@shared/components/tooltip-icon/tooltip-icon.component';
import { ContextDataService } from '@core/services/context-data.service';
import type { Company } from '@models/company.model';
import type { Project } from '@models/project.model';

@Component({
  selector: 'app-context-selector',
  imports: [FormsModule, TranslateModule, SelectModule, CardModule, TooltipIconComponent],
  template: `
    <div class="w-full flex flex-col items-center">
      <div
        id="context-selector-panel"
        class="mx-auto w-[80%] sm:w-[88%] lg:w-full lg:max-w-[52rem] xl:max-w-[60rem] origin-top overflow-hidden transition-all duration-300 ease-in-out"
        [class.-mt-px]="isVisible()"
        [class.max-h-0]="!isVisible()"
        [class.opacity-0]="!isVisible()"
        [class.pointer-events-none]="!isVisible()"
        [class.max-h-[360px]]="isVisible()"
        [class.opacity-100]="isVisible()"
      >
        <p-card styleClass="context-selector-card">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div class="min-w-0 flex flex-col gap-1">
              <label for="company-select" class="text-sm opacity-80">
                {{ 'layoutBase.context.companyLabel' | translate }}
              </label>
              <p-select
                inputId="company-select"
                [options]="companies()"
                [ngModel]="selectedCompanyId()"
                optionLabel="name"
                optionValue="id"
                (ngModelChange)="onCompanyChange($event)"
                [placeholder]="'layoutBase.context.companyPlaceholder' | translate"
                [attr.aria-label]="'layoutBase.context.companyAria' | translate"
                appendTo="body"
              >
                <ng-template pTemplate="selectedItem" let-selected>
                  @if (selected) {
                    <span>{{ selected.name }}</span>
                  }
                </ng-template>

                <ng-template pTemplate="item" let-option>
                  <span>{{ option.name }}</span>
                </ng-template>
              </p-select>
            </div>

            <div class="min-w-0 flex flex-col gap-1">
              <label for="project-select" class="text-sm opacity-80">
                {{ 'layoutBase.context.projectLabel' | translate }}
              </label>
              <p-select
                inputId="project-select"
                [options]="projects()"
                [ngModel]="selectedProjectId()"
                optionLabel="name"
                optionValue="id"
                (ngModelChange)="onProjectChange($event)"
                [placeholder]="'layoutBase.context.projectPlaceholder' | translate"
                [attr.aria-label]="'layoutBase.context.projectAria' | translate"
                [disabled]="!selectedCompanyId()"
                appendTo="body"
              >
                <ng-template pTemplate="selectedItem" let-selected>
                  @if (selected) {
                    <span>{{ selected.name }}</span>
                  }
                </ng-template>

                <ng-template pTemplate="item" let-option>
                  <span>{{ option.name }}</span>
                </ng-template>
              </p-select>
            </div>
          </div>
        </p-card>
      </div>

      <div class="w-full flex justify-center" [class.-mt-px]="isVisible()">
        <button
          type="button"
          class="context-selector-toggle"
          (click)="toggleVisibility()"
          [attr.aria-label]="
            isVisible()
              ? ('layoutBase.context.hideSelectorAria' | translate)
              : ('layoutBase.context.showSelectorAria' | translate)
          "
          [attr.aria-expanded]="isVisible()"
          aria-controls="context-selector-panel"
        >
          <app-tooltip-icon
            [icon]="isVisible() ? FilterX : Filter"
            [size]="20"
            [tooltip]="
              isVisible()
                ? ('layoutBase.context.hideFiltersTooltip' | translate)
                : ('layoutBase.context.showFiltersTooltip' | translate)
            "
            [ariaLabel]="
              isVisible()
                ? ('layoutBase.context.hideSelectorAria' | translate)
                : ('layoutBase.context.showSelectorAria' | translate)
            "
          />
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host ::ng-deep .context-selector-card {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      .context-selector-toggle {
        position: relative;
        display: flex;
        height: 2.5rem;
        width: 3rem;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 0 0 var(--p-border-radius, 0.5rem) var(--p-border-radius, 0.5rem);
        border: 1px solid
          var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)));
        border-top: 0;
        background-color: var(--p-content-background, var(--p-surface-0));
        color: var(--p-text-color, var(--p-surface-700));
        transition:
          background-color 200ms ease-in-out,
          border-color 200ms ease-in-out,
          color 200ms ease-in-out,
          box-shadow 200ms ease-in-out;
      }

      .context-selector-toggle::before {
        content: '';
        position: absolute;
        top: 0;
        left: 1px;
        right: 1px;
        height: 1px;
        background-color: var(--p-content-background, var(--p-surface-0));
        pointer-events: none;
      }

      .context-selector-toggle:hover {
        color: var(--p-primary-color, var(--p-primary-500));
      }

      .context-selector-toggle:active {
        color: var(--p-primary-color, var(--p-primary-500));
      }

      .context-selector-toggle:focus {
        outline: none;
      }

      .context-selector-toggle:focus-visible {
        border-color: var(--p-primary-color, var(--p-primary-500));
        box-shadow: 0 0 0 2px
          color-mix(in srgb, var(--p-primary-color, var(--p-primary-500)) 22%, transparent);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextSelectorComponent {
  private readonly contextData = inject(ContextDataService);
  protected readonly Filter = Filter;
  protected readonly FilterX = FilterX;
  protected readonly isVisible = signal(true);

  protected readonly selectedCompanyId = signal<string | null>(null);
  protected readonly selectedProjectId = signal<string | null>(null);

  protected readonly companies = toSignal(this.contextData.getCompanies(), {
    initialValue: [] as Company[],
  });

  protected readonly projects = toSignal(
    toObservable(this.selectedCompanyId).pipe(
      switchMap((companyId) => {
        if (!companyId) {
          return of([] as Project[]);
        }

        return this.contextData.getProjectsByCompany(companyId);
      }),
    ),
    { initialValue: [] as Project[] },
  );

  constructor() {
    effect(() => {
      const currentProjectId = this.selectedProjectId();
      const availableProjects = this.projects();

      if (!currentProjectId) {
        return;
      }

      const isCurrentProjectAvailable = availableProjects.some(
        (project) => project.id === currentProjectId,
      );

      if (!isCurrentProjectAvailable) {
        this.selectedProjectId.set(null);
      }
    });
  }

  protected onCompanyChange(companyId: string | null): void {
    this.selectedCompanyId.set(companyId);
    this.selectedProjectId.set(null);
  }

  protected onProjectChange(projectId: string | null): void {
    this.selectedProjectId.set(projectId);
  }

  protected toggleVisibility(): void {
    this.isVisible.update((visible) => !visible);
  }
}
