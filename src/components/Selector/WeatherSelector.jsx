import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog,
  CloudDrizzle,
  Cloudy,
  Sunrise,
  Sunset,
  Wind,
  Thermometer,
  Droplets,
  Gauge,
  Snowflake,
  CloudHail,
  CloudMoon,
  Moon,
  MoonStar,
  Rainbow,
  Umbrella,
  ThermometerSnowflake,
  ThermometerSun,
  Tornado,
  Waves
} from 'lucide-react';
import styles from './WeatherSelector.module.css';

const weatherOptions = [
  { icon: Sun, value: 'sunny', label: '맑음' },
  { icon: Moon, value: 'moon', label: '달' },
  { icon: MoonStar, value: 'moonStar', label: '달과별' },
  { icon: CloudMoon, value: 'cloudMoon', label: '구름낀달' },
  { icon: Sunrise, value: 'sunrise', label: '일출' },
  { icon: Sunset, value: 'sunset', label: '일몰' },
  { icon: Cloud, value: 'cloudy', label: '흐림' },
  { icon: Cloudy, value: 'veryCloudy', label: '매우흐림' },
  { icon: CloudDrizzle, value: 'drizzle', label: '이슬비' },
  { icon: CloudRain, value: 'rainy', label: '비' },
  { icon: CloudHail, value: 'hail', label: '우박' },
  { icon: CloudSnow, value: 'snowy', label: '눈' },
  { icon: CloudLightning, value: 'storm', label: '폭풍' },
  { icon: CloudFog, value: 'foggy', label: '안개' },
  { icon: Wind, value: 'windy', label: '강풍' },
  { icon: Tornado, value: 'tornado', label: '토네이도' },
  { icon: ThermometerSun, value: 'veryHot', label: '매우더움' },
  { icon: Thermometer, value: 'hot', label: '더움' },
  { icon: ThermometerSnowflake, value: 'veryCold', label: '매우추움' },
  { icon: Snowflake, value: 'cold', label: '추움' },
  { icon: Droplets, value: 'humid', label: '습함' },
  { icon: Rainbow, value: 'rainbow', label: '무지개' },
  { icon: Umbrella, value: 'umbrella', label: '우산' },
  { icon: Waves, value: 'waves', label: '파도' },
  { icon: Gauge, value: 'pressure', label: '기압' }
];

export default function WeatherSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      {weatherOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.weatherButton} ${value === option.value ? styles.selected : ''}`}
            onClick={() => onChange(option.value)}
          >
            <Icon size={16} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
} 