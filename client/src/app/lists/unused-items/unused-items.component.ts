import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service';

@Component({
  selector: 'app-unused-items',
  templateUrl: './unused-items.component.html',
  styleUrls: ['./unused-items.component.css']
})
export class UnusedItemsComponent implements OnInit {
  items;
  @Input() listId;

  showSelected: boolean;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.listService.getItemsNotInList(this.listId)
    .subscribe(
      (res) => {
        this.listId = this.listId;
        this.showSelected = false
        this.items = res.obj;
      },
      (err) => console.error(err))
  }

  addItemToList(listid, itemid) {
    this.listService.addItemToList(listid, itemid);
    location.reload();
  }

  ShowForm() {
    if (this.showSelected === false) {
        this.showSelected = true;
    } else {
        this.showSelected = false;
    }
}
}
