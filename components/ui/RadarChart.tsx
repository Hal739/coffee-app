import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const chartSize = width * 0.8; // チャートのサイズを画面幅の80%に設定
const centerX = chartSize / 2;
const centerY = chartSize / 2;
const radius = chartSize / 2 - width * 0.1; // チャートの半径を調整
const maxValue = 5; // 最大値を5に設定

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      color?: string;
    }[];
  };
}

const CustomRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const { labels, datasets } = data;
  const numberOfSides = labels.length;
  const angleStep = (Math.PI * 2) / numberOfSides;

  // 背景の多角形を描画するための点を計算
  const getPolygonPoints = (value: number) => {
    let points = '';
    for (let i = 0; i < numberOfSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + (radius * value) / maxValue * Math.cos(angle);
      const y = centerY + (radius * value) / maxValue * Math.sin(angle);
      points += `${x},${y} `;
    }
    return points.trim();
  };

  // 軸の線を描画するための点を計算
  const getAxisPoints = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  // ラベルの位置を計算
  const getLabelPosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + (radius + 20) * Math.cos(angle);
    const y = centerY + (radius + 20) * Math.sin(angle);
    return { x, y };
  };

  return (
    <View style={styles.container}>
      <Svg width={chartSize} height={chartSize}>
        {/* 背景のグリッド線 */}
        {[1, 2, 3, 4, 5].map((value, idx) => (
          <Polygon
            key={`grid-${idx}`}
            points={getPolygonPoints(value)}
            fill="none"
            stroke="#ddd"
            strokeWidth="1"
          />
        ))}

        {/* 軸線 */}
        {labels.map((_, index) => {
          const point = getAxisPoints(index);
          return (
            <Line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="#ddd"
              strokeWidth="1"
            />
          );
        })}

        {/* データプロット */}
        <Polygon
          points={datasets[0].data
            .map((value, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const x = centerX + (radius * value) / maxValue * Math.cos(angle);
              const y = centerY + (radius * value) / maxValue * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ')}
          fill={datasets[0].color || 'rgba(71, 126, 232, 0.7)'}
          stroke="rgba(71, 126, 232, 1)"
          strokeWidth="2"
        />

        {/* ラベル */}
        <G>
          {labels.map((label, index) => {
            const position = getLabelPosition(index);
            return (
              <SvgText
                key={`label-${index}`}
                x={position.x}
                y={position.y}
                fontSize="10"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#333"
              >
                {label}
              </SvgText>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default CustomRadarChart;