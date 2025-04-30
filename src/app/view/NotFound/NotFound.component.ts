import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NotFound',
  templateUrl: './NotFound.component.html',
  styleUrls: ['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}
