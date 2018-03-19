import {Injectable} from '@angular/core';

@Injectable()
export class connexionVar {

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
    this._connected = _connected;
  }
  getConnectionVar() {
    ConnectVar: [
      this.identifiant,
      this.mdp,
      this._connected
    ];
    return ConnectVar;
  }

}
