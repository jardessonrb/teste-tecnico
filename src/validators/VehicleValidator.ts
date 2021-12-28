import * as Yup from 'yup';
import { Vehicle } from '../models/Vehicle';
import { validation } from '../types/validation';

class VehicleValidator{
  async createValidation(vehicle: Vehicle): Promise<validation>{
    const schemaValidation = Yup.object().shape({
      brand: Yup.string().required("A marca do veiculo é obrigatoria"),
      model: Yup.string().required("O modelo do veiculo é obrigatorio"),
      year: Yup.number().required("O ano do veiculo é obrigatorio").positive("O ano do veiculo não pode ser negativo"),
      kilometer: Yup.number().required("A quilometragem do veiculo é obrigatoria").integer("Kilometer deve ser inteiro").min(0, "Km não pode ser negativo"),
      color: Yup.string().required("A cor predominante do veiculo é obrigatória"),
      chassis:  Yup.string().required("O chassis do veiculo é obrigatório").min(17, "O chassis deve possuir no minimo 17 caracteres"),
      purchasePrice:  Yup.number().required("O preço de compra é obrigatório").positive("O valor de compra não pode ser negativo ou zero"),
      salePrice:  Yup.number().required("O preço de compra é obrigatório").positive("O valor de venda não pode ser negativo ou zero"),
      type: Yup.string().required("O tipo do veiculo é obrigatório")
    });

    try {
      await schemaValidation.validate(vehicle, {
        abortEarly: false
      });

      return {isValid: true, errors: []};
    } catch (error) {
      return {isValid: false, errors: error.errors};
    }
  }
}

export default new VehicleValidator();
