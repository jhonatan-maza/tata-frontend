import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../_services/client.service';

@Component({
  selector: 'client-user',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  listClient?: [];
  messageList?: string
  client: any
  messageClient?: string
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClient()
  }

  getClient() {
    this.clientService.getClient().subscribe({
      next: data => {
        console.log(data)
        this.listClient = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.messageList = res.message;
          } catch {
            this.messageList = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.messageList = `Error with status: ${err.status}`;
        }
      }
    });
  }

  postClient() {
    this.clientService.postClient(
      this.registerForm.controls['name'].value,
      this.registerForm.controls['lastName'].value
    ).subscribe({
      next: data => {
        console.log(data)
        this.client = data;
        this.registerForm.reset()
        this.getClient()
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.messageClient = res.message;
          } catch {
            this.messageClient = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.messageClient = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
