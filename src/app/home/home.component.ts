import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../_services/exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currency?: string;
  rates = []

  constructor(private exchangeRate: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRate.getExchangeRate('USD').subscribe({
      next: data => {
        this.currency = data['base_code'];
        this.rates = data['rates']
      },
      error: err => {
        console.log(err)
      }
    }

    )
    /* this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    }); */
  }
}
