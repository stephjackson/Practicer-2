import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() bpmStat;
  @Input() bpmDate;
  @Input() emptyArray;
  stats;
  drawChart;

  public lineChartData:Array<any> = [
    {}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    legend : {
      labels : {
        fontColor : '#ffffff'  
      },
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              fontColor: 'white'
          },
      }],
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    this.drawChart = true;
  }

  ngOnInit() {
    this.lineChartData = [{data: this.bpmStat, label: 'BPM'}]
    this.lineChartLabels = this.bpmDate;
    this.drawChart = false;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
