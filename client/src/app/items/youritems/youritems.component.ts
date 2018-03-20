import { Component, OnInit } from "@angular/core";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-youritems',
  templateUrl: './youritems.component.html',
  styleUrls: ['./youritems.component.css']
})
export class YouritemsComponent implements OnInit {
  items;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems()
    .subscribe(
      (res) => {
        this.items = res.obj;
      },
      (err) => console.error(err))
  }

  deleteItem(id) {
    this.itemService.deleteItem(id);
    location.reload();
  }
}
