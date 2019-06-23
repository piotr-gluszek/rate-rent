/// <reference types="@types/googlemaps" />
import { Marker } from '../marker';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { PlaceService } from '../place.service';
// import { } from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  latitude = 50.26419015460985;
  longitude = 19.02341743655643;
  mapType = 'roadmap';
  zoom = 13;
  gestureHandling = 'cooperative';
  marker: Marker;
  searchControl: FormControl;
  @ViewChild("search")
  searchElementRef: ElementRef;

  constructor(
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone,
    private placeService: PlaceService) { 
    this.searchControl = new FormControl();
    }

  ngOnInit() {
   //create search FormControl
   

   //load Places Autocomplete
   this.mapsApiLoader.load().then(() => {
     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
       types: ["address"]
     });
     autocomplete.addListener("place_changed", () => {
       this.ngZone.run(() => {

         //get the place result
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

         // emit place id
         this.placeService.placeIdSubject.next(place.id);
         console.log(`map.component.ts: place id emitted: ${place.id}`);

         if (place.geometry === undefined || place.geometry === null) {
           return;
         }

         //set latitude, longitude and zoom
         this.latitude = place.geometry.location.lat();
         this.longitude = place.geometry.location.lng();
         this.zoom = 16;
         this.placeMarker(this.latitude, this.longitude);
       });
     });
   }); 
}

  placeMarker(lat: number, lng: number) {
    console.log('Marker should be placed now')
    this.marker = {
      latitude: lat,
      longitude: lng,
      alpha: 0.8
    };
  }
}
