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
  templateUrl: './settings-dashboard.component.html',
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
