import Airalo, { Package, Order } from "../src/index";

describe("Airalo module", () => {
  it("should set the host URL correctly", async () => {
    const host = "https://sandbox-partners-api.airalo.com";
    await Airalo.setHost(host);
    expect(Airalo.config.host).toBe(host);
  });

  it("should toggle logger state", async () => {
    await Airalo.setLogger(true);
    expect(Airalo.config.logger).toBe(true);

    await Airalo.setLogger(false);
    expect(Airalo.config.logger).toBe(false);
  });

  it("Authorization", async () => {
    await Airalo.auth.TOKEN({
      client_id: "556e2a26cabf2036b52f57268d0ae3cd",
      client_secret: "lelMikH9LeHF2zycDvfLgtGWDDWJjY6kInclRq58",
    });
  });

  let firstPackageId: string | null = null;

  it("Get Packages", async () => {
    const data = await Package.Packages();
    const country = data.data?.[1];
    const operator = country?.operators?.[0];
    const pkg = operator?.packages?.[0];
    console.log(pkg, "pkg");
    firstPackageId = pkg?.id || null;

    console.log("First Package:", pkg);
    expect(firstPackageId).toBeTruthy();
  });

  it("Buy E-Sim", async () => {
    if (!firstPackageId) {
      throw new Error("No package ID found to buy.");
    }

    const data = await Order.SubmitOrder({
      quantity: "2",
      package_id: firstPackageId,
      type: "sim",
      description: "Test Order from Jest",
      brand_settings_name: "our perfect brand",
    });

    console.log("Order Response:", data.data);
    expect(data.data).toHaveProperty("id");
  });
});
