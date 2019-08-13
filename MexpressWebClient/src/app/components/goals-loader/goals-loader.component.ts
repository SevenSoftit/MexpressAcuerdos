import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals-loader',
  templateUrl: './goals-loader.component.html',
  styleUrls: ['./goals-loader.component.scss']
})
export class GoalsLoaderComponent implements OnInit {
  goalLine = [];
  goalLineCounter = 0;
  constructor() { }

  ngOnInit() {

  }
addNewGoal(){
  var objGoalLine = {
    startDate: new Date(),
    endDate: new Date(),
    dateInitial: 'startDate' +this.goalLineCounter,
    datefinish: 'endDate' +this.goalLineCounter,
    goalAmount: '',
    percentage:'',
    id: this.goalLineCounter

  }
this.goalLine.push(objGoalLine);
}
}
