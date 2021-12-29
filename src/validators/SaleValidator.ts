import { validation } from "../types/validation";
import * as Yup from 'yup';

class SaleValidator{
  async createValidation(sale: any): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      emploeeId: Yup.string().required("O identificador do funcionário é obrigatorio").uuid("Identificador do funcionario não valido"),
      clientId: Yup.string().required("O identificador do cliente é obrigatorio").uuid("Identificador do cliente não valido"),
      vehicleId: Yup.string().required("O identificador do veiculo é obrigatorio").uuid("Identificador do veiculo não valido")
    });

    try {
      await schemaValidation.validate(sale, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }
}

export default new SaleValidator();
