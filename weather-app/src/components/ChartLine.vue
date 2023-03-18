<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { ref, watch, onMounted } from 'vue';
import { useCitiesStore } from '@/stores/CitiesStore';
export default {
  props: {
    hourlyTemp: {
      required: true,
      type: Object,
    }
  },
  setup (props) {
    const citiesStore = useCitiesStore();
    const chartInstance = ref(null);
    const chartCanvas = ref(null);

    const chartData = ref([]);

      const renderChart = () => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
        }
        const ctx = chartCanvas.value.getContext('2d');
        chartInstance.value = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.value.map(item => item.label),
            datasets: [
              {
                label: 'Temperature',
                data: chartData.value.map(item => item.temperature),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      watch(
        () => [ ... chartData.value ],
        () => {
          renderChart()
        }
      );
      onMounted(() => {
        chartData.value = props.hourlyTemp;
      });
    return { chartData, chartCanvas, chartInstance, citiesStore, ref, renderChart }
  }
}
</script>

<style scoped>

</style>