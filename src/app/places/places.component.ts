import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { PlacesService } from './places.service';
import { debounce } from 'rxjs/operators';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  public places:any[]=[];
  public myForm!: FormGroup;
  public observable!: Subscription;
  constructor(private placesService:PlacesService,
              private _hotkeysService: HotkeysService,
              private elementRef: ElementRef) {

    this._hotkeysService.add(new Hotkey('ctrl+/', (event: KeyboardEvent): boolean => {
      this.elementRef.nativeElement.querySelector('#search').focus();
      return false; 
    }));

    this.myForm = new FormGroup({
      searchPlace: new FormControl()
    });

  }
  
  ngOnInit(): void {
    this.observable=this.myForm.valueChanges
    .pipe(
      debounce(() => interval(500))
    ).subscribe(()=>{
      this.placesService.getPlaces('',this.myForm.value.searchPlace).subscribe(res=>{
        console.log(res);
        this.places=res.data;
      });
    });
    this.getCountryFlag('IN');
  }

  public getCountryFlag(countryID:string){
    let countryFlag:any;
    this.placesService.getCountryFlag(countryID)
    .subscribe(res=>{ console.log(res);
     });
  }

  public setBgColorOnDisable(){
    this.elementRef.nativeElement.querySelector('#search').setAttribute('style',"background-color:rgb(233, 236, 239)");
  }

}

