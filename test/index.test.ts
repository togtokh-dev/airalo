import Airalo, { Packages } from "../src/index";

describe("CloudHub module", () => {
  it("should set the host URL correctly", async () => {
    const host = "https://partners-api.airalo.com";
    await Airalo.setHost(host);

    expect(Airalo.config.host).toBe(host);
  });

  it("should toggle logger state", async () => {
    await Airalo.setLogger(true);
    expect(Airalo.config.logger).toBe(true);

    await Airalo.setLogger(false);
    expect(Airalo.config.logger).toBe(false);
  });
  it("Get Packages", async () => {
    const data = await Packages.Packages();
    console.log(data);
  });
});
