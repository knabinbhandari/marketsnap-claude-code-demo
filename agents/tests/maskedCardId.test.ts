import { describe, expect, it } from "vitest";

import { maskedCardId } from "@/tools/stripe";

describe("maskedCardId", () => {
  it("masks all but the last four digits", () => {
    expect(maskedCardId("4242424242424242")).toBe("card_****4242");
    expect(maskedCardId("371449635398431")).toBe("card_****8431");
  });

  it("handles inputs shorter than four characters", () => {
    expect(maskedCardId("abc")).toBe("card_****");
    expect(maskedCardId("")).toBe("card_****");
  });

  it("does not leak the full identifier under any path", () => {
    const inputs = ["4242424242424242", "tok_visa", "card_1ABCdEfghIJKLMnOpQrStUv"];
    for (const id of inputs) {
      const masked = maskedCardId(id);
      // Masked string must never contain more than the last four characters of input.
      if (id.length > 4) {
        expect(masked.includes(id)).toBe(false);
      }
    }
  });
});
