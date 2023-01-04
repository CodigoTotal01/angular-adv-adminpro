import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  
   @Input('titulo') titulo: string = "Sin titulo";

  @Input() data: number[] = [0,0,0];
  public doughnutChartType: ChartType = 'doughnut';
  // Doughnut

  
  @Input('labels') doughnutChartLabels: string[] =  [ 'label 1', 'label 2', 'label 3' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data },
    ]
  };


}
