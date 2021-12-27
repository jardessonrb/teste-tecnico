function validationCPF(cpf: string): boolean{

  console.log(cleanParamCPF(cpf));

  return false;
}

function cleanParamCPF(cpf: string){
  return cpf.split(/\s.\s-/);
}
