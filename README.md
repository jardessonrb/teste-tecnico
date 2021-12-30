# LabLuby Teste Técnico

### Objetivo: 
Criação de um sistema para gerenciamento de uma loja que realiza venda de veículos.

### Sobre o projeto
O projeto utilizou ![Typescript](https://www.typescriptlang.org/) com o ![Sequelize](https://sequelize.org/v7/), e todo o versionamento do banco de dados ![Postgres](https://www.postgresql.org/) foi feito por meio de migrations do ![Sequelize](https://sequelize.org/v7/). Todas as listagens possuem paginação de resultados. Todas as ações dos endpoints possuem validação de campos. Foi criada uma camada View para formatação de dados para o usuario final, como pedido o formato de data DD/MM/yyy. As demais camadas, como a camada Controller que recebe as requisições e centraliza as ações das demais camadas. Camada de Validators, para as validações dos campos que são passados, e camada de Services que faz a ponte entre a aplicação e o banco de dados junto com os Models que são as entidades da aplicação.

### Funcionalidades implementadas
- [x] CRUD de funcionarios
  - [x] Cadastrar um funcionário, com todas as validações necessárias feitas
  - [x] Atualizar um funcionário, com todas as validações necessárias feitas
  - [x] Listar funcionários, com paginação de resultados
  - [x] Buscar um funcionário, busca pelo CPF
  - [x] Deletar um funcionário, como existem relações de venda, reserva, o funcionario é marcado como desligado
  - [x] Login de funcionário, que busca por Email e Senha
- [x] CRUD de veiculos
  - [x] Cadastrar um veiculo, com todas as validações necessárias feitas
  - [x] Atualizar um veiculo, com todas as validações necessárias feitas
  - [x] Listar veiculos, com paginação de resultados
  - [x] Listar veiculos pelo status, também com paginação de resultados
  - [x] Buscar um veiculo pelo  Id
  - [x] Deletar um veiculo, como existem relações de venda, reserva, o veiculo é marcado como excluído
- [x] CRUD de clientes - Para que haja venda e reserva de veiculos
  - [x] Cadastrar um cliente, com todas as validações necessárias feitas
  - [x] Atualizar um cliente, com todas as validações necessárias feitas
  - [x] Listar clientes, com paginação de resultados
  - [x] Buscar um cliente, busca pelo Id
- [x] CRUD de vendas
  - [x] Cadastrar uma venda, com todas as validações necessárias feitas
  - [x] Listar vendas, com paginação de resultados, que traz consigo o clinte, o funcionario e o veiculo da compra
  - [x] Buscar um vendas pelo  funcionario que a cadastrou, que também traz consigo o clinte, o funcionario e o veiculo da compra
  - [x] Para realizar a compra é visto o status do carro, se está disponivel, ou reservado para o cliente que está querendo compra-lo no momento
- [x] CRUD de reservas de veiculos
  - [x] Cadastrar uma  reserva, com todas as validações necessárias feitas, como saber se o carro já está reservado ou não
  - [x] Listar as reservas, com paginação de resultados, que traz consigo o clinte, o funcionario e o veiculo da reserva
  - [x] Buscar as reservas pelo  funcionario que a cadastrou, com paginação que também traz consigo o clinte, o funcionario e o veiculo da reserva
  - [x] Fecha reserva que estive em aberto, pelo ID passado
### Tecnologias Usadas
* ![Typescript](https://www.typescriptlang.org/)
* ![Sequelize](https://sequelize.org/v7/)
* ![Postgres](https://www.postgresql.org/)
* Foi utilizado o ![Express](https://expressjs.com/pt-br/) para criação do servidor de aplicação
* Foi utilizada a biblioteca ![Yup](https://www.npmjs.com/package/yup) para ajudar na validação de campos

### Formato de resposta(responses) da aplicação 
``` 
{ // Success
	"message": "Usuario cadastrado com sucesso", //Mensagem da resposta
	"type": "success",//Tipo da resposta
	"body": {//Corpo da resposta, pode ser um objeto ou um array de objetos
		"id": "7f52d637-8d21-418a-a5eb-bcf9100c3ce6",
		"name": "Jose Sucesso"
	}
}

```

``` 
{ //Error
	"message": "Usuario não cadastrado",//Mensagem da resposta
	"type": "error validation",//Tipo da resposta
	"errors": [ //Array com os erros da requisição
		"email invalido",
		"Senha deve ter no minimo 6 caracteres" //Informação sobre os erros
	]
}

```

Autor: Járdesson Ribeiro
email: jardessonrs1117@gmail.com
