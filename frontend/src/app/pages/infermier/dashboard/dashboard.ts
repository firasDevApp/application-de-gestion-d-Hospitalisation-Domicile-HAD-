import { Component, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements AfterViewInit {

  @ViewChild('patientsPieChart', { static: false }) pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('visitsBarChart', { static: false }) barChartRef!: ElementRef<HTMLCanvasElement>;

  private pieChart: Chart | undefined;
  private barChart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Augmentez le délai pour être sûr que le DOM est complètement rendu
      setTimeout(() => {
        this.createPatientsPieChart();
        this.createVisitsBarChart();
      }, 100);
    }
  }

  createPatientsPieChart() {
    if (!this.pieChartRef?.nativeElement) {
      console.error('Pie chart canvas element not found');
      return;
    }

    const ctx = this.pieChartRef.nativeElement;
    
    // Vérifiez si le contexte 2D est disponible
    if (!ctx.getContext('2d')) {
      console.error('2D context not available for pie chart');
      return;
    }

    // Détruire le chart existant
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Diabète', 'Hypertension', 'Asthme', 'Autres'],
        datasets: [{
          label: 'Nombre de patients',
          data: [12, 19, 7, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          title: { 
            display: false 
          }
        }
      }
    });

    console.log('Pie chart created successfully');
  }

  createVisitsBarChart() {
    if (!this.barChartRef?.nativeElement) {
      console.error('Bar chart canvas element not found');
      return;
    }

    const ctx = this.barChartRef.nativeElement;
    
    // Vérifiez si le contexte 2D est disponible
    if (!ctx.getContext('2d')) {
      console.error('2D context not available for bar chart');
      return;
    }

    // Détruire le chart existant
    if (this.barChart) {
      this.barChart.destroy();
    }
    
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'],
        datasets: [{
          label: 'Nombre de visites',
          data: [18, 22, 15, 20, 25, 12, 8],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Visites par jour de la semaine',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Visites: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de visites'
            },
            ticks: {
              stepSize: 5
            }
          },
          x: {
            title: {
              display: true,
              text: 'Jours de la semaine'
            }
          }
        }
      }
    });

    console.log('Bar chart created successfully');
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.barChart) {
      this.barChart.destroy();
    }
  }
}