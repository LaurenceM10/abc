import { test, assertEquals } from "./dev_deps.ts";
import { context } from "./context.ts";

test(function StringResponse() {
  const results = [
    `{foo: "bar"}`,
    `<h1>Title</h1>`,
    `foo`,
    `foo=bar`,
    `undefined`,
    `null`,
    `0`,
    `true`,
    ``
  ];
  let c = context();
  for (const r of results) {
    c.string(r);
    assertEquals(c.response.status, 200);
    assertEquals(c.response.body, new TextEncoder().encode(r));
    assertEquals(c.response.headers.get("Content-Type"), "text/plain");
  }
});

test(function JSONResponse() {
  const results = [{ foo: "bar" }, `{foo: "bar"}`, [1, 2], {}, [], `[]`];
  let c = context();
  for (const r of results) {
    c.json(r);
    assertEquals(c.response.status, 200);
    assertEquals(
      c.response.body,
      new TextEncoder().encode(typeof r === "object" ? JSON.stringify(r) : r)
    );
    assertEquals(c.response.headers.get("Content-Type"), "application/json");
  }
});

test(function HTMLResponse() {
  const results = [
    `{foo: "bar"}`,
    `<h1>Title</h1>`,
    `foo`,
    `foo=bar`,
    `undefined`,
    `null`,
    `0`,
    `true`,
    ``
  ];
  let c = context();
  for (const r of results) {
    c.html(r);
    assertEquals(c.response.status, 200);
    assertEquals(c.response.body, new TextEncoder().encode(r));
    assertEquals(c.response.headers.get("Content-Type"), "text/html");
  }
});
