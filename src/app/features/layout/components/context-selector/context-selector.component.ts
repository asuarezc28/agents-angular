import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ContextDataService } from '../../../../core/services/context-data.service';
import { Company, Project } from '../../../../core/mocks';

@Component({
  selector: 'app-context-selector',
  imports: [FormsModule, TranslateModule, SelectModule, CardModule],
  template: `
    <p-card>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label for="company-select" class="text-sm opacity-80">
            {{ 'workspace.context.companyLabel' | translate }}
          </label>
          <p-select
            inputId="company-select"
            [options]="companies()"
            [ngModel]="selectedCompanyId()"
            optionLabel="name"
            optionValue="id"
            (ngModelChange)="onCompanyChange($event)"
            [placeholder]="'workspace.context.companyPlaceholder' | translate"
            [attr.aria-label]="'workspace.context.companyAria' | translate"
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

        <div class="flex flex-col gap-1">
          <label for="project-select" class="text-sm opacity-80">
            {{ 'workspace.context.projectLabel' | translate }}
          </label>
          <p-select
            inputId="project-select"
            [options]="projects()"
            [ngModel]="selectedProjectId()"
            optionLabel="name"
            optionValue="id"
            (ngModelChange)="onProjectChange($event)"
            [placeholder]="'workspace.context.projectPlaceholder' | translate"
            [attr.aria-label]="'workspace.context.projectAria' | translate"
            [disabled]="!selectedCompanyId()"
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
export class ContextSelectorComponent {
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
