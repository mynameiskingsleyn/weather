import react from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { citiesList } from '../data/citiesList';
import { LinearGradient } from 'expo-linear-gradient';

export default class HomeScreen extends react.Component
{

  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      cities: citiesList,
      list: [],
      refresh: true
    };
    this.loadNewTemps = this.loadNewTemps.bind(this);
    //this.fetchCityTemp('London', 'UK');

  }

  componentDidMount() {
    this.fetchTemps();
  }

  fetchTemps = () => {
    var newList = [];
    this.setState({
      list: newList
    });
    var list = this.getRandom(this.state.cities, 7);
    for(city in list) {
      if(city) {
        let name = list[city].name;
        let country = list[city].country;
        this.fetchCityTemp(name, country, newList);
      }
    }
  }

  getRandom = (arr, n) => {
    var result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    while(n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  loadNewTemps() {
    this.setState({
      list: [],
      refresh: true
    });
    this.fetchTemps();
  }

  fetchCityTemp = ( city, country, newList ) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&APPID=bdef2a67aba0ad1f25a6c19f447e6c4a&units=metric')
      .then((response) => response.json())
      .then((responseJson) => {
        var r = responseJson.main;
        var obj = responseJson;
        var city = {
          name: obj.name,
          country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: '+r.humidity+'% - '+obj.weather[0].main,
        };
        newList.push(city);
        this.setState({
          list: newList,
          refresh: false
        });
      })
  }

  getTempRange = (t) => {
    if(t < 11) {
      return 'cold';
    } else if (t > 10 && t < 20) {
      return 'medium';
    } else if (t >= 20 && t < 30) {
      return 'hot';
    } else {
      return 'vhot';
    }
  }

  getEmoji = (type) => {
    if(type == 'Clouds') {
      return '☁️';
    }
    else if(type == 'Clear') {
      return '☀️';
    }
    else if(type == 'Haze') {
      return '🌥';
    } else if(type == 'Thunderstorm') {
      return '⛈';
    } else if(type == 'Rain') {
      return '🌧';
    } else if(type == 'Snow') {
      return '❄️';
    } else if(type == 'Mist') {
      return '☁️';
    } else if(type == 'Fog') {
      return '🌫';
    } else if(type == 'Drizzle') {
      return '🌦';
    } else {
      '';
    }
  }

  render() {

    return(
      <View style={styles.container}>
        <StatusBar
          barStyle="default"
          backgroundColor="#1dafb"
        />
        <Text style={styles.title}>
        ☀️ City Weather </Text>
        <FlatList
          style={{width:'100%'}}
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableHighlight
              onPress={
                () => alert(item.desc)
              }
              underlayColor="white"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.05)']}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text
                  style={[styles.temp,
                    (this.getTempRange(item.temp) == 'cold') ? styles.cold : styles.temp,
                    (this.getTempRange(item.temp) == 'medium') ? styles.medium : styles.temp,
                    (this.getTempRange(item.temp) == 'hot') ? styles.hot : styles.temp,
                    (this.getTempRange(item.temp) == 'vhot') ? styles.vhot : styles.temp,

                    ]}
                  > {this.getEmoji(item.type)} {item.temp}°C </Text>
                  <Text style={styles.cityN}> {item.name} </Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}

        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cold: { color:'blue'},
  medium: { color: 'green'},
  hot: { color: 'orange'},
  vhot: { color: 'red'},
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  cityN: {
    fontSize: 20,
    lineHeight:40,
    fontFamily: 'Avenir'
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    paddingTop: 20,
    marginButtom: 20,
    paddingButtom: 20,
    lineHeight:20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white'
  }
})
