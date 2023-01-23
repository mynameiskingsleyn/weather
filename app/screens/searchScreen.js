import react from 'react';
import { TextInput, StyleSheet, Text, View, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { citiesList } from '../data/citiesList';
import { LinearGradient } from 'expo-linear-gradient';

export default class SearchScreen extends react.Component
{

  constructor(props) {
    super(props);
    var message = 'Search for a city ....';
    var navigation = this.props.navigation;
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: message,
      item: {}
    };

  }

  searchCity = () => {
    this.fetchCityTemp(this.state.searchInput);
  }


  fetchCityTemp = (city) => {
    this.setState({
      item: {},
      searchResult: 0,
      error: this.message
    });
    var urlString = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=bdef2a67aba0ad1f25a6c19f447e6c4a&units=metric';
    //console.log(urlString);
    fetch(urlString)
      .then((response) => response.json())
      .then((responseJson) => {
        var r = responseJson.main;
        var obj = responseJson;
        //console.log(obj);
        if ( responseJson.cod !== 200 ) {
          this.setState({
            searchResult: 0,
            error: 'City not found!'
          });
          return;
        }
        var city = {
          name: obj.name,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: '+r.humidity+'% - '+obj.weather[0].main,
        };
        this.setState({
          item: city,
          searchResult: 1
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

        <View style={{alignItems: 'center', width: '90%'}}>
          <Text style={{textAlign: 'center', lineHeight: 20, padding: 5,
            fontSize: 16 }}> Search for city </Text>
          <TextInput
            onChangeText={ (text) => this.setState({
              searchInput: text
            })}
            value={this.state.searchInput}
            style={styles.input}
          />
          <TouchableHighlight
            onPress={ () => this.searchCity()}
            style={styles.primary_button}
          >
            <Text
              style={styles.button_text}> Search </Text>
          </TouchableHighlight>

        </View>


        {this.state.searchResult == '1' ? (
          <TouchableHighlight
            onPress={
              () => alert(this.state.item.desc)
            }
            underlayColor="white"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.05)']}
              start={[0, 0.5]}
            >
              <View style={styles.singledrow}>
                <Text
                style={[styles.temp,
                  (this.getTempRange(this.state.item.temp) == 'cold') ? styles.cold : styles.temp,
                  (this.getTempRange(this.state.item.temp) == 'medium') ? styles.medium : styles.temp,
                  (this.getTempRange(this.state.item.temp) == 'hot') ? styles.hot : styles.temp,
                  (this.getTempRange(this.state.item.temp) == 'vhot') ? styles.vhot : styles.temp,

                  ]}
                > {this.getEmoji(this.state.item.type)} {this.state.item.temp}°C </Text>
                <Text style={styles.cityN}> {this.state.item.name} </Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>

        ) : (
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text> {this.state.error}  </Text>
          </View>
        )}


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
  singledrow: {
    flex: 1,
    width: 375,
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
    justifyContent: 'flex-start',
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
  },
  input: {
    width: '80%',
    padding: 15,
    margin: 5,
    backgroundColor: 'black',
    color: 'white'
  },
  primary_button: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 8,
  },
  button_text: {
    fontSize: 14, color: 'white'
  }

})
