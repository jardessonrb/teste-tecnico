function cleanFone(fone){
  return fone.replace(/[^\d]+/g, '');
}


console.log(cleanFone("(86) 99411-7540"));
