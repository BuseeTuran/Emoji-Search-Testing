import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import React from "react";


describe("App Tests", () => {
    console.log("Her testten önce çalışıyorum..");
    beforeEach(() => {
    render(<App />);
  });

  test("Başlık kısmı render ediliyor", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });

  test("Emoji listesi başarılı bir şekilde oluşturuluyor", () => {
    const items = screen.getAllByText("Click to copy emoji");
    expect(items.length).toEqual(20);
  });

  test("Filtreleme gerçekleşiyor", () => {
    const emoji = "Snowman";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: emoji } });
    expect(screen.getByText(emoji)).toBeInTheDocument();
  });

  test("Kopyalama gerçekleşiyor", () => {
    const click = screen.getAllByText("Click to copy emoji").at(0);
    const parent = click.parentElement;
    expect(parent.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
  });
});