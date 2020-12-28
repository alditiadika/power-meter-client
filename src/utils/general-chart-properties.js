export const generalChartProperties = {
  margin:{ top: 10, right: 10, bottom: 38, left: 70 },
  xScale:{ type: 'time', format: 'native' },
  yScale:{ type: 'linear', min:'auto', max:'auto' },
  enableGridX:true,
  curve:'monotoneX',
  motionStiffness:120,
  motionDamping:50,
  theme:{
    axis: { ticks: { text: { fontSize: 14 } } },
    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
    textColor:'#FFFFFF',
  },
  colors:['#DD0079', '#7CDD00', '#7900DD', '#181845', '#ABABAB', '#DCE8D9', '#ECE51D', '#553353'],
  enableSlices:'x',
  enablePoints:false
}