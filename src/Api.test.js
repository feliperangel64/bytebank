import React from "react";
import { render, screen } from "@testing-library/react";
import api from "./api";
import App from "./App";

//Mock do jest
//Simulação da api (não executa api diretamente, e sim faz uma simulação)
jest.mock("./api");

describe("Requisições para API", () => {
  it("Exibir lista de transações através da API", async () => {
    //Simula o retorno da api
    //mockResolvedValue: Retorna o valor já resolvido da promisse
    api.listaTransacoes.mockResolvedValue([
      {
        id: 1,
        valor: "10",
        transacao: "saque",
        data: "10/08/2020",
      },
      {
        id: 2,
        valor: "20",
        transacao: "deposito",
        data: "26/09/2020",
      },
    ]);

    //Renderiza o componente App
    render(<App />);

    //Busca assíncrona
    //Verifica se existe um elemento com text "saque" dentro do documento
    expect(await screen.findByText("saque")).toBeInTheDocument();

    //Verifica dentro do elemento "transações" se possui dois elementos filhos
    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
