import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import etudiantJs from '../services/etudiantJs';

class Authentification extends Component {
    constructor(props){
        super(props)
        this.state={
            mdp:"",
            email:"",
            etudiants: [],
            prof:[],
            coordi:[],
        }
    }

    chargerMdp= event =>{
        this.setState({
            mdp: event.target.value
        })
    } 
    chargerEmail= event =>{
        this.setState({
            email: event.target.value
        })
    } 
    Authentification= ()=>{
        axios.get("http://localhost:4000/api/etudiants").then((res)=>{
            this.setState({ etudiants : res.data._embedded.etudiants});
            this.state.etudiants.map(etudiant =>{if(etudiant.mail==this.state.email && etudiant.mdp==this.state.mdp){
                var url =etudiant._links.self.href
                var id = url.replace("http://localhost:4000/api/etudiants","")
                if(etudiant._links.cursus.noteS1==null)
                    this.props.history.push('/MyForm'+id)
                else   
                  this.props.history.push('/Form2'+id)

            }
        })
        })
        axios.get("http://localhost:4000/api/professeurs").then((res)=>{
            this.setState({ prof : res.data._embedded.professeurs});
            let i=0
            this.state.prof.map(prof =>{if(prof.mail==this.state.email && prof.mdp==this.state.mdp){
                var url =prof._links.self.href
                var id = url.replace("http://localhost:4000/api/professeurs","")
                this.props.history.push('/main'+id)
            }
        })
        })
        axios.get("http://localhost:4000/api/coordinateurs").then((res)=>{
            this.setState({ coordi : res.data._embedded.coordinateurs});
            this.state.coordi.map(coordi =>{if(coordi.mail==this.state.email && coordi.mdp==this.state.mdp){
                this.props.history.push('/main/admin')
            }
           
        })
        })


      
       

    }
    render() {
        return (
          <center> <div class="Authentification">
             <center> <h2  id="icon"style={{marginTop:50 }}>Bienvenue sur MiolaStudent </h2 ></center>

                <div id="formContent" style={{marginTop:100 }}>
                    <div class="fadeIn first">
                    <center> <h5  id="icon"style={{marginTop:110}}>Veuillez s'authentifier</h5 ></center>
                    </div>
                    

                
                    <form>
                    <input  type="text" id="login" class="fadeIn second" name="login" placeholder="Email" onChange={this.chargerEmail} />
                    <input type="password" id="password" class="fadeIn third" name="login" placeholder="Mot de passe" onChange={this.chargerMdp} />
                    <input  id="submit" class="fadeIn fourth" value="Se connecter" onClick={this.Authentification}/>
                    </form>

                
                    <div id="formFooter">
                    </div>

                </div>
            </div>
            </center> 
        );
    }
}

export default Authentification;