import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit{
  isVote1Available = true;
  isVote2Available = true;
  isVote3Available = false;


  constructor(private api: ApiService) { }

  ngOnInit() {

  }
}
