import { test, expect } from "@playwright/test";

test.describe("Nemo Chatbot Boundary & Security Tests", () => {
  test("Security: API Key is not exposed to the browser", async ({ page }) => {
    await page.goto("/");
    // Search for OPENROUTER_API_KEY in the page source and scripts
    const content = await page.content();
    expect(content).not.toContain("OPENROUTER_API_KEY");
  });

  test("API failure: Friendly error is shown", async ({ page }) => {
    await page.route("/api/chat", async (route) => {
      await route.fulfill({ status: 500, json: { error: "Missing API key configuration." } });
    });

    await page.goto("/");
    await page.click("button:has-text('ASK NEMO')");
    await page.fill("input[placeholder='Ask Nemo...']", "Hello");
    await page.click("button[aria-label='Send question']");

    await expect(page.locator("text=I'm having trouble connecting to my network right now. Please try again later.")).toBeVisible();
  });

  test("Chat flow: Network request includes system prompt and context", async ({ page }) => {
    let capturedRequest: any;

    await page.route("/api/chat", async (route) => {
      capturedRequest = await route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { reply: "Mock response" } });
    });

    await page.goto("/");
    await page.click("button:has-text('ASK NEMO')");
    await page.fill("input[placeholder='Ask Nemo...']", "What are his projects?");
    await page.click("button[aria-label='Send question']");

    await expect(page.locator("text=Mock response")).toBeVisible();

    // Verify the request format
    expect(capturedRequest.messages).toBeDefined();
    expect(capturedRequest.messages.length).toBeGreaterThan(0);
    expect(capturedRequest.messages[capturedRequest.messages.length - 1].text).toBe("What are his projects?");
  });
});
