import { Component, OnInit } from "@angular/core";
import { ListService } from "../list.service";

@Component({
    selector: 'app-yourlists',
    templateUrl: 'yourlists.component.html',
    styleUrls: ['yourlists.component.css']
})
export class YourlistsComponent implements OnInit {
  lists;
  showDetails = true;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getLists()
    .subscribe(
      (res) => {
        this.lists = res.obj;
      },
      (err) => console.error(err))
  }

  deleteList(id) {
    this.listService.deleteList(id);
    location.reload();
  }

  showListDetails() {
    if (this.showDetails === false) {
        this.showDetails = true;
    } else {
        this.showDetails = false;
    }
}
}