import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import icons from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Divider } from 'react-native-elements';
import firebase from 'react-native-firebase';

const IconComponent = icons;

const style = StyleSheet.create({
  button: {
    borderRadius: 90,
    marginLeft: 15,
    marginRight: 15
  },
  touch: {
    marginTop: 25,
    marginRight: 60
  },
  touch2: {
    marginTop: 25,
    marginRight: 10,
    marginLeft: 20
  }
});

class TinderCard extends React.Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <IconComponent name='deleteuser' size={25} color={'black'} />
    )
  };

  state = {
    users: [{}],
    user: {
      data: () => ({
        name: '',
        surname: '',
        bio: '',
        url: '',
        likes: [''],
        dislikes: [''],
        bDay: '07-03-1996',
        gender: ''
      })
    },
    loading: true
  };

  getAge = bDay => {
    var year = Number(bDay.substr(6, 9));
    var month = Number(bDay.substr(3, 4)) - 1;
    var day = Number(bDay.substr(0, 1));
    var today = new Date();
    var age = today.getFullYear() - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }
    return age;
  };

  renderCard = user => {
    const { list } = this.props;
    if (!!!user.exists || list.includes(user.id)) {
      this.prox();
    }
    if (!!user !== false) {
      const data = user.data();
      return (
        <Card
          containerStyle={{ borderRadius: 10 }}
          titleStyle={{ fontSize: 25 }}
          title={`${data.name} ${data.surname}`}
          image={{ uri: `${data.url}` }}
          imageStyle={{
            height: 350
          }}
        >
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>{`${
            data.gender
          }, ${this.getAge(data.bDay)} `}</Text>
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>{data.bio}</Text>
          <Divider style={{ backgroundColor: 'green', marginTop: 5 }} />

          <Text style={{ fontSize: 20, color: 'green' }}>LIKES:</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {data.likes.map(e => (
              <Text style={{ marginBottom: 10 }}>{`${e} `}</Text>
            ))}
          </View>
          <Divider style={{ backgroundColor: 'red' }} />
          <Text style={{ fontSize: 20, color: 'red' }}>DISLIKES:</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {data.dislikes.map(e => (
              <Text>{`${e} `}</Text>
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center'
            }}
          >
            <TouchableOpacity style={style.touch} onPress={this.prox}>
              <IconComponent name='heart' size={50} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.touch2}
              onPress={() => this.addToHateList(user.id, this.prox)}
            >
              <IconComponent name='close' size={50} color={'black'} />
            </TouchableOpacity>
          </View>
        </Card>
      );
    } else {
      return <Text>acabou a lista</Text>;
    }
  };

  addToHateList = (enemyUid, func) => {
    const user = firebase.auth().currentUser;
    if (!!enemyUid) {
      firebase
        .firestore()
        .collection('Hate')
        .doc(user.uid)
        .collection('HateList')
        .doc(enemyUid)
        .set({
          message: [
            {
              text: '',
              date: ''
            }
          ]
        })
        .then(func);
    }
  };

  prox = () => {
    const { users } = this.state;
    let array = users;
    if (array.length > 0) {
      let newUser = array.pop();
      this.setState({
        user: newUser,
        users: array
      });
    } else {
      this.setState({
        user: {
          exists: true,
          uid: '',
          data: () => ({
            name: 'FIM',
            surname: 'DA LISTA',
            bio:
              'parabéns! Você já odeia todos os usuários deste aplicativo, não há mais ninguem para exibir.',
            url:
              'http://2.bp.blogspot.com/_HVQU7-in0PY/SDmUMmvIWGI/AAAAAAAAA7U/hV2o_JtPbkQ/s400/Oscuridad_5_demonio.jpg',
            likes: ['O Curso'],
            dislikes: [''],
            bDay: '07-03-1353',
            gender: 'Demon'
          })
        }
      });
    }
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    this.setState({ loading: true });
    firestore
      .collection('registerInfo')
      .get()
      .then(snap => {
        this.setState({
          users: snap.docs.filter(e => e.id !== user.uid)
        }).then(() => this.setState({ loading: false }));
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { user, loading } = this.state;
    return (
      <ScrollView>
        {loading ? (
          <Spinner visible={loading} textContent={'Loading...'} />
        ) : (
          this.renderCard(user)
        )}
      </ScrollView>
    );
  }
}

export default TinderCard;
