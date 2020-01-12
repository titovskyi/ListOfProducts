import { Component, OnInit } from '@angular/core';
import {List} from '../../../_models/list';
import {ListService} from '../../../_services/list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private router: Router,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.listService.getLists().subscribe((res: List[]) => {
      this.lists = res;
    });
  }

  public showList(id) {
    this.router.navigate([`edit-list/${id}`]);

  }

  public removeList(id) {
    this.listService.removeList(id).subscribe(() => {
      this.lists = [...this.lists.filter((list) => list.id !== id)];
    });
  }

}
