import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from '../search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  place: string;

  results: any[] = []; // Store data in results from the service
  selected: boolean = false; // To identified if user is already selected
  selectedUser: any; // Details of selected user

  constructor(private searchService: SearchUsersService) { }
  ngOnInit() { }

  search(place: string) {
    this.selected = false;
    if (place) {
      this.place = place;
      this.searchService.getUsersByPlace(place).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          console.error(error);
        }
      );
    } else {
      this.results = [];
    }
  }

  getDetails(username: string) {
    this.searchService.getDetailsByUserName(username).subscribe(
      userDatils => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
  }

}
