import * as Yup from 'yup';
import { validation } from '../types/validation';
import { Emploee } from '../models/Emploee';
import { validationCPF } from './validations/validationCPF';

class EmploeeValidator{
  async createValidation(emploee: Emploee): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required("O nome do funcionário é obrigatorio"),
      cpf: Yup.string().required("O cpf do funcionário é obrigatorio").test("cpf", "CPF inválido",(value) => validationCPF(value)),
      email: Yup.string().required("O cpf do funcionário é obrigatorio").email("O email do funcionario é obrigatório"),
      password: Yup.string().required("O cpf do funcionário é obrigatorio").min(6, "A senha deve ter no minimo 6 caracteres"),
      avatar: Yup.string().required("O avatar é obrigatório"),
      biography:  Yup.string().required("O biografia é obrigatório"),
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

}

export default new EmploeeValidator();
