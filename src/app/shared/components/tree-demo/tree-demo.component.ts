import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, FolderTree, RefreshCw } from 'lucide-angular';

@Component({
  selector: 'app-tree-demo',
  imports: [TreeModule, CardModule, ButtonModule, LucideAngularModule],
  template: `
    <p-card>
      <ng-template pTemplate="header">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-2">
            <lucide-icon [img]="FolderTree" class="text-info-600 dark:text-info-300" [size]="24" />
            <h3 class="text-lg font-semibold">PrimeNG Tree Component Demo</h3>
          </div>
          <p-button
            icon="pi pi-refresh"
            [text]="true"
            (onClick)="resetSelection()"
            pTooltip="Reset Selection"
          />
        </div>
      </ng-template>

      <div class="space-y-4">
        <!-- Selection Info -->
        @if (selectedNode()) {
          <div
            class="p-4 rounded bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
          >
            <p class="font-semibold">Selected Node:</p>
            <p class="opacity-80">{{ selectedNode()?.label }}</p>
          </div>
        }

        <!-- Tree Component -->
        <p-tree
          [value]="treeData()"
          selectionMode="single"
          [(selection)]="selectedNode"
          [style]="{ width: '100%' }"
        />

        <!-- Actions -->
        <div class="flex gap-2 pt-4 border-t border-surface-200 dark:border-surface-700">
          <p-button
            label="Expand All"
            icon="pi pi-plus"
            [outlined]="true"
            (onClick)="expandAll()"
          />
          <p-button
            label="Collapse All"
            icon="pi pi-minus"
            [outlined]="true"
            (onClick)="collapseAll()"
          />
        </div>
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {
  protected readonly FolderTree = FolderTree;
  protected readonly RefreshCw = RefreshCw;

  selectedNode = signal<TreeNode | null>(null);

  treeData = signal<TreeNode[]>([
    {
      key: '0',
      label: 'Project Root',
      data: 'Folder',
      icon: 'pi pi-fw pi-folder',
      expanded: true,
      children: [
        {
          key: '0-0',
          label: 'src',
          data: 'Folder',
          icon: 'pi pi-fw pi-folder',
          expanded: true,
          children: [
            {
              key: '0-0-0',
              label: 'app',
              data: 'Folder',
              icon: 'pi pi-fw pi-folder',
              children: [
                {
                  key: '0-0-0-0',
                  label: 'components',
                  data: 'Folder',
                  icon: 'pi pi-fw pi-folder',
                  children: [
                    {
                      key: '0-0-0-0-0',
                      label: 'tree-demo.component.ts',
                      data: 'TypeScript Component',
                      icon: 'pi pi-fw pi-file',
                    },
                    {
                      key: '0-0-0-0-1',
                      label: 'chart.component.ts',
                      data: 'TypeScript Component',
                      icon: 'pi pi-fw pi-file',
                    },
                  ],
                },
                {
                  key: '0-0-0-1',
                  label: 'services',
                  data: 'Folder',
                  icon: 'pi pi-fw pi-folder',
                  children: [
                    {
                      key: '0-0-0-1-0',
                      label: 'theme.service.ts',
                      data: 'TypeScript Service',
                      icon: 'pi pi-fw pi-file',
                    },
                  ],
                },
                {
                  key: '0-0-0-2',
                  label: 'app.ts',
                  data: 'TypeScript',
                  icon: 'pi pi-fw pi-file',
                },
              ],
            },
            {
              key: '0-0-1',
              label: 'assets',
              data: 'Folder',
              icon: 'pi pi-fw pi-folder',
              children: [
                {
                  key: '0-0-1-0',
                  label: 'i18n',
                  data: 'Folder',
                  icon: 'pi pi-fw pi-folder',
                  children: [
                    {
                      key: '0-0-1-0-0',
                      label: 'en',
                      data: 'Folder',
                      icon: 'pi pi-fw pi-folder',
                    },
                    {
                      key: '0-0-1-0-1',
                      label: 'es',
                      data: 'Folder',
                      icon: 'pi pi-fw pi-folder',
                    },
                  ],
                },
                {
                  key: '0-0-1-1',
                  label: 'images',
                  data: 'Folder',
                  icon: 'pi pi-fw pi-folder',
                },
              ],
            },
            {
              key: '0-0-2',
              label: 'styles',
              data: 'Folder',
              icon: 'pi pi-fw pi-folder',
              children: [
                {
                  key: '0-0-2-0',
                  label: 'primeng-theme.css',
                  data: 'CSS',
                  icon: 'pi pi-fw pi-file',
                },
              ],
            },
            {
              key: '0-0-3',
              label: 'styles.css',
              data: 'CSS',
              icon: 'pi pi-fw pi-file',
            },
            {
              key: '0-0-4',
              label: 'main.ts',
              data: 'TypeScript',
              icon: 'pi pi-fw pi-file',
            },
          ],
        },
        {
          key: '0-1',
          label: 'node_modules',
          data: 'Folder',
          icon: 'pi pi-fw pi-folder',
          children: [
            {
              key: '0-1-0',
              label: 'angular',
              data: 'Package',
              icon: 'pi pi-fw pi-folder',
            },
            {
              key: '0-1-1',
              label: 'primeng',
              data: 'Package',
              icon: 'pi pi-fw pi-folder',
            },
            {
              key: '0-1-2',
              label: 'lucide-angular',
              data: 'Package',
              icon: 'pi pi-fw pi-folder',
            },
          ],
        },
        {
          key: '0-2',
          label: 'package.json',
          data: 'JSON',
          icon: 'pi pi-fw pi-file',
        },
        {
          key: '0-3',
          label: 'tailwind.config.ts',
          data: 'TypeScript Config',
          icon: 'pi pi-fw pi-file',
        },
        {
          key: '0-4',
          label: 'tsconfig.json',
          data: 'JSON',
          icon: 'pi pi-fw pi-file',
        },
        {
          key: '0-5',
          label: 'README.md',
          data: 'Markdown',
          icon: 'pi pi-fw pi-file',
        },
      ],
    },
  ]);

  expandAll(): void {
    this.treeData.update((nodes) => this.expandRecursive(nodes, true));
  }

  collapseAll(): void {
    this.treeData.update((nodes) => this.expandRecursive(nodes, false));
  }

  resetSelection(): void {
    this.selectedNode.set(null);
  }

  private expandRecursive(nodes: TreeNode[], isExpand: boolean): TreeNode[] {
    return nodes.map((node) => ({
      ...node,
      expanded: isExpand,
      children: node.children ? this.expandRecursive(node.children, isExpand) : undefined,
    }));
  }
}
