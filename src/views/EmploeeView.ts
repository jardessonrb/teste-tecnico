import { Emploee } from "../models/Emploee";
import { EmploeeViewtype } from "../types/view/EmploeeViewTypes";
import { formatDate } from "./Utils";

class EmploeeView{
  emploeeView(emploee: Emploee): EmploeeViewtype{
    return {
      id: emploee.id,
      name: emploee.name,
      avatar: emploee.avatar,
      type: emploee.type,
      createdAt: formatDate(emploee.createdAt)
    }
  }

  emploeesView(emploees: Emploee[]): EmploeeViewtype[]{
    const emploeesView = emploees.map((emploee) => this.emploeeView(emploee));

    return emploeesView;
  }

  emploeeSimplified(emploee: Emploee){
    return {
      id: emploee.id,
      name: emploee.name,
      type: emploee.type
    }
  }

}

export default new EmploeeView();
