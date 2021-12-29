import * as Yup from 'yup';
import { validation } from '../types/validation';
import { validationCPF } from './validations/validationCPF';
import { Client } from '../models/Client';

class ClientValidator{

  async createValidation(client: any): Promise<validation>{
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

  async idValidation(id: string): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      id: Yup.string().required("O identidicador do cliente é obrigatorio").uuid("Identificador invalido")
    });

    try {
      await schemaValidation.validate({id}, {
        abortEarly: false
      });
      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }

  async updateValidation(client: any): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      id: Yup.string().required("O identificador é obrigatório").uuid("Identificador invalido"),
      name: Yup.string().required("O nome do cliente é obrigatorio"),
      cpf: Yup.string().required("O cpf do cliente é obrigatorio").test("cpf", "CPF inválido",(value) => validationCPF(value)),
      email: Yup.string().required("O email do cliente é obrigatorio").email("O email do cliente é obrigatório"),
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
