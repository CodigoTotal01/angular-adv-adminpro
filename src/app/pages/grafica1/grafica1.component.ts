import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  


  public labels1: string[] = ["Gatitos", "Perritos", "ratoncitos"];
  public data1 = [350,452,100]


}
