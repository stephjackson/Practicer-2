import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  @Input() listId;
  items;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit() {
      this.listService.getItemsInList(this.listId)
      .subscribe(
        (res) => {this.items = res.obj.items},
        (err) => console.error(err)
      )
    }

  removeItemFromList(listid, itemid) {
    this.listService.removeItemFromList(listid, itemid);
    location.reload();
  }
}
