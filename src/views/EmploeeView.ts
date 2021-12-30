import { Emploee } from "../models/Emploee";
import { EmploeeViewtype } from "../types/view/EmploeeViewTypes";

class EmploeeView{
  emploeeView(emploee: Emploee): EmploeeViewtype{
    return {
      id: emploee.id,
      name: emploee.name,
      avatar: emploee.avatar,
      type: emploee.type
    }
  }

  emploeesView(emploees: Emploee[]){
    const emploeesView = emploees.map((emploee) => this.emploeeView(emploee));

    return emploeesView;
  }

  emploeesimplified(emploee: Emploee){
    return {
      id: emploee.id,
      name: emploee.name
    }
  }

}

export default new EmploeeView();
