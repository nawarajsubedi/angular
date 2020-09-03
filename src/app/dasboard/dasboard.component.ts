import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from '../services/transaction/transaction.service';
import { DataSource } from '@angular/cdk/table';

export interface Transaction {
  destination: string;
  amount: number;
  date: number;
}

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit, OnDestroy {

  transactionList: Transaction[] = [];
  subscription: Subscription;
  totalAmount: number = 0;
  transactionCount: number = 0;

  displayedColumns: string[] = ['destination', 'amount', 'date'];

  constructor(private transactionService: TransactionService) {

    let transactions = this.transactionService.getAllTransaction();
    if (transactions != null) {

      const sum = transactions
        .reduce((sum, current) => sum + current.amount, 0);
      this.totalAmount += sum;
      this.transactionCount = transactions.length;

      this.transactionList = transactions;

      console.log('constructor tran list:', this.transactionList)

      // this.transactionList = [...this.transactionList]

    }

    this.subscription = this.transactionService.getTransctions().subscribe(transaction => {

      this.totalAmount += parseFloat(transaction.amount);
      this.transactionCount += 1;

      // this.transactionList.push(transaction);
      console.log('before tran list:', this.transactionList)
      // console.log('before tran:', transaction)

      this.transactionList = [...this.transactionList, transaction]

      // console.log('tran list:', this.transactionList)
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}




