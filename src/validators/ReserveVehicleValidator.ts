import { validation } from "../types/validation";
import * as Yup from 'yup';

class ReserveVehicleValidator{
  async createValidation(reserve: any): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      reserveDays: Yup.number().required("Os dias de reserva é obrigatório").min(1, "A reserva deve ser no minimo 1 dia"),
      valueReserve: Yup.number().required("O valor da reserva é obrigatório").positive("O valor de reserva não pode ser negativo ou zero"),
      emploeeId: Yup.string().required("O identificador do funcionário é obrigatorio").uuid("Identificador do funcionario não valido"),
      clientId: Yup.string().required("O identificador do cliente é obrigatorio").uuid("Identificador do cliente não valido"),
      vehicleId: Yup.string().required("O identificador do veiculo é obrigatorio").uuid("Identificador do veiculo não valido")
    });

    try {
      await schemaValidation.validate(reserve, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }

  async idValidation(id: string): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      id: Yup.string().required("O identidicador da reserva é obrigatorio").uuid("Identificador invalido")
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
}

export default new ReserveVehicleValidator();
