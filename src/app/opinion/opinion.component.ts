import { Component, OnInit, Input } from '@angular/core';
import { Opinion } from '../opinion'

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  @Input() opinion: Opinion;

  constructor() { }

  ngOnInit() {
  }

}
