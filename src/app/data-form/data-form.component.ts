import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
  imports: [ReactiveFormsModule, 
            FormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatDialogModule,
            MatSelectModule,
            MatButtonModule],
  standalone: true,
})
export class DataFormComponent {
  form: FormGroup;
  edit = false;
  selectedId?: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.form = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
  ngOnInit(): void {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      this.edit = true;
      this.loadData(Number(id));
    }
    this.loadingData();
  }

  loadingData(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      this.dataService.getDataById(Number(id)).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data = { ...this.form.value };
      if (!this.edit) {
        delete data.id;
      }
      console.log('Form data:', data);
      if (this.edit) {
        this.dataService.updateData(data.id, data).subscribe(
          response => console.log('Update success:', response),
          error => console.error('Update error:', error)
          
        );
        alert("Record Updated Successfully!");
        this.router.navigate(['/']);
      } else {
        this.dataService.createData(data).subscribe(
          response => console.log('Create success:', response),
          error => console.error('Create error:', error)
        );
        alert("Record Created Successfully!");
        this.router.navigate(['/']);
      }
    }
  }

  loadData(id: number): void {
    this.dataService.getDataById(id).subscribe(data => {
      this.form.patchValue(data);
    });
  }
}
