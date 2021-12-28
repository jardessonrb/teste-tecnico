import * as Yup from 'yup';
import { validation } from '../types/validation';
import { Emploee } from '../models/Emploee';
import { validationCPF } from './validations/validationCPF';

class EmploeeValidator{
  async createValidation(emploee: Emploee): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required("O nome do funcionário é obrigatorio"),
      cpf: Yup.string().required("O cpf do funcionário é obrigatorio").test("cpf", "CPF inválido",(value) => validationCPF(value)),
      email: Yup.string().required("O email do funcionário é obrigatorio").email("O email do funcionario é obrigatório"),
      password: Yup.string().required("A senha do funcionário é obrigatorio").min(6, "A senha deve ter no minimo 6 caracteres"),
      avatar: Yup.string().required("O avatar é obrigatório"),
      biography:  Yup.string().required("A biografia é obrigatória"),
      type: Yup.string().required("O tipo de funcionario é obrigatório")
    });

    try {
      await schemaValidation.validate(emploee, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }

  async cpfValidation(cpf: string): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      cpf: Yup.string().required("O cpf do funcionário é obrigatorio").test("cpf", "CPF inválido",(value) => validationCPF(value))
    });

    try {
      await schemaValidation.validate({cpf}, {
        abortEarly: false
      });
      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }

  async idValidation(id: string): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      id: Yup.string().required("O identidicador do funcionário é obrigatorio").uuid("Identificador invalido")
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

  async updateValidation(emploee: any): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      emploeeId: Yup.string().required("O identificador do funcionário é obrigatorio").uuid("Identificador do usuário não valido"),
      name: Yup.string().required("O nome do funcionário é obrigatorio"),
      email: Yup.string().required("O email do funcionário é obrigatorio").email("O email do funcionario é invalido"),
      password: Yup.string().required("O senha do funcionário é obrigatorio").min(6, "A senha deve ter no minimo 6 caracteres"),
      biography:  Yup.string().required("A biografia é obrigatória"),
    });

    try {
      await schemaValidation.validate(emploee, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }
}

export default new EmploeeValidator();
