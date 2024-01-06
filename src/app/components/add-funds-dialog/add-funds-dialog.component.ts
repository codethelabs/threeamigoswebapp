import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-funds-dialog',
  templateUrl: './add-funds-dialog.component.html',
  styleUrls: ['./add-funds-dialog.component.css'],
})
export class AddFundsDialogComponent {
  amount: any = 0;

  constructor(public dialogRef: MatDialogRef<AddFundsDialogComponent>) {}

  addfunds = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  closeDialog() {
    if (this.addfunds.valid) {
      // Access the value from the form control
      this.amount = this.addfunds.get('amount')?.value;

      // Close the dialog and pass the amount directly
      this.dialogRef.close(this.amount);
    }
  }
}
