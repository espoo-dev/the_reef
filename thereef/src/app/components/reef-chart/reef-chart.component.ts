import { Component, Input, OnChanges, SimpleChanges, effect, signal } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'reef-chart',
  standalone: true,
  imports: [],
  templateUrl: './reef-chart.component.html',
  styleUrl: './reef-chart.component.scss'
})
export class ReefChartComponent implements OnChanges {
  @Input() config!: ChartConfiguration;
  @Input() id:string = 'reef-chart-' + new Date().toISOString();
  chartMounted!: Chart;
  chartSignal = signal(this.config);

  constructor(){
    Chart.register(...registerables);

    effect(() => {
      if (this.chartMounted && this.chartSignal()) {
        const newConfig = this.chartSignal();
        this.chartMounted.data = newConfig.data;
        this.chartMounted.update();
      }
    });
  }

  loadChart(){
    const chartElement = document.getElementById(this.id) as ChartItem;
    if (chartElement) {
      this.chartMounted = new Chart(chartElement, this.config);
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    const config = changes['config'];
    if (config && !config.firstChange) {
      this.chartSignal.set(config.currentValue);
    }
  }

  ngAfterViewInit() {
    this.loadChart();
  }
}
