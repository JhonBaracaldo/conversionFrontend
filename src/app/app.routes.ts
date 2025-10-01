import { Routes } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { ExportComponent } from './export/export.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'backup', pathMatch: 'full' },
	{ path: 'backup', component: BackupComponent },
	{ path: 'export', component: ExportComponent },
];
