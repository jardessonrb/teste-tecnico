function cleanCPF(cpf: string){
  return cpf.replace(/[^\d]+/g, '');
}

function defineSecondCheckDigit(cpf: string){
  let multiple = 11;
  let soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += multiple * parseInt(cpf[i]);
    multiple--;
  }

  return defineRest((soma * 10) % 11);
}

function defineFirstCheckDigit(cpf: string){
  let soma = 0;
  let multiple = 10;
  for (let i = 0; i < 9; i++) {
    soma += multiple * parseInt(cpf[i]);
    multiple--;
  }

  return defineRest((soma * 10) % 11);
}

function defineRest(rest: number){
  if(rest == 10 || rest == 11){
    return 0;
  }

  return rest;
}

function validationCPF(cpf: string){
  cpf = cleanCPF(cpf);
  if(cpf.length !== 11){
    return false;
  }

  //Essa linhas estão comentadas para não ter que buscar cpf´s válidos em desenvolmento
  // if(cpf == "00000000000" || "11111111111"){
  //   return false;
  // }

  let firstCheckDigit  = 0;
  let secondCheckDigit = 0;

  firstCheckDigit = defineFirstCheckDigit(cpf);
  if(firstCheckDigit !== parseInt(cpf[9])){
    return false;
  }

  secondCheckDigit = defineSecondCheckDigit(cpf);
  if(secondCheckDigit !== parseInt(cpf[10])){
    return false;
  }

  return true;

}

export { validationCPF, cleanCPF };
