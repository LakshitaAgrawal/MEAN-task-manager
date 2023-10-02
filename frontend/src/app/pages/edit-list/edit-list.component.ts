import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId!: string; // Use the ! operator to indicate it will be assigned later

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId']; // Access 'listId' using square brackets
        console.log(params['listId']);
      }
    );
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    });
  }

}
