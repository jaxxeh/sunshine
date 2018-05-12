const weatherLookup = {
  200: {
    desc: 'thunderstorm with light rain',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  201: {
    desc: 'thunderstorm with rain',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  202: {
    desc: 'thunderstorm with heavy rain',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  210: {
    desc: 'light thunderstorm',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  211: {
    desc: '',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  212: {
    desc: 'heavy thunderstorm',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  221: {
    desc: 'ragged thunderstorm',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  230: {
    desc: 'thunderstorm with light drizzle',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  231: {
    desc: 'thunderstorm with drizzle',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  232: {
    desc: 'thunderstorm with heavy drizzle',
    simple: 'Thunderstorm',
    icon: 'wi-thunderstorm',
  },
  300: {
    desc: 'light intensity drizzle',
    simple: 'Drizzle',
    icon: 'wi-sprinkle',
  },
  301: {
    desc: '',
    simple: 'Drizzle',
    icon: 'wi-sprinkle',
  },
  302: {
    desc: 'heavy intensity drizzle',
    simple: 'Drizzle',
    icon: 'wi-sprinkle',
  },
  310: {
    desc: 'light intensity drizzle rain',
    simple: 'Drizzle rain',
    icon: 'wi-rain',
  },
  311: {
    desc: '',
    simple: 'Drizzle rain',
    icon: 'wi-rain',
  },
  312: {
    desc: 'heavy intensity drizzle rain',
    simple: 'Drizzle rain',
    icon: 'wi-rain',
  },
  313: {
    desc: 'shower rain and drizzle',
    simple: 'Rain and drizzle',
    icon: 'wi-rain',
  },
  314: {
    desc: 'heavy shower rain and drizzle',
    simple: 'Rain and drizzle',
    icon: 'wi-rain',
  },
  321: {
    desc: 'shower drizzle',
    simple: 'Drizzle',
    icon: 'wi-sprinkle',
  },
  500: {
    desc: 'light rain',
    simple: 'Rain',
    icon: 'wi-rain',
  },
  501: {
    desc: 'moderate rain',
    simple: 'Rain',
    icon: 'wi-rain',
  },
  502: {
    desc: 'heavy intensity rain',
    simple: 'Rain',
    icon: 'wi-rain',
  },
  503: {
    desc: 'very heavy rain',
    simple: 'Rain',
    icon: 'wi-rain',
  },
  504: {
    desc: 'extreme rain',
    simple: 'Rain',
    icon: 'wi-rain',
  },
  511: {
    desc: 'freezing rain',
    simple: 'Freezing rain',
    icon: 'wi-rain-mix',
  },
  520: {
    desc: 'light intensity shower rain',
    simple: 'Showers',
    icon: 'wi-showers',
  },
  521: {
    desc: '',
    simple: 'Showers',
    icon: 'wi-showers',
  },
  522: {
    desc: 'heavy intensity shower rain',
    simple: 'Showers',
    icon: 'wi-showers',
  },
  531: {
    desc: 'ragged shower rain',
    simple: 'Showers',
    icon: 'wi-showers',
  },
  600: {
    desc: 'light snow',
    simple: 'Snow',
    icon: 'wi-snow',
  },
  601: {
    desc: '',
    simple: 'Snow',
    icon: 'wi-snow',
  },
  602: {
    desc: 'heavy snow',
    simple: 'Snow',
    icon: 'wi-snow',
  },
  611: {
    desc: '',
    simple: 'Sleet',
    icon: 'wi-sleet',
  },
  612: {
    desc: '',
    simple: 'Shower sleet',
    icon: 'wi-sleet',
  },
  615: {
    desc: 'light rain and snow',
    simple: 'Rain and snow',
    icon: 'wi-rain-mix',
  },
  616: {
    desc: '',
    simple: 'Rain and snow',
    icon: 'wi-rain-mix',
  },
  620: {
    desc: 'light shower snow',
    simple: 'Snow showers',
    icon: 'wi-snow',
  },
  621: {
    desc: '',
    simple: 'Snow showers',
    icon: 'wi-snow',
  },
  622: {
    desc: 'heavy shower snow',
    simple: 'Snow showers',
    icon: 'wi-snow',
  },
  701: {
    desc: '',
    simple: 'Mist',
    icon: 'wi-fog',
  },
  711: {
    desc: '',
    simple: 'Smoke',
    icon: 'wi-smoke',
  },
  721: {
    desc: '',
    simple: 'Haze',
    icon: 'wi-day-haze',
  },
  731: {
    desc: '',
    simple: 'Dust whirls',
    icon: 'wi-dust',
  },
  741: {
    desc: '',
    simple: 'Fog',
    icon: 'wi-fog',
  },
  751: {
    desc: '',
    simple: 'Sand',
    icon: 'wi-sandstorm',
  },
  761: {
    desc: '',
    simple: 'Dust',
    icon: 'wi-dust',
  },
  762: {
    desc: '',
    simple: 'Volcanic ash',
    icon: 'wi-volcano',
  },
  771: {
    desc: '',
    simple: 'Squalls',
    icon: 'wi-strong-wind',
  },
  781: {
    desc: '',
    simple: 'Tornado',
    icon: 'wi-tornado',
  },
  800: {
    desc: '',
    simple: 'Clear',
    icon: {
      day: 'wi-day-sunny',
      night: 'wi-night-clear',
    },
  },
  801: {
    desc: 'few clouds',
    simple: 'Cloudy',
    icon: {
      day: 'wi-day-cloudy',
      night: 'wi-night-alt-cloudy',
    },
  },
  802: {
    desc: 'scattered clouds',
    simple: 'Cloudy',
    icon: {
      day: 'wi-day-cloudy',
      night: 'wi-night-alt-cloudy',
    },
  },
  803: {
    desc: 'broken clouds',
    simple: 'Cloudy',
    icon: 'wi-cloud',
  },
  804: {
    desc: 'overcast clouds',
    simple: 'Overcast',
    icon: 'wi-cloudy',
  },
};

export default weatherLookup;
