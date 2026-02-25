import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ContextDataService } from '../../../core/services/context-data.service';
import type { Company } from '@models/company.model';
import type { Project } from '@models/project.model';

@Component({
  selector: 'company-project-selector',
  imports: [FormsModule, TranslateModule, SelectModule, CardModule],
  template: `
    <div class="w-full flex justify-center">
      <div
        class="mx-auto mt-2 w-[80%] sm:mt-3 sm:w-[88%] lg:w-full lg:max-w-[52rem] xl:max-w-[60rem]"
      >
        <p-card styleClass="context-selector-card">
          <div class="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
            <div class="min-w-0 grid grid-cols-[auto,1fr] items-center gap-3">
              <label for="company-select" class="text-sm opacity-80 whitespace-nowrap">
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

            <div class="min-w-0 grid grid-cols-[auto,1fr] items-center gap-3">
              <label for="project-select" class="text-sm opacity-80 whitespace-nowrap">
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
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProjectSelectorComponent {
  private readonly contextData = inject(ContextDataService);

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
}
