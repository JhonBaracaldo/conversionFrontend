import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importar ReactiveFormsModule

@Component({
    selector: 'app-backup',
    standalone: true,  // Asegúrate de que sea standalone
    imports: [ReactiveFormsModule],  // Importa ReactiveFormsModule aquí si es standalone
    templateUrl: './backup.component.html',
    styleUrls: ['./backup.component.css']
})
export class BackupComponent {
    fileForm: FormGroup;
    @ViewChild('fileInput') fileInput!: ElementRef;

    constructor(private fb: FormBuilder) {
        this.fileForm = this.fb.group({
            file: [null, [Validators.required]]
        });
    }

    // Este método se dispara cuando se elige un archivo desde el explorador de archivos
    onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.fileForm.patchValue({
                file: file
            });
        }
    }

    // Lógica para arrastrar y soltar el archivo
    onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        if (file) {
            this.fileForm.patchValue({
                file: file
            });
        }
    }

    // Método para manejar el envío del formulario
    onSubmit(): void {
        if (this.fileForm.valid) {
            const formData = new FormData();
            formData.append('file', this.fileForm.get('file')?.value);

            // Aquí envías el archivo al servidor o haces lo que necesites
            console.log('Subiendo archivo...', formData);
        }
    }

    // Lógica para la restauración del archivo
    restoreBackup(): void {
        console.log('Restaurando el backup...');
    }
}
