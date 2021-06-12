import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Conta from "./Conta";

describe("Componente de conta ", () => {
  it("Exibir o saldo da conta com formatação monetária", () => {
    render(<Conta saldo={1000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });

  it("Chama a função de realizar transação, quando o botão é clicado", () => {
    //Spy - Simulação de Função
    //Cria o mock de uma função
    const fnRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={fnRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    //Verifica se a função foi chamada
    expect(fnRealizarTransacao).toHaveBeenCalled();
  });
});
