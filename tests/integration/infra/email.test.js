import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEMails();

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "<contato@curso.dev>",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "<contato@curso.dev>",
      subject: "Ultimo email enviado",
      text: "Corpo do ultimo email.",
    });

    const lastEamail = await orchestrator.getLastEmail();

    expect(lastEamail.sender).toBe("<contato@fintab.com.br>");
    expect(lastEamail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEamail.subject).toBe("Ultimo email enviado");
    expect(lastEamail.text).toBe("Corpo do ultimo email.\n");
  });
});
