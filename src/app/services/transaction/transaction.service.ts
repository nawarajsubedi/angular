import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: any[] = []

  private subject = new Subject<any>();

  public user = new BehaviorSubject<string>("");

  constructor() {

    let transactionList = localStorage.getItem("transactions");
    if (transactionList != null) {

      this.transactions = JSON.parse(transactionList);

    }
  }

  async makeTransaction(destination: string, amount: number) {

    const id = uuid.v4();

    let transaction = { destination, amount, date: new Date().toISOString(), id };
    this.transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(this.transactions));

    this.subject.next(transaction);

  }

  getAllTransaction() {

    const tranList = [...this.transactions];

    return tranList;
  }

  getTransctions(): Observable<any> {
    return this.subject.asObservable();
  }
}