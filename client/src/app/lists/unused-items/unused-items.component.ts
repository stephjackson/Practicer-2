import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service';

@Component({
  selector: 'app-unused-items',
  templateUrl: './unused-items.component.html',
  styleUrls: ['./unused-items.component.css']
})
export class UnusedItemsComponent implements OnInit {
  items;
  listId;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listService.getItemsNotInList(params['id'])
      .subscribe(
        (res) => {
          this.listId = params['id'];
          this.items = res.obj;
        },
        (err) => console.error(err))
      })
  }

  addItemToList(listid, itemid) {
    this.listService.addItemToList(listid, itemid);
    location.reload();
  }
}
