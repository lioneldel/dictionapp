import * as React from 'react';
import { Text, View, StyleSheet,TextInput ,TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(){
super();
this.state={
  text:"",
  lexicalCatagory:"",
  definitiom:""
    
}

  }

      getWord=(text)=>{
          var searchKeyword=text.toLowerCase()
          var url ="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
          return fetch(url)
          .then((data)=>{
              if(data.status===200)
              {
                return data.json()
              }
          else 
          {
              return null
          }
              
         } )
         .then((response)=>{
             var responseObject=response
             if(responseObject)
             {
                 var wordData= responseObject.definitions[0]
                 var definition=wordData.description
                 var lexicalCatagory=wordData.wordtype

                 this.setState({
                     "word":this.state.text,
                     "definition":definition,
                     "lexicalCatagory":lexicalCatagory
                 })
             }
                else
                {
                    this.setState({
                        "word":this.state.text,
                        "defination":"the dictionary is learning"
                    })

                }
         })
        }
 
        render() {
 return(
      <View style={styles.container}>
            <TextInput  style={styles.inputbox} value={this.state.text}
            onChangeText={
            (text)=>{
                this.setState({
                    text:text, 
                    //isSearchPressed:false,
                    word:"loading......",
                    lexicalCatagory:"",
                    examples:"",
                    defination:""
                });
                }}
                value={this.state.text}
                />
            <TouchableOpacity  style={styles.togo} onPress={()=>{
               // this.setState({isSearchPressed:true});
                this.getWord(this.state.text)
            }}
            >
            <Text style={styles.textgo}>GO</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.words}>Word:{""}</Text>
                <Text style={styles.word}>{this.state.text}</Text>
            </View>
            <View style={{flexDirection:"row"}}> 
                <Text style={styles.words}>Type:{""}</Text>
                <Text style={styles.word}>{this.state.lexicalCatagory}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.words}>Defination:{""}</Text>
                <Text style={styles.word}>{this.state.definition}</Text>
            </View>
      </View>
     
      
 )
      
    
        }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'black',
    
  },
  inputbox:{
    alignSelf:"center",
    marginTop:30,
    width:"75%",
    height:40,
    textAlign:"center",
    borderWidth:3,
    backgroundColor:"white",
    fontSize:25,
    color:"gold",
    borderRadius:50

  },
  textgo:{
    textAlign:'center',
    color:"gold",
    fontSize:20
  },
  togo:{
    alignSelf:"center",
    width:"30%",
    height:40,
    padding:10,
    margin:10,
    backgroundColor:"white",
    borderRadius:20
  },
  words:{
      margin:50,
      fontSize:10,
      color:"gold",
      justifyContent:"flex-start"
  },

      
  word:{
      marginTop:50,
      marginRight:200,
    fontSize:10,
    color:"gold",
    justifyContent:"flex-start"
  }

});



