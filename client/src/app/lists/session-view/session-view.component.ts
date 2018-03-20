import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListService } from '../list.service'

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
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

  statTrack(id, bpm, completed) {
    this.listService.statTrack(id, bpm, completed);
    location.reload();
  }
}
