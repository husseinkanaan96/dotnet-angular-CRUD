import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  data: any[] = [];
  selectedItem: any;
  countries: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  addRecord(): void {
    this.router.navigate(['/create']);
  }

  updateRecord(): void {
    if (this.selectedItem) {
      this.router.navigate(['/edit/id'], { queryParams: { id: this.selectedItem.id } });
    } else {
      alert('Please Select a Record');
    }
  }

  deleteRecord(): void {
    if (this.selectedItem) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: { message: 'Are You Sure You Want To Delete This Record?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          this.dataService.deleteData(this.selectedItem.id).subscribe(() => {
            this.loadData();
            this.selectedItem = null;
          });
        }
      });
    } else {
      alert('Please Select a Record');
    }
  }

  onRowClick(item: any): void {
    this.selectedItem = item;
  }
}
