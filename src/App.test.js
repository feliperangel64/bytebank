import React from "react";
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal", () => {
  //Teste de componentes
  describe("Quando eu abro o app do banco", () => {
    it("o nome do banco está sendo exibido", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });
    it("o saldo está sendo exibido", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
    it("o botão de operação está sendo exibido", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  //Teste de funções
  describe("Quando realizo uma transação", () => {
    it("que é um saque", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });

    it("que é um depósito", () => {
      const valores = {
        transacao: "deposito",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(200);
    });

    it("que é um saque, a transação deve ser realizada", () => {
      const { getByTestId, getByLabelText, getByText } = render(<App />);

      const saldoAtual = getByText("R$ 1000");
      const tipoTransacao = getByLabelText("Saque");
      const valorTransacao = getByTestId("valor");
      const btnRealizarOperacao = getByText("Realizar operação");

      expect(saldoAtual.textContent).toBe("R$ 1000");

      fireEvent.click(tipoTransacao, { target: { value: "saque" } });
      fireEvent.change(valorTransacao, { target: { value: "10" } });
      fireEvent.click(btnRealizarOperacao);

      expect(saldoAtual.textContent).toBe("R$ 990");
    });
  });
});
