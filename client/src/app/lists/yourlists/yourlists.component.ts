import { Component, OnInit } from "@angular/core";
import { ListService } from "../list.service";

@Component({
    selector: 'app-yourlists',
    // template: `
    //     <div class="col-md-8 col-md-offset-2">
    //       <app-list
    //         [lists]="lists"
    //         *ngFor="let list of lists"></app-list>
    //     </div>
    // `
    templateUrl: 'yourlists.component.html'
})
export class YourlistsComponent implements OnInit {
  lists;

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
}