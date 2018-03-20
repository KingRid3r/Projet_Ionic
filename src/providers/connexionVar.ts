import {Injectable} from '@angular/core';

@Injectable()
export class connexionVar {
  identifiant;
  mdp;
  connected;
  constructor() {
    this.identifiant = null;
    this.mdp = null;
    this.connected = false;
  }

  setConnexionVarMdp(_mdp){
    this.mdp = _mdp;
  }
  setConnexionVarId(_identifiant){
    this.identifiant = _identifiant;
  }
  setConnexionVarConnected(_connected){
    this.connected = _connected;
  }
  getConnectionVar() {
    var ConnectVar = {
      identifiant: this.identifiant,
      mdp: this.mdp,
      connected: this.connected
    };
    return ConnectVar;
  }

}
