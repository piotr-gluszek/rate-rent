import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-opinion-list',
  templateUrl: './opinion-list.component.html',
  styleUrls: ['./opinion-list.component.css']
})
export class OpinionListComponent implements OnInit {

  constructor(
    private placeService: PlaceService) { }

 place: any
  
  ngOnInit() {
    this.placeService.placeIdSubject.subscribe(
      placeId => {
        this.placeService.getOpinions(placeId).subscribe(
          docRef => {
            this.place = docRef.data()
            console.log('Document data:')
            console.log(this.place)
          }
        )
      }
    ) 
  }
}
