import { Component } from '@angular/core';

import { DashboardService } from './dashboard.service';
import * as Highcharts from 'highcharts';
import { TaskService } from '../task/task.service';
import { Util } from 'src/app/config/util';
import { AppService } from 'src/app/app.service';
import { MeetingService } from '../meeting/meeting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  obj: any = {
    newLeadCount: 0,
    ownLeadCount: 0,
    lossLeadCount: 0,
    totalLeadCount: 0,
    currentBranchLeadCount: 0,
    upcomingEventCount: 0,
    newCallCount: 0,
    totalCallCount: 0,
    totalEmployeeCount: 0,
    totalAdminCount: 0,
    todayEventCount: 0,
    tomorrowEventCount: 0,
    totalBranchCount: 0,
    ownLeadsMonthWise: [],
    lossLeadsMonthWise: [],
    traficSummaryGData: [],
    leadCountBySource: []
  };

  upcomingTasks: any = [];
  upcomingMeetings: any = [];

  highcharts: typeof Highcharts = Highcharts;
  ownLeadsChartOptions!: any;
  lossLeadsChartOptions!: any;
  trafficSummaryChartOptions!: any;

  constructor(
    private app: AppService,
    private dashboardService: DashboardService,
    private taskService: TaskService,
    private meetingService: MeetingService
  ) {
    console.log('Called');
    this.overview();

    const sDate = new Date();
    let eDate = new Date();
    eDate.setDate(eDate.getDate() + 30);

    const taskFilter = { searchTxt: '', status: '', priority: '', rangeDates: [sDate, eDate] };
    this.taskService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE, taskFilter).subscribe((res: any) => {
      this.upcomingTasks = res.data;
    });

    const meetingFilter = { period: 'W', searchTxt: '' };
    this.meetingService.findAll(Util.PAGE.FIRST_PAGE, Util.PAGE.PER_PAGE, meetingFilter).subscribe((res: any) => {
      this.upcomingMeetings = res.data;
    });
  }


  initChart(chartType: string, data: any, categories = []) {
    return {
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      series: [{
        data: data, //[1, 2, 3, 5, 6, 3, 2, 4, 1, 11, 13,1,4],
        type: chartType, //'areaspline',
        color: '#3B82F6'
      }],
      xAxis: {
        visible: false,
        labels: {
          enabled: false
        },
        categories: categories,
      },
      yAxis: {
        visible: false,
        labels: {
          enabled: false
        },
        categories: [],
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.2
        },
        series: {
          lineWidth: 2,
          marker: {
            enabled: false,
          },
        }
      },
      credits: {
        enabled: false
      },
    };
  }


  initColumnChart(series: any, categories: any) {
    return {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories//['2021/22', '2020/21', '2019/20', '2018/19', '2017/18']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Assists'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'percent'
        }
      },
      series: series
    };
  }

  overview() {
    this.dashboardService.overview().subscribe((o: any) => {
      this.obj = o.data;
      this.ownLeadsChartOptions = this.initChart('areaspline', this.obj.ownLeadsMonthWise);
      this.lossLeadsChartOptions = this.initChart('areaspline', this.obj.lossLeadsMonthWise);

      this.trafficSummaryChartOptions = this.initColumnChart(this.obj.traficSummaryGData.series, this.obj.traficSummaryGData.categories);
      this.obj.leadCountBySource = this.obj.leadCountBySource;
    });
  }
}
