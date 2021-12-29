import * as Yup from 'yup';
import { validation } from '../types/validation';
import { validationCPF } from './validations/validationCPF';
import { Client } from '../models/Client';

class ClientValidator{

  async createValidation(client: any){
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required("O nome do cliente é obrigatorio"),
      cpf: Yup.string().required("O cpf do cliente é obrigatorio").test("cpf", "CPF inválido",(value) => validationCPF(value)),
      email: Yup.string().required("O email do cliente é obrigatorio").email("O email do cliente é obrigatório"),
      avatar: Yup.string().required("O avatar é obrigatório"),
      fone:  Yup.string().required("O Telefone é obrigatória"),
    });

    try {
      await schemaValidation.validate(client, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }
}

export default new ClientValidator();
