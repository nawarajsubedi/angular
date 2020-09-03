import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction/transaction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  form: FormGroup;
  public transactionInvalid: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      destination: ['9841014955', Validators.required],
      amount: ['', Validators.required]
    });

  }

  async onSubmit() {

    this.transactionInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const destination = this.form.get('destination').value;
        const amount = this.form.get('amount').value;

        await this.transactionService.makeTransaction(destination, amount)

      } catch (err) {
        this.transactionInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
