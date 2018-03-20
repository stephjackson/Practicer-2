import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemId;
  item;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemService.getItem(params['id'])
      .subscribe(
        (res) => {
          this.itemId = params['id'];
          this.item = res.obj;
        },
        (err) => console.error(err))
      })
  }
}
