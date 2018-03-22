import { Component, OnInit, Input } from '@angular/core';
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
  bpmStat: Array<any> = [];
  bpmDate: Array<any> = [];
  emptyArray: Array<any> = [];

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemService.getItem(params['id'])
      .subscribe(
        (res) => {
          this.itemId = params['id'];
          this.item = res.obj;
          console.log(this.item);
          for (var i = 0; i < this.item.stats.length; i++) {
            this.bpmStat.push(this.item.stats[i].bpm);
            this.bpmDate.push(this.item.stats[i].date);
            this.emptyArray.push('');
          }
        },
        (err) => console.error(err))
      })
  }
}
