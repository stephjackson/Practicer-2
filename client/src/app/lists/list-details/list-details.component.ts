import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  listId;
  items;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listService.getItemsInList(params['id'])
      .subscribe(
        (res) => {
          this.listId = params['id'];
          this.items = res.obj;
        },
        (err) => console.error(err))
      })
  }

  removeItemFromList(listid, itemid) {
    this.listService.removeItemFromList(listid, itemid);
    location.reload();
  }
}
