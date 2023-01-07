import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latitude: number = 41.015137;
  longitude: number = 28.979530;
  acikadres: string = '';
  postcode: number;
  apikey = 'AIzaSyAWiAV4gsdalkW5e79Hdq4YmQEZ-BjRMms';
  locationChosen = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  branchForm: FormGroup;
  ngOnInit() {
    this.getLocation();
    this.createBranchForm()
  }

  getLocation(){
    this.http.get('http://api.ipapi.com/api/check?access_key=8a23c8ee21875740a8879bc207cd5388')
      .subscribe(data => {
        this.latitude = data.latitude;
        console.log(data.latitude);
        console.log(data.longitude);
        this.longitude = data.longitude;
      })
  }

  createBranchForm(){
    this.branchForm = new FormGroup({
      button: new FormControl( 'Adresi Onayla'),
      address: new FormControl('', Validators.required),
      postcode: new FormControl()
    })
  }

  onChoseLocation(data){
    console.log(data);
    this.latitude = data.coords.lat;
    this.longitude = data.coords.lng;
    this.locationChosen = true;
  }

  reqAdress(reqlatitude?, reqlongitude?){
    if (this.locationChosen === true){
      console.log(reqlatitude);
      console.log(reqlongitude);
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${reqlatitude},${reqlongitude}&key=${this.apikey}`)
        .subscribe(data => {
          this.acikadres = data.results[0].formatted_address;
          if (data.results[0].address_components[6] != undefined){
            this.postcode = data.results[0].address_components[6].long_name;
          }
          console.log(this.acikadres);
        })
    }
  }
}
