interface EmploeeAttribute {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string
  avatar: string;
  biography: string;
  type: string;
  offCompany: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default EmploeeAttribute ;
