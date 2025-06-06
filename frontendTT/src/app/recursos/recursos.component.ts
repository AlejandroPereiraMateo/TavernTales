import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor],
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent {
  recursos: any[] = [];
}
