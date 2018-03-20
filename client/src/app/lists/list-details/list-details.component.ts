import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service';


@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  items;

  constructor(private listService: ListService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listService.getItemsInList(params['id'])
      .subscribe(
        (res) => {
          this.items = res.obj;
        },
        (err) => console.error(err))
      })
  }

  // deleteItem(id) {
  //   this.listService.deleteItem(id);
  //   location.reload();
  // }
}
