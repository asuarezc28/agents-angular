import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { toObservable, toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PanelViewFrameComponent } from '../../../layout/components/panel-view-frame/panel-view-frame.component';
import { ContextDataService } from '../../../../core/services/context-data.service';
import { Company, Project } from '../../../../core/mocks';

@Component({
  selector: 'app-settings-dashboard',
  imports: [
    PanelViewFrameComponent,
    ReactiveFormsModule,
    TabsModule,
    CardModule,
    SelectModule,
    ButtonModule,
    TranslateModule,
  ],
  template: `
    <app-panel-view-frame [titleKey]="''">
      <p-card>
        <p-tabs [value]="activeTab()" (valueChange)="onTabChange($event)">
          <p-tablist>
            <p-tab value="identity">{{ 'settingsDashboard.tabs.tab1' | translate }}</p-tab>
            <p-tab value="tab2">{{ 'settingsDashboard.tabs.tab2' | translate }}</p-tab>
            <p-tab value="tab3">{{ 'settingsDashboard.tabs.tab3' | translate }}</p-tab>
            <p-tab value="tab4">{{ 'settingsDashboard.tabs.tab4' | translate }}</p-tab>
          </p-tablist>

          <p-tabpanels>
            <p-tabpanel value="identity" class="pt-5">
              <h2 class="mb-4 text-2xl font-semibold">
                {{ 'settingsDashboard.identity.title' | translate }}
              </h2>

              <form [formGroup]="form" class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="min-w-0">
                  <label for="vertical-select" class="mb-2 block text-sm font-medium">{{
                    'settingsDashboard.identity.verticalLabel' | translate
                  }}</label>
                  <p-select
                    inputId="vertical-select"
                    [options]="companies()"
                    formControlName="companyId"
                    optionLabel="name"
                    optionValue="id"
                    [placeholder]="'settingsDashboard.identity.verticalPlaceholder' | translate"
                    appendTo="body"
                    class="w-full"
                  />
                </div>

                <div class="min-w-0">
                  <label for="segment-select" class="mb-2 block text-sm font-medium">{{
                    'settingsDashboard.identity.segmentLabel' | translate
                  }}</label>
                  <p-select
                    inputId="segment-select"
                    [options]="projects()"
                    formControlName="projectId"
                    optionLabel="name"
                    optionValue="id"
                    [placeholder]="'settingsDashboard.identity.segmentPlaceholder' | translate"
                    [disabled]="!selectedCompanyId()"
                    appendTo="body"
                    class="w-full"
                  />
                </div>
              </form>

              <div class="mt-6 border-t border-surface-200 pt-4 dark:border-surface-700">
                <button pButton type="button" class="w-full md:w-auto" [disabled]="!canSave()">
                  {{ 'settingsDashboard.actions.saveCurrentConfig' | translate }}
                </button>
              </div>
            </p-tabpanel>

            <p-tabpanel value="tab2"></p-tabpanel>
            <p-tabpanel value="tab3"></p-tabpanel>
            <p-tabpanel value="tab4"></p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </p-card>
    </app-panel-view-frame>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDashboardComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contextData = inject(ContextDataService);
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  protected readonly activeTab = signal('identity');

  protected readonly form = this.formBuilder.group({
    companyId: [null as string | null],
    projectId: [null as string | null],
  });

  protected readonly selectedCompanyId = toSignal(this.form.controls.companyId.valueChanges, {
    initialValue: this.form.controls.companyId.value,
  });

  protected readonly selectedProjectId = toSignal(this.form.controls.projectId.valueChanges, {
    initialValue: this.form.controls.projectId.value,
  });

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

  protected readonly canSave = computed(() => {
    return Boolean(this.selectedCompanyId() && this.selectedProjectId());
  });

  constructor() {
    this.form.controls.companyId.valueChanges.subscribe(() => {
      this.form.controls.projectId.setValue(null);
    });

    const initialLang = this.translate.currentLang || this.translate.getFallbackLang() || 'es';
    this.loadViewTranslations(initialLang);

    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(({ lang }) => {
      this.loadViewTranslations(lang);
    });
  }

  protected onTabChange(value: string | number | undefined): void {
    if (typeof value === 'string') {
      this.activeTab.set(value);
    }
  }

  private loadViewTranslations(lang: string): void {
    this.http
      .get<TranslationObject>(`./assets/i18n/${lang}/settings-dashboard.json`)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (translations) => {
          this.translate.setTranslation(lang, translations, true);
        },
      });
  }
}
